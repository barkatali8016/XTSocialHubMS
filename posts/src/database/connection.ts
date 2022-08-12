import { connect } from 'mongoose';
import { configuration } from '../config';

export const dBConnect = async () => {
    try {
        await connect(configuration.DB_URL);
        console.log('DB Connected');
    } catch (error) {

    }
}