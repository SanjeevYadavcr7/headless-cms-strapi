import type { Project, StrapiProject, StrapiResponse } from '~/types';
import type { Route } from './+types/details';
import { Link } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';

export async function loader({ request, params }: Route.LoaderArgs) {
  const projectData = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?filters[documentId][$eq]=${params.id}&populate=*`
  );
  if (!projectData.ok) throw new Response('Page not found', { status: 404 });

  const projectJSON: StrapiResponse<StrapiProject> = await projectData.json();
  const projectItem = projectJSON.data[0];
  const project: Project = {
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
  };
  return { project };
}

export function HydrateFallback() {
  return <div>Loading...</div>;
}

const ProjectDetailsPage = ({ loaderData }: Route.ComponentProps) => {
  const { project } = loaderData;
  return (
    <>
      <Link
        to='/projects'
        className='flex items-center text-blue-400 hover:text-blue-500 mb-6 transition'
      >
        <FaArrowLeft className='mr-2' />
        Back to projects
      </Link>

      <div className='grid gap-8 md:grid-cols-2 items-start'>
        <div>
          <img
            src={project.image}
            alt={project.title}
            className='w-full rounded-lg shadow-md'
          />
        </div>
        <div>
          <h1 className='text-3xl font-bold text-blue-400 mb-4'>
            {project.title}
          </h1>
          <p className='text-gray-4 text-sm mb-4'>
            {new Date(project.date).toDateString()} - {project.category}
          </p>
          <p className='text-gray-200 mb-6'>{project.description}</p>
          <a
            href={project.url}
            target='_blank'
            className='inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded transition'
          >
            View Live Site →
          </a>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsPage;
