"use server";

import 'server-only';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import type { SessionPayload } from '@/lib/validation';
import { redirect } from 'next/navigation';

const duration = 1000 * 60 * 60 * 24 * 7; // 7 days
const key = new TextEncoder().encode(process.env.SECRET_JWS);

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(key);
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        return null;
    }
}


export async function createSession(userId: string) {
    console.log("Creating session")

    const expiresAt = new Date(Date.now() + duration);
    const session = await encrypt({ userId, expiresAt });

    (await cookies()).set('session', session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });

    console.log("Session created")

}

export async function verifySession() {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        redirect('/login');
    }

    return { success: true, userId: session.userId };
}

//without redirect
export async function checkSession() {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decrypt(cookie);

    if (!session?.userId) {
        return null;
    }

    return { success: true, userId: session.userId };

}

export async function deleteSession() {
    (await cookies()).delete('session');
    redirect('/');
}