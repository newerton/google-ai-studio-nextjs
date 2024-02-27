import { Message } from 'ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { cn } from '@/libs/utils';

export const ChatMessage = ({
  message: { role, content },
  viewport,
}: {
  message: Pick<Message, 'role' | 'content'> & { id?: string | undefined };
  viewport: React.RefObject<HTMLDivElement>;
}) => {
  const isAIMessage = role === 'assistant';

  viewport.current!.scrollTo({
    top: viewport.current!.scrollHeight,
    behavior: 'smooth',
  });

  return (
    <div
      className={cn(
        'mb-3 flex flex-col text-sm gap-2',
        isAIMessage ? 'justify-start' : 'text-right justify-end',
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
          className="react-markdown p-3"
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
