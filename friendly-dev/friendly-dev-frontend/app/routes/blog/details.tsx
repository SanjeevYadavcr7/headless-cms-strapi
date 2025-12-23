import type { PostMeta, StrapiPost, StrapiResponse } from '~/types';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router';
import type { Route } from './+types/details';

export async function loader({ request, params }: Route.LoaderArgs) {
  const { documentId } = params;

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?filters[documentId][$eq]=${documentId}&populate=image`
  );

  if (!res.ok) throw new Error('Failed to fetch blog data');

  const jsonData: StrapiResponse<StrapiPost> = await res.json();
  if (!jsonData.data.length)
    throw new Response('Blog not found!', { status: 404 });

  // Dynamically import markdown format
  const singlePost = jsonData.data[0];
  const post = {
    id: singlePost.id,
    documentId: singlePost.documentId,
    slug: singlePost.slug,
    title: singlePost.title,
    excerpt: singlePost.excerpt,
    date: singlePost.date,
    body: singlePost.body,
    image: singlePost.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${singlePost.image.url}`
      : '/images/no-image.png',
  };
  return { post };
}

const BlogDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { post } = loaderData;

  return (
    <div className='max-w-3xl mx-auto px-6 py-12 bg-gray-900'>
      <h1 className='text-3xl font-bold text-blue-400 mb-2'>{post.title}</h1>
      <p className='text-sm text-gray-400 mb-6'>
        {new Date(post.date).toDateString()}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className='w-full h-64 object-cover mb-4'
        />
      )}

      <div className='prose prose-invert max-w-none mb-12'>
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>

      <Link
        to='/blog'
        className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
      >
        ← Back To Posts
      </Link>
    </div>
  );
};

export default BlogDetailsPage;
