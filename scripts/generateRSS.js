import fs from 'fs';
import path from 'path';
import { getAllPosts } from '../src/helpers/loadPosts.js';

const siteURL = 'https://indoorprince.com';
const posts = getAllPosts();

const itemsXml = posts
  .map((post) => {
    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteURL}/${post.slug}</link>
        <guid>${siteURL}/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.content[0]?.html ?? ''}]]></description>
      </item>
    `;
  })
  .join('');

const rssXml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Indoor Prince Blog</title>
      <link>${siteURL}</link>
      <description>A blog about video games and more</description>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      ${itemsXml}
    </channel>
  </rss>
`.trim();

const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
fs.writeFileSync(rssPath, rssXml);
console.log('✅ RSS feed generated at public/rss.xml');
