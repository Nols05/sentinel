'use server'

import { SignupSchema, FormState, LoginSchema } from "@/lib/validation"
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma"
import { checkSession, createSession, verifySession } from "@/lib/session"
import { redirect } from "next/navigation"
import { cache } from "react"
import { signIn } from "@/auth"


export async function signInGoogle() {
    await signIn("google")
}

export const getUser = cache(async (loginRedirect = true) => {
    const session = loginRedirect ? await verifySession() : await checkSession();
    if (!session) return null;

    const user = await prisma.user.findUnique({ where: { id: session.userId as string } });

    return user;
});

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
        r: formData.get("r")
    }

    const validationResult = SignupSchema.safeParse(data);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const { name, email, password } = validationResult.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) { return { errors: { email: ["Email already in use"] } } }

    const user = await prisma.user.create({
        data: {
            email,
            name: name,
            password: hashedPassword
        }
    });

    //Create session

    await createSession(user.id);
    redirect(data.r ? `/${data.r}` : "/dashboard");
}


export async function login(state: FormState, formData: FormData): Promise<FormState> {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
        r: formData.get("r")
    }

    const validationResult = LoginSchema.safeParse(data);

    if (!validationResult.success) {
        return {
            errors: validationResult.error.flatten().fieldErrors
        }
    }

    const { email, password } = validationResult.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) { return { errors: { email: ["User not found"] } } }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) { return { errors: { password: ["Incorrect password"] } } }

    //Create session

    await createSession(user.id);


    redirect(data.r ? `/${data.r}` : "/dashboard");
}