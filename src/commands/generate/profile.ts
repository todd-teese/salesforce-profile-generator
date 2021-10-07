import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import fs = require('fs');
import xml2js = require('xml2js');
import chalk = require('chalk');


Messages.importMessagesDirectory(__dirname);

const messages = Messages.loadMessages('salesforce-profile-generator', 'profile');

export default class Profile extends SfdxCommand {
    public static description = messages.getMessage('commandDescription');

    protected static flagsConfig = {
        source: flags.string({char: 's', description: messages.getMessage('sourceFlagDescription')}),
        target: flags.string({char: 't', description: messages.getMessage('targetFlagDescription')}),
        ignoreblank: flags.boolean({char: 'b', description: messages.getMessage('ignoreBlanksFlagDescription')}),
    };

    public async run(): Promise<AnyJson> {
        let generatedProfiles = [];
        const source = this.flags.source;
        const target = this.flags.target;
        // const ignoreblank = this.flags.ignoreblank;

        let profilePaths;

        if(!source) {
            throw new SfdxError(messages.getMessage('errorNoSource'));
        }
        if(!target) {
            throw new SfdxError(messages.getMessage('errorNoTarget'));
        }

        await this.checkExists(source).then(() => {
            profilePaths = this.getDirectory(source);
        }).catch(error => {
            throw new SfdxError(messages.getMessage('errorNoDirectoryFound'));
        })

        if(!profilePaths) {
            throw new SfdxError(messages.getMessage('errorNoProfilesFound'));
        }

        for(const profilePath of profilePaths) {
            const profile = {name:profilePath};
            const lsStat = fs.lstatSync(source + '/' + profilePath);
            if(lsStat.isDirectory() == false) {
                continue;
            }
            const profileFiles = this.getDirectory(source + '/' + profilePath);

            for(const profileFile of profileFiles) {
                this.applyFileData(source + '/' + profilePath + '/' + profileFile, profileFile, profile);
            }
            this.createXml(target, profile);
            console.log(chalk.green(profilePath + ' profile') + ' generated and saved to ' + chalk.green(target));

            generatedProfiles.push(profilePath);
        }

        return JSON.stringify(generatedProfiles);
    }

    // check directory exists
    private async checkExists(path):Promise<Boolean> {
        try {
            await fs.promises.access(path);
            return true;
        } catch (error) {
            return false;
        }
    }

    // get profile folders
    private getDirectory(path) {
        return fs.readdirSync(path);
    }
    // check file exists
    private applyFileData(path, fileName, profile) {
        let fileType = fileName.split('.')[1];
        let attributeName = fileName.split('.')[0];
        if(fileType == 'csv') {
            this.applyCsvData(path, attributeName, profile);
        }
        if(fileType == 'json') {
            this.applyJsonData(path, profile);
        }
    }

    private applyCsvData(filePath, attributeName, profile) {
        const csvData = fs.readFileSync(filePath, 'utf-8');
        const csvRows = csvData.replace(/\r/g, '').split('\n');
        const csvHeader = csvRows[0];
        const headerAttributes = csvHeader.split(',');
        const cleanRows = [];
        for(let i = 1; i < csvRows.length; i++) {
            if(!csvRows) {
                continue;
            }
            const splitRow = csvRows[i].split(',');
            const cleanRow = {};
            for(let j = 0; j < headerAttributes.length; j++) {
                // ignore blanks comes in here
                if(splitRow[j]) {
                    cleanRow[headerAttributes[j]] = splitRow[j]
                }
            }
            cleanRows.push(cleanRow);
    
        }
        profile[attributeName] = cleanRows;
    }

    private applyJsonData(filePath, profile) {
        const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const jsonKeys = Object.keys(jsonData);
        for(const jsonKey of jsonKeys) {
            if(!jsonKey || jsonData[jsonKey]) {
                continue;
            }
            profile[jsonKey] = jsonData[jsonKey];
        }
    }

    private createXml(targetPath, profile) {
        let builder = new xml2js.Builder();
        const profileDeRef = JSON.parse(JSON.stringify(profile));
        delete profileDeRef.name;

        let obj = {Profile: {
            $: {
                xmlns:"http://soap.sforce.com/2006/04/metadata"
            }}
        };
        const objectKeys = Object.keys(profileDeRef);

        for(let i = 0; i < objectKeys.length; i++) {
            const objectKey = objectKeys[i];
            obj.Profile[objectKey] = profileDeRef[objectKey];

        }

        let xml = builder.buildObject(obj);
        xml = xml.replace(/\[object Object\]/g, '');
        fs.writeFileSync(targetPath + '/' + profile.name + '.profile-meta.xml', xml);
    }
}