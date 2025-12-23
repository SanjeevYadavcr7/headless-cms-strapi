import type { Project, StrapiProject, StrapiResponse } from '~/types';
import type { Route } from './+types/index';
import ProjectCardComponent from '~/components/ProjectCard';
import { useState } from 'react';
import Pagination from '~/components/Pagination';
import { AnimatePresence, motion } from 'framer-motion';

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const projectsData = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`
  );
  const projectsJSON: StrapiResponse<StrapiProject> = await projectsData.json();
  const projects = projectsJSON.data.map((project: any) => ({
    id: project.id,
    documentId: project.documentId,
    title: project.title,
    description: project.description,
    image: project.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${project.image.url}`
      : '/images/no-image.png',
    url: project.url,
    date: project.date,
    category: project.category,
    featured: project.featured,
  }));
  return { projects };
}

const ProjectsPage = ({ loaderData }: Route.ComponentProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const { projects } = loaderData as { projects: Project[] };

  // project categories to filter projects
  const categories = [
    'All',
    ...new Set(projects.map((project) => project.category)),
  ];
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const lastProjectIndex = currentPage * projectsPerPage;
  const firstProjectIndex = lastProjectIndex - projectsPerPage;
  const currentPageProjects = filteredProjects.slice(
    firstProjectIndex,
    lastProjectIndex
  );

  return (
    <>
      <h2 className='text-3xl text-white font-bold mb-8'>🚀 Projects</h2>

      <div className='flex flex-wrap gap-2 mb-8'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded text-sm cursor-pointer ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-200'
            } `}
          >
            {category}
          </button>
        ))}
      </div>

      <AnimatePresence mode='wait'>
        <motion.div layout className='grid gap-6 sm:grid-cols-2'>
          {currentPageProjects.map((project) => (
            <motion.div layout key={project.id}>
              <ProjectCardComponent project={project} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(idx: number) => setCurrentPage(idx)}
      />
    </>
  );
};

export default ProjectsPage;
