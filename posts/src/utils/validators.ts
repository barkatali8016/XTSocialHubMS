import Joi from "joi";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validatePostBody = (body: any) => {
    const schema = Joi.object({
        content: Joi.string().alphanum().min(3).max(30).optional(),
        imageURL: Joi.string().alphanum().min(3).max(30).optional(),
    });

    return schema.validate(body);
};