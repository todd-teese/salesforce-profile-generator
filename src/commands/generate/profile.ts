import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';


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

        return JSON.stringify(generatedProfiles);
    }
}