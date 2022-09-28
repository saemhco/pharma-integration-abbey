import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
    name: process.env.APP_NAME || 'Example app',
    port: Number(process.env.PORT) || 3000,
    docs: process.env.APP_DOCS || 'api-docs',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'dev',
}));