import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router-dom for routing
import { useStore } from '../stores'; // Adjust the import according to your project structure

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the project ID from the URL
  const { getProject } = useStore('projects'); // Get the getProject function from your store
  const { getTasks } = useStore('tasks');
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      getProject(id)
        .then((data: any) => {
          setProject(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
        });

      // get all tasks
      getTasks(id)
        .then((data: any) => {
          setTasks(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
          setLoading(false);
        });
    }
  }, [id, getProject, getTasks]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading project data</div>;
  }

  if (!project) {
    return <div>No project data found</div>;
  }

  console.log('✅ tasks    ', tasks);

  return (
    <div>
      <h1>{project?.name}</h1>
      <p>{project?.description}</p>
      {/* Render other project details here */}
      {project?.users.map((user: any) => (
        <div key={user.id}>
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectDetails;
