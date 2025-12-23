import { Link } from 'react-router';
import type { PostMeta } from '~/types';

type LatestPostsType = {
  posts: PostMeta[];
  limit?: number;
};

const LatestPosts = ({ posts, limit = 3 }: LatestPostsType) => {
  return (
    <section className='max-w-6xl mx-auto px-6 py-12'>
      <h2 className='text-2xl font-bold mb-6 text-white'>🆕 Latest Posts</h2>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {posts.slice(0, limit).map((post) => (
          <Link
            to={`/blog/${post.documentId}`}
            key={post.documentId}
            className='block p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-md transition'
          >
            <h3 className='text-lg font-semibold text-blue-400 mb-1'>
              {post.title}
            </h3>
            <p className='text-sm text-gray-300'>{post.excerpt}</p>
            <p className='block mt-3 text-xs text-gray-400'>
              {new Date(post.date).toDateString()}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LatestPosts;
