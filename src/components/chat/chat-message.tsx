import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/libs/utils';

type ChatMessageShape = {
  id?: string;
  role: string;
  content: string;
};

export const ChatMessage = ({
  message: { role, content },
  viewport,
}: {
  message: ChatMessageShape;
  viewport: React.RefObject<HTMLDivElement | null>;
}) => {
  const isAIMessage = role === 'assistant';

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
