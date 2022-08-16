import { config } from 'dotenv';
import { resolve } from 'path';

if (process.env.NODE_ENV !== 'prod') {
    const configFileName = `.env.${process.env.NODE_ENV?.trim()}`;
    config({ path: resolve(process.cwd(), configFileName) });
} else {
    config()
}

export const configuration = {
    PORT: process.env.PORT,
    DB_URL: process.env.MONGODB_URI || '',
    APP_SECRET: process.env.APP_SECRET || '',
}
