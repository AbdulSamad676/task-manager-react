import React, { useEffect, useState } from 'react';
import { useStore } from '../stores';
function Taskmanagement() {
  // const { getTasks } = useStore('tasks');
  // const { getTasks, tasks } = useStore('tasks');
  // const [tasksData, setTasksData] = useState([]);

  // useEffect(() => {
  //   getTasks()
  //     .then((res) => {
  //       console.log('succsfully fatched', res?.data);
  //     })
  //     .catch((err) => {
  //       console.log('Err', err);
  //     });
  // }, []);

  // console.log('✅ tasks    ', tasks);

  return <div>Taskmanagement</div>;
}

export default Taskmanagement;
