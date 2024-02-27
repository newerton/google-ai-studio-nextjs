import { Button, Divider } from '@mantine/core';
import { FaRegFileAlt, FaRegImage } from 'react-icons/fa';
import { GoPencil } from 'react-icons/go';
import { MdFolderOpen, MdVideocam } from 'react-icons/md';

import { Chat } from '@/components/chat';

export default function Home() {
  return (
    <div className="h-[calc(100%-126px)]">
      <div className="flex flex-row p-5 gap-5 items-center text-2xl">
        <div>Untitled prompt</div>
        <GoPencil />
      </div>
      <Divider />
      <div className="flex flex-row px-5 py-2 gap-5 items-center text-sm">
        <div>Insert:</div>
        <Button
          variant="subtle"
          leftSection={<FaRegImage size={16} />}
          className="text-stone-900 dark:text-white"
          p={0}
        >
          Image
        </Button>

        <Button
          variant="subtle"
          leftSection={<MdVideocam size={16} />}
          className="text-stone-900 dark:text-white"
          p={0}
        >
          Video
        </Button>

        <Button
          variant="subtle"
          leftSection={<FaRegFileAlt size={16} />}
          className="text-stone-900 dark:text-white"
          p={0}
        >
          File
        </Button>

        <Button
          variant="subtle"
          leftSection={<MdFolderOpen size={16} />}
          className="text-stone-900 dark:text-white"
          p={0}
        >
          Folder
        </Button>
      </div>
      <Divider />
      <Chat />
    </div>
  );
}
