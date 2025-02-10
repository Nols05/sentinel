import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

// const resultSchema = z.object({
//     queryId: z.string(),
//     fullSummary: z.string(),
//     fullSentiment: z.number(),
//     fullDistribution: z.object({ positive: z.number(), neutral: z.number(), negative: z.number() }),
//     week: z.string().optional(),
//     reddit: z.object({
//         volume: z.number(),
//         meanSentiment: z.number(),
//         sentimentDistribution: z.object({
//             positive: z.number(),
//             neutral: z.number(),
//             negative: z.number()
//         }),
//         summary: z.string(),
//         topMentions: z.array(z.string()),

//     }),
//     bluesky: z.object({
//         volume: z.number(),
//         meanSentiment: z.number(),
//         sentimentDistribution: z.object({
//             positive: z.number(),
//             neutral: z.number(),
//             negative: z.number()
//         }),
//         summary: z.string(),
//         topMentions: z.array(z.string()),

//     }),
// });

export async function POST(req: NextRequest) {
    try {

        const data = await req.json();
        console.log('Received data:', data);


        // const validatedData = resultSchema.parse(data);

        // console.log("HE LLEGADO AQUI Y VALIDATED DATA ES", validatedData);



        const savedResult = await prisma.result.create({
            data: {
                queryId: data.queryId,
                week: data.week,

                fullSummary: data.fullSummary,
                fullSentiment: data.fullSentiment,
                fullDistribution: data.fullDistribution,


                redditDistribution: data.reddit.sentimentDistribution,
                redditVolume: data.reddit.volume,
                redditMeanSentiment: data.reddit.meanSentiment,
                redditSummary: data.reddit.summary,
                redditTopMentions: data.reddit.topMentions,

                blueskyDistribution: data.bluesky.sentimentDistribution,
                blueskyVolume: data.bluesky.volume,
                blueskyMeanSentiment: data.bluesky.meanSentiment,
                blueskySummary: data.bluesky.summary,
                blueskyTopMentions: data.bluesky.topMentions,


            }
        });

        await prisma.query.update({
            where: {
                id: data.queryId
            },
            data: {
                status: 'success'
            }
        });

        console.log('Saved result:', savedResult);
        return NextResponse.json({ status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('Validation error:', error.errors);
            return NextResponse.json({ error: error.errors }, { status: 400 });
        }
        console.error('Error saving result:', error);

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}