import { AwsConfiguration } from "@src/configurations/awsConfiguration";
import envs from "@src/utils/envs";

export default class AwsService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cognito: any;
    awsService: AwsConfiguration;
    constructor() {
        this.awsService = new AwsConfiguration();
        this.cognito = this.awsService.getCognito();
    }

    async registerUser(login?: string, password?: string) {
        const params = {
            ClientId: envs.COGNITO_CLIENT_ID_KEY,
            Username: login,
            Password: password,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: 'teste1@teste.com.br'
                }
            ]
        };

        try {
            const data = await this.cognito.signUp(params).promise();
            return data.UserSub;
        } catch (error) {
            throw error + " " + login;
        }

        
    }

    async authenticate(login?: string, password?: string) {
        const params = {
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: envs.COGNITO_CLIENT_ID_KEY,
            AuthParameters: {
                USERNAME: login,
                PASSWORD: password
            }
        };
    
        try {
            
            const data = await this.cognito.initiateAuth(params).promise();
            
            return data.AuthenticationResult.AccessToken; // Retorna o JWT
        } catch (error) {
            throw error + " " + document;
        }
    }
}