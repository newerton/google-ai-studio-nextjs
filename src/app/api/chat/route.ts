import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  GoogleGenerativeAIStream,
  type Message,
  StreamingTextResponse,
} from 'ai';
import { NextResponse } from 'next/server';

import { env } from '@/libs/env';

const genAI = new GoogleGenerativeAI(env.GOOGLE_AI_STUDIO_API_KEY);

export const runtime = 'edge';

const buildGoogleGenAIPrompt = (messages: Message[]) => ({
  contents: messages
    .filter(
      (message) => message.role === 'user' || message.role === 'assistant',
    )
    .map((message) => ({
      role: message.role === 'user' ? 'user' : 'model',
      parts: [{ text: message.content }],
    })),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return NextResponse.json('Messages are required', { status: 400 });
    }

    const geminiStream = await genAI
      .getGenerativeModel({ model: 'gemini-pro' })
      .generateContentStream(buildGoogleGenAIPrompt(messages));

    const stream = GoogleGenerativeAIStream(geminiStream);

    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
