import envs from '@src/utils/envs';
import AWS, { CognitoIdentityServiceProvider } from 'aws-sdk';

export class AwsConfiguration {
    cognito: CognitoIdentityServiceProvider;
    constructor() {
        // Configuração do AWS Cognito
        const config = {
            accessKeyId: envs.AWS_ACCESS_KEY_ID,
            secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
            region: envs.AWS_REGION_KEY
        };

        AWS.config.update(config);
        this.cognito = new AWS.CognitoIdentityServiceProvider();
        console.log("Validando o código la aws na data de 16/03/2024");
    }

    getCognito() {
        return this.cognito;
    }
}
