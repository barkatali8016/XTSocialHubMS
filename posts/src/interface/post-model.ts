import { IUserInformation } from './user-info-model';

export interface IPost {
    content: string,
    imageURL: string,
    userInformation: IUserInformation,
    interactionCount: object;
    approxReadingTime: number,
    schedule: object;
    isAudited: boolean
}