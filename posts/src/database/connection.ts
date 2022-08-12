import { connect } from 'mongoose';
import { configuration } from '../config';

export const databaseConnection = async () => {
    try {
        await connect(configuration.DB_URL);
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
    }
}