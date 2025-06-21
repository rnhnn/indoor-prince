import fs from 'fs';
import path from 'path';
import { getAllPosts } from '../src/helpers/loadPosts.js';

const siteURL = 'https://indoorprince.com';
const faviconURL = `${siteURL}/favicon.ico`;
const posts = getAllPosts();

const itemsXml = posts
  .map((post) => {
    const fullContent = `
      <img src="${siteURL}/images/blog/${post.image}" alt="${post.alt}" style="max-width:100%; height:auto;" />
      ${post.content.map((block) => block.html).join('')}
    `;

    return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteURL}/${post.slug}</link>
        <guid>${siteURL}/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <content:encoded><![CDATA[${fullContent}]]></content:encoded>
      </item>
    `;
  })
  .join('');

const rssXml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
    <channel>
      <title>Indoor Prince</title>
      <link>${siteURL}</link>
      <description>A site about video games</description>
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <image>
        <url>${faviconURL}</url>
        <title>Indoor Prince</title>
        <link>${siteURL}</link>
      </image>
      ${itemsXml}
    </channel>
  </rss>
`.trim();

const rssPath = path.join(process.cwd(), 'public', 'rss.xml');
fs.writeFileSync(rssPath, rssXml);
console.log('RSS feed generated at public/rss.xml');
