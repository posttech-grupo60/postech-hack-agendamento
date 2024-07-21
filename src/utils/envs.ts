export default {
    PORT: process.env.PORT ?? 3000,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID ?? '',
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    AWS_REGION_KEY: process.env.AWS_REGION_KEY ?? '',
    COGNITO_CLIENT_ID_KEY: process.env.COGNITO_CLIENT_ID_KEY ?? '',
    MONGO_URI: process.env.MONGO_URI ?? ''
}