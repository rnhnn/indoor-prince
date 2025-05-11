import Image from 'next/image';
import { getPostBySlug } from '@/helpers/loadPosts';
import { getAllPosts } from '@/helpers/loadPosts';
import { formatDate } from '@/helpers/formatDate';
import { renderEntryContent } from '@/helpers/renderEntryContent';
import Archive from '@/components/Archive';

export default async function BlogPostPage({ params }) {
  const post = getPostBySlug(params.slug);
  const posts = getAllPosts();

  return (
    <>
      <Archive posts={posts} />

      <main className="blog-entry">
        <time className="blog-entry-date">{formatDate(post.date)}</time>
        <h1
          className="blog-entry-title"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />
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
    </>
  );
}
