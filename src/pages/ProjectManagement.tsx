import React, { useEffect, useState } from 'react';
import { useStore } from '../stores';

function ProjectManagement() {
  const { getProjects } = useStore('projects');
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    getProjects()
      .then((res) => {
        // console.log('All projects', res?.data);
        setProjects(res?.data);
      })
      .catch((err) => {
        console.log('ERR:', err);
      });
  }, []);
  console.log('✅ projects    ', projects);

  return (
    <div>
      <h1>project management</h1>

      {projects?.map((item) => {
        return (
          <div className='projectCard p-3 rounded-md bg-slate-400 text-balance my-2 '>
            <p className='projectName text-xl font-semibold '>{item?.name}</p>
            <p className=' text-base font-normal '>{item.description}</p>
          </div>
        );
      })}

      {/* <button>get</button> */}
    </div>
  );
}

export default ProjectManagement;
