import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import {fs}  from 'fs';
import xml2js from 'xml2js';


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
        const ignoreblank = this.flags.ignoreblank;

        if(!source) {
            throw new SfdxError(messages.getMessage('errorNoSource'));
        }
        if(!target) {
            throw new SfdxError(messages.getMessage('errorNoSource'));
        }

        return JSON.stringify(generatedProfiles);
    }

    // check directory exists

    // check file exists
}