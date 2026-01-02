import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/libs/utils';

type MessagePart = {
  id?: string;
  type: string;
  text?: string;
  url?: string;
  filename?: string;
  mediaType?: string;
};

type ChatMessageShape = {
  id?: string;
  role: string;
  // New UI shape in AI SDK v6
  parts?: MessagePart[];
  // Backwards-compat fallback
  content?: string;
};

export const ChatMessage = ({
  message,
  viewport,
}: {
  message: ChatMessageShape;
  viewport: React.RefObject<HTMLDivElement | null>;
}) => {
  const { role } = message;
  const isAIMessage = role === 'assistant';

  // Prefer the new `parts` API; fall back to legacy `content`
  const content = message.parts
    ? message.parts
        .filter((p) => p.type === 'text' || p.type === 'reasoning')
        .map((p) => p.text ?? '')
        .join('')
    : (message.content ?? '');

  viewport?.current?.scrollTo({
    top: viewport.current?.scrollHeight,
    behavior: 'smooth',
  });

  return (
    <div
      className={cn(
        'mb-3 flex flex-col gap-2 text-sm',
        isAIMessage ? 'justify-start' : 'justify-end text-right',
      )}
    >
      <div className={cn(isAIMessage && 'text-blue-300')}>
        {isAIMessage && 'Model'}
        {!isAIMessage && 'User'}
      </div>
      <div
        className={cn(
          'rounded-xl border',
          isAIMessage
            ? 'bg-blue-200 dark:bg-blue-950 dark:text-white'
            : 'bg-gray-200 dark:bg-stone-700',
        )}
      >
        <ReactMarkdown
          components={{
            p: ({ children }) => <div>{children}</div>,
          }}
          remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};
