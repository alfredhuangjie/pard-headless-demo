

import Link from 'next/link';
import { client } from '@/lib/urql'; // 确认这里导入的是 client

export const revalidate = 20;
// 【核心修正】把我们的GraphQL查询语句，定义成一个常量
const ALL_POSTS_QUERY = `
  query GetAllPostsForHome {
    posts(first: 20) {
      nodes {
        title
        slug
        date
        postExtras {
          articleExcerpt
        }
      }
    }
  }
`;

export default async function Home() {
  // 调用 client.query，并把我们定义的查询常量传进去
  const { data } = await client.query(ALL_POSTS_QUERY, {});
  
  const allPosts = data?.posts.nodes;

  if (!allPosts || allPosts.length === 0) {
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Question question </h1>
        <p>暂无文章或数据加载失败。请检查WordPress后台是否有已发布的文章，并确认API连接正常。</p>
      </main>
    );
  }

  return ( // 1. 外部容器：设置背景色，并确保最小高度
    <main className="bg-gray-50 min-h-screen py-12 md:py-20">
      
      {/* 2. 内容限制器：container + mx-auto 确保内容居中且不溢出 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 头部区域 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          NV007SP2
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            4K LRF Night Vision Clip-On Adapter
          </p>
        </div>

        {/* 3. 响应式网格系统：手机1列，平板2列，电脑3列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          {allPosts.map((post: any) => (
            // 4. 卡片组件本体
            <article 
              key={post.slug} 
              className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
            >
              {/* (未来可以在这里放文章封面图) */}
              
              <div className="p-6 flex flex-col grow">
                {/* 日期标签 */}
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-medium text-xs">
                    BLOG
                  </span>
                  <span className="mx-2">•</span>
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>

                {/* 标题 */}
                <Link href={`/blog/${post.slug}`} className="group block mb-3">
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                {/* 摘要 (限制行数，多余显示省略号) */}
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 grow">
                  {post.postExtras?.articleExcerpt || 'Nothing is here'}
                </p>

                {/* 底部链接 */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                   <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-blue-600 font-semibold text-sm hover:text-blue-800 flex items-center"
                  >
                    More of all 
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}

        </div>
      </div>
    </main>
  );
}