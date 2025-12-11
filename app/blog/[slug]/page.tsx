// =================================================================
// app/blog/[slug]/page.tsx - 最终拥抱Promise版
// 在所有使用params的地方，都用await进行处理
// =================================================================

import type { Metadata } from 'next';
import { client } from '@/lib/urql';
import Link from 'next/link'; // 导入Link，方便放一个返回按钮
export const revalidate = 20;
// ... (ALL_SLUGS_QUERY 和 POST_BY_SLUG_QUERY 的定义保持不变)
const ALL_SLUGS_QUERY = `
  query GetAllPostSlugs {
    posts(first: 1000) {
      nodes {
        slug
      }
    }
  }
`;
const POST_BY_SLUG_QUERY = `
  query GetPostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      title
      content
      date
      author {
        node {
          name
        }
      }
    }
  }
`;
// ===============================================================

// “花名册”函数 (保持不变)
export async function generateStaticParams() {
  const { data } = await client.query(ALL_SLUGS_QUERY, {});
  if (!data?.posts?.nodes) return [];
  return data.posts.nodes.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

// SEO元数据生成函数 - 【已修正】
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // 【关键修正】先用 await 拆开 Promise
  const { slug } = await params;
  const { data } = await client.query(POST_BY_SLUG_QUERY, { id: slug });
  const post = data?.post;

  if (!post) {
    return { title: "文章未找到" };
  }
  return {
    title: post.title,
  };
}

// 页面模板组件 - 【已修正】
export default async function PostPage({ params }: { params: Promise<{ slug:string }> }) {
  // 【关键修正】先用 await 拆开 Promise
  const { slug } = await params;
  const { data } = await client.query(POST_BY_SLUG_QUERY, { id: slug });
  const post = data?.post;

  if (!post) {
    return <div>文章未找到。请检查URL slug是否正确，以及对应的文章是否已发布。</div>;
  }

  return (
     // 1. 外部容器：设置背景，增加上下间距
    <article className="py-12 md:py-20">
      
      {/* 2. 顶部装饰：一个纯色的顶部条，增加层次感 */}
  

      {/* 3. 内容容器：这里是解决“溢出”的关键！ */}
      {/* max-w-3xl: 限制最大宽度为 48rem (约768px)，这是最佳阅读宽度 */}
      {/* mx-auto: 居中显示 */}
      {/* px-4: 手机端留出边距 */}
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* 返回首页的“面包屑”导航 */}
        <nav className="mb-8">
          <Link href="/" className="text-sm font-medium text-gray-500 hover:text-blue-600 flex items-center transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to 
          </Link>
        </nav>

        {/* 文章头部信息 */}
        <header className="mb-10 text-center">
          {/* 分类标签 (示例) */}
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wide mb-4">
            BLOG POST
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>

          <div className="flex items-center justify-center text-gray-500 text-sm space-x-4">
            <div className="flex items-center">
               {/* 作者头像占位符 */}
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-xs font-bold text-gray-500">
                {post.author.node.name.charAt(0)}
              </div>
              <span>{post.author.node.name}</span>
            </div>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
        </header>

        {/* 4. 文章正文：Typography插件的威力 */}
        {/* prose: 开启排版插件 */}
        {/* prose-lg: 设置合适的字号 */}
        {/* max-w-none: 允许内容填满我们的父容器 (因为父容器 max-w-3xl 已经限制了宽度) */}
        {/* prose-img:rounded-xl: 给所有文章内的图片加圆角 */}
        {/* break-words: 强制长单词换行，防止溢出！！ */}
        <div 
          className="
            prose prose-lg max-w-none 
            prose-headings:font-bold prose-headings:text-gray-900 
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
            wrap-words
          "
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </div>
    </article>
  );
}