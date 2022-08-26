import { ValidateSignature } from '../../utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PostsAuth = async (req: any, res: any, next: any) => {
    const isAuthorized = await ValidateSignature(req);

    if (isAuthorized) {
        return next();
    }
    return res.status(403).json({ message: "Not Authorized" });
};