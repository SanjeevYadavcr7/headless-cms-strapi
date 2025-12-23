import type { Route } from './+types';
import type { PostMeta, StrapiPost, StrapiResponse } from '~/types';
import PostCard from '~/components/PostCard';
import { useState } from 'react';
import Pagination from '~/components/Pagination';
import PostFilter from '~/components/PostFilter';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
  );
  if (!res.ok) throw new Error('Failed to fetch data');

  const jsonData: StrapiResponse<StrapiPost> = await res.json();
  const posts = jsonData.data.map((post) => ({
    id: post.id,
    documentId: post.documentId,
    title: post.title,
    excerpt: post.excerpt,
    slug: post.slug,
    date: post.date,
    body: post.body,
    image: post.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${post.image.url}`
      : '/images/no-image.png',
  }));

  return { posts };
}

const BlogComponent = ({ loaderData }: Route.ComponentProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const { posts } = loaderData;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const currentPostEndingIdx = currentPage * postsPerPage;
  const currentPostBegIdx = currentPostEndingIdx - postsPerPage;

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm)
  );
  const currentPageBlogs = filteredPosts.slice(
    currentPostBegIdx,
    currentPostEndingIdx
  );

  return (
    <div className='max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900'>
      <h2 className='text-3xl text-white font-bold mb-8'>📒 Blog</h2>

      <PostFilter
        searchTerm={searchTerm}
        onSearchChange={(query) => {
          setSearchTerm(query);
          setCurrentPage(1);
        }}
      />

      {currentPageBlogs.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(idx: number) => setCurrentPage(idx)}
      />
    </div>
  );
};

export default BlogComponent;
