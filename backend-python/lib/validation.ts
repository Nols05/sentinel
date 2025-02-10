import { z } from 'zod';


export const SignupSchema = z.object({
    name: z.string(),
    email: z.string().email("Invalid email address"),
    password: z.string(),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This sets the error location
});

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string(),
});

export const MigrationSchema = z.object({
    blueskyName: z.string().regex(/^@[a-zA-Z0-9_]{1,15}$/, "The username must start with @"),
    bskyHandle: z.string().regex(/^\@?[a-z0-9-]+(\.[a-z0-9-]+){1,2}$/i
        , "Please add the full bluesky handle. It usually is: <username>.bsky.social. Make sure it does not start with @"),
    password: z.string(),
    threadUrls: z.array(z.string().regex(/^(https:\/\/bluesky.com\/|https:\/\/x.com\/)/, "Invalid thread link")),

});

export const FeaturedSchema = z.object({
    bskyHandle: z.string().regex(/^\@?[a-z0-9-]+(\.[a-z0-9-]+){1,2}$/i
        , "Please add the full bluesky handle. It usually is: <username>.bsky.social. Make sure it does not start with @"),
});

export const ThreadSchema = z.object({
    bskyHandle: z.string().regex(/^\@?[a-z0-9-]+(\.[a-z0-9-]+){1,2}$/i
        , "Please add the full bluesky handle. It usually is: <username>.bsky.social. Make sure it does not start with @"),
    password: z.string(),
    threadUrls: z.array(z.string().regex(/^(https:\/\/bluesky.com\/|https:\/\/x.com\/)/, "Invalid thread link")),
});


export type FormState =
    | {
        errors?: {
            name?: string[];
            email?: string[];
            password?: string[];
            confirmPassword?: string[];
        };
        message?: string;
    }
    | undefined;


export type SessionPayload = {
    userId: string | number;
    expiresAt: Date;
};
