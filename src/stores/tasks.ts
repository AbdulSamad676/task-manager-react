import axios from '../services/axios';
import { makeAutoObservable } from 'mobx';

class TaskStore {
  //   task = {
  //     name: '',
  //     email: '',
  //   };
  comments = [];
  tasks = [];

  constructor() {
    makeAutoObservable(this);
  }

  private setTesks = (data: any) => {
    this.tasks = data;
  };
  private addTask = (data: any) => {
    this.tasks.push(data);
  };
  private removeTask = (id: string) => {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  };
  private setComments = (data: any) => {
    this.comments = data;
  };
  createTask = async (id: any, data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`/v1/project/${id}/task`, data)
        .then(({ data }) => {
          //   this.setProject(data.data);
          this.addTask(data.data); // Add the new project to the projects array

          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };

  getTasks = async (id: any) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/v1/project/${id}/task`)
        .then(({ data }) => {
          this.setTesks(data.data);
          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
  deleteTask = async (projectId: string, taskId: any) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/v1/project/${projectId}/task/${taskId}`)
        .then(() => {
          this.removeTask(taskId); // Remove the project from the projects array
          resolve(true);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
  updateTask = async (projectId: any, taskId: any, data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`/v1/project/${projectId}/task/${taskId}`, data)
        .then(({ data }) => {
          //   this.setTa(data.data);
          this.addTask(data.data);

          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };

  assignTaskUser = async (projectId: any, taskId: any, data: any) => {
    // console.log('ID', id);

    return new Promise((resolve, reject) => {
      axios
        .post(`/v1/project/${projectId}/task/${taskId}/assign`, data)
        .then(() => {
          console.log('Projects Assigned');
          resolve(true);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
  // showComments = () .get(` /v1/project/{project}/task/{task}/comment`)
  showComments = async (projectId: any, taskId: any) => {
    return new Promise((resolve, reject) => {
      axios

        .get(`/v1/project/${projectId}/task/${taskId}/comment`)
        .then(({ data }) => {
          console.log('✅ comment in store    ', data.data);

          this.setComments(data.data);
          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
}

export default new TaskStore();
