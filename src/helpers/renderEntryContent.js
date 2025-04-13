import Image from 'next/image';

export function renderEntryContent(blocks) {
  return blocks.map((block, index) => {
    if (block.type === 'paragraph') {
      return <p key={index} dangerouslySetInnerHTML={{ __html: block.html }} />;
    }

    if (block.type === 'image') {
      return (
        <Image
          key={index}
          src={block.src}
          alt={block.alt}
          width={block.width || 800}
          height={block.height || 0}
          style={{ width: '100%', height: 'auto' }}
        />
      );
    }

    return null;
  });
}
