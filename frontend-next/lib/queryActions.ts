'use server'

import prisma from '@/lib/prisma'
import { getWeek } from './utils'
import { getUser } from './auth'
import { redirect } from 'next/navigation';


export async function createQuery(formData: FormData) {
    const user = await getUser();
    if (!user) { throw new Error('User not found') }

    let queryIdToRedirect = '';

    try {

        const rawData = {
            name: formData.get('name') as string,
            includedWordsString: formData.get('included_words') as string,
            excludedWordsString: formData.get('excluded_words') as string

        }

        // Parse arrays from comma-separated strings
        const included_words = rawData.includedWordsString.split(',')
        const excluded_words = rawData.excludedWordsString.split(',')

        const query = await prisma.query.create({
            data: {
                name: rawData.name,
                included_words,
                excluded_words,
                userId: user.id
            }
        })

        //enviarlo a http://127.0.0.1:8000/start_search


        await fetch("http://127.0.0.1:8000/start_search", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(

                {
                    queryId: query.id,
                    included_words: query.included_words,
                    excluded_words: query.excluded_words,
                    start_date: "",
                    end_date: ""
                }

            )
        });

        queryIdToRedirect = query.id;





    } catch (error) {
        console.error('Error creating query:', error)
    }

    redirect('/dashboard/data/' + queryIdToRedirect)
}

export async function getResult(date: Date) {
    const user = await getUser();
    if (!user) { throw new Error('User not found') }

    const week = getWeek(date);

    try {
        const result = await prisma.result.findMany({
            where: {
                week: week.ISOFormat,
                Query: {
                    userId: user.id
                }
            }
        })

        console.log('Found result:', result)
        return result;
    } catch (error) {
        console.error('Error finding result:', error)
    }
}

export async function getResultByQueryId(queryId: string) {

    console.log('QueryId:', queryId)
    try {
        const result = await prisma.result.findFirst({
            where: {
                queryId
            }
        })

        console.log('Found result:', result)
        return result;
    } catch (error) {
        console.error('Error finding result:', error)
    }
}

export async function getQueryById(id: string) {
    try {
        const query = await prisma.query.findUnique({
            where: { id }
        })


        return query;
    } catch (error) {
        console.error('Error finding query:', error)
    }
}

export async function getUserQueries(userId: string) {
    try {
        const queries = await prisma.query.findMany({})

        return queries;
    } catch (error) {
        console.error('Error finding queries:', error)
    }
}


export async function createResult() {
    //todo
}
