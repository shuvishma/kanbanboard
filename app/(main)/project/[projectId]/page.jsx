import React from "react";
import { getProject } from "@/actions/project";
import { notFound } from "next/navigation";
import SprintCreationForm from "../_components/create-sprint";
import SprintBoard from "../_components/sprint-board";

const ProjectPage = async ({ params }) => {
  const { projectId } = params;
  const project = await getProject(projectId);

  if (!project) return notFound();

  console.log(project);

  return (
    <div>
      <div>
        <SprintCreationForm project={project} />

        {project.sprints.length > 0 ? (
          <SprintBoard
            sprints={project.sprints}
            projectId={projectId}
            orgId={project.organizationId}
          />
        ) : (
          <div>Create a sprint from button above</div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
