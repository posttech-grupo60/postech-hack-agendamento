import jwt from 'jsonwebtoken';

export default class AuthorizationConfig {
    static async getUserIdByToken(token: string) {
        const decoded = await jwt.decode(token.replace("Bearer ", ""));
        return decoded?.sub?.toString();
    }
}