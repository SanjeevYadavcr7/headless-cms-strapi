import type { Route } from './+types';
import type {
  PostMeta,
  Project,
  StrapiPost,
  StrapiProject,
  StrapiResponse,
} from '~/types';
import FeaturedProjects from '~/components/FeaturedProjects';
import { useLoaderData } from 'react-router';
import AboutPreview from '~/components/AboutPreview';
import LatestPosts from '~/components/LatestPosts';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Portfolio | Home' },
    { name: 'description', content: 'Portfolio Website' },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: any[]; posts: PostMeta[] }> {
  const url = new URL(request.url);
  const [projectRes, postsRes] = await Promise.all([
    fetch(
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`
    ),
    fetch(`${import.meta.env.VITE_API_URL}/posts`),
  ]);

  if (!projectRes.ok || !projectRes.ok)
    throw new Error('Failed to fetch projects or posts request');

  const projectsJSON: StrapiResponse<StrapiProject> = await projectRes.json();
  const postsJSON: StrapiResponse<StrapiPost> = await postsRes.json();

  const projects = projectsJSON.data.map((projectItem) => ({
    id: projectItem.id,
    documentId: projectItem.documentId,
    title: projectItem.title,
    description: projectItem.description,
    image: projectItem.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${projectItem.image.url}`
      : '/images/no-image.png',
    url: projectItem.url,
    date: projectItem.date,
    category: projectItem.category,
    featured: projectItem.featured,
  }));

  const posts = postsJSON.data.map((singlePost) => ({
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
  }));

  return { projects, posts };
}

const HomePage = () => {
  const { projects, posts } = useLoaderData() as {
    projects: Project[];
    posts: PostMeta[];
  };

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
};

export default HomePage;
