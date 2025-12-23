import type React from 'react';
import type { Project } from '~/types';
import ProjectCardComponent from './ProjectCard';

type FeaturedProjectsProps = {
  projects: Project[];
  count: number;
};

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({
  projects,
  count = 2,
}) => {
  if (projects.length === 0) return null;

  return (
    <>
      <section>
        <h2 className='text-2xl font-bold mb-6 text-gray-200'>
          🌟 Featured Projects
        </h2>
        <div className='grid gap-6 sm:grid-cols-2'>
          {projects.map((project) => (
            <ProjectCardComponent key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedProjects;
