import Image from 'next/image';
import { getPostBySlug } from '@/helpers/loadPosts';
import { formatDate } from '@/helpers/formatDate';
import { renderEntryContent } from '@/helpers/renderEntryContent';

export default async function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);

  return (
    <main className="blog-entry">
      <time className="blog-entry-date">{formatDate(post.date)}</time>
      <h1 className="blog-entry-title">{post.title}</h1>
      <Image
        className="blog-entry-image"
        src={`/images/blog/${post.image}`}
        alt={post.alt}
        width={637}
        height={0}
        style={{ width: '100%', height: 'auto' }}
      />
      {renderEntryContent(post.content)}
    </main>
  );
}