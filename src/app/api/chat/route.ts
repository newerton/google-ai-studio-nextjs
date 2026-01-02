import { GoogleGenerativeAI } from '@google/generative-ai';
import type { UIMessage } from 'ai';
// Note: AI SDK v6 removed some streaming helpers. We avoid importing
// the removed helpers here and return the provider stream directly.
// If desired, later convert the provider stream into UIMessage stream using
// `streamText` or similar helpers from `ai`.

import { NextResponse } from 'next/server';

import { env } from '@/libs/env';

const genAI = new GoogleGenerativeAI(env.GOOGLE_AI_STUDIO_API_KEY);

export const runtime = 'edge';

const buildGoogleGenAIPrompt = (messages: UIMessage[]) => ({
  contents: messages
    .filter(
      (message) => message.role === 'user' || message.role === 'assistant',
    )
    .map((message) => ({
      role: message.role === 'user' ? 'user' : 'model',
      // Support both new `parts` API and legacy `content`
      parts: [
        {
          text: message.parts
            ? message.parts.map((p: any) => p.text ?? '').join('')
            : (message as any).content,
        },
      ],
    })),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return NextResponse.json('Messages are required', { status: 400 });
    }

    const result = await genAI
      .getGenerativeModel({ model: 'gemini-pro' })
      .generateContentStream(buildGoogleGenAIPrompt(messages));

    const asyncGenerator = result.stream;

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of asyncGenerator) {
            // `chunk` is an EnhancedGenerateContentResponse - use `text()` helper
            let text = '';
            try {
              text = (chunk as any).text ? (chunk as any).text() : '';
            } catch (_e) {
              text = '';
            }
            const payload = `data: ${JSON.stringify({ text })}\n\n`;
            controller.enqueue(new TextEncoder().encode(payload));
          }
          controller.close();
        } catch (err) {
          controller.error(err as Error);
        }
      },
    });

    return new Response(readable, {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
