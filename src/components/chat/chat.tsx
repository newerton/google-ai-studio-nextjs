'use client';

import { CloseButton, ScrollArea, TextInput } from '@mantine/core';
import { useChat } from 'ai/react';
import { useRef } from 'react';
import { TbReload } from 'react-icons/tb';

import IconAiStudio from '../static/icons/ai-studio';

import { ChatMessage } from '.';

export const Chat = () => {
  const viewport = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat();

  console.log({ messages, isLoading, error });
  return (
    <div className="h-full p-6">
      <div className="h-full rounded-2xl border border-stone-300 border-solid p-4 dark:border-stone-700 dark:bg-stone-800">
        <div className="mb-10 flex items-center justify-between">
          <div>Chat</div>
          <TbReload size={20} />
        </div>
        <div className="flex h-[calc(100%-102px)] flex-col">
          <ScrollArea w="100%" mb="lg" pr="lg" viewportRef={viewport}>
            <div className="flex flex-col gap-4">
              {messages.map((message: any) => (
                <ChatMessage
                  viewport={viewport}
                  message={
                    message as { id?: string; role: string; content: string }
                  }
                  key={(message as any)?.id}
                />
              ))}

              {isLoading && (
                <ChatMessage
                  viewport={viewport}
                  message={{
                    role: 'assistant',
                    content: 'Thinking...',
                  }}
                />
              )}
            </div>
            {error && (
              <ChatMessage
                viewport={viewport}
                message={{
                  role: 'assistant',
                  content: 'Something went wrong. Please try again later.',
                }}
              />
            )}
          </ScrollArea>
          {!error && messages.length === 0 && !isLoading && (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-sm">
              Model responses will show here
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between gap-6"
        >
          <TextInput
            placeholder="Type something"
            w="100%"
            classNames={{
              input:
                'rounded-2xl bg-stone-200 border-stone-300 dark:bg-stone-700 dark:border-stone-600',
            }}
            value={input}
            onChange={handleInputChange}
            autoFocus={true}
          />
          <CloseButton
            icon={<IconAiStudio className="text-black dark:text-white" />}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};
