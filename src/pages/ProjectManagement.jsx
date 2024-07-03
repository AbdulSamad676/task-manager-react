import React from 'react';

function ProjectManagement() {
  // useEffect(() => {

  //   // console.log('data', data);
  // }, []);

  const detData = () => {
    const data = fetch('https://task-manager.codionslab.com/api/v1/admin/user')
      .then((res) => {
        console.log('dddd', res);
      })
      .catch((err) => {
        console.log('error', err);
      });
  };
  return (
    <div>
      <h1>project management</h1>
      <button onClick={detData}>get</button>
    </div>
  );
}

export default ProjectManagement;
