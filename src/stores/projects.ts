import axios from '../services/axios';
import { makeAutoObservable } from 'mobx';

class ProjectStore {
  project = {
    name: '',
    description: '',
  };
  projects = [];

  constructor() {
    makeAutoObservable(this);
  }

  private setProject = (data: any) => {
    this.project = data;
  };
  private setProjects = (data: any) => {
    this.projects = data;
  };
  private addProject = (data: any) => {
    this.projects.push(data);
  };
  private removeProject = (id: string) => {
    this.projects = this.projects.filter((project) => project.id !== id);
  };
  // createProject = async (data: any) => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post('/v1/admin/project', data)
  //       .then(({ data }) => {
  //         this.setProject(data.data);

  //         resolve(data.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         reject(false);
  //       });
  //   });
  // };
  createProject = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/v1/admin/project', data)
        .then(({ data }) => {
          this.setProject(data.data);
          this.addProject(data.data); // Add the new project to the projects array

          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };

  updateProject = async (id: any, data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`/v1/admin/project/${id}`, data)
        .then(({ data }) => {
          // this.setProject(data.data);
          this.addProject(data.data);

          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
  getProjects = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/admin/project')
        .then(({ data }) => {
          this.setProjects(data.data);
          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
  deleteProject = async (id: string) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/v1/admin/project/${id}`)
        .then(() => {
          this.removeProject(id); // Remove the project from the projects array
          resolve(true);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
  assignProjectUser = async (id: any, data: any) => {
    console.log('ID', id);

    return new Promise((resolve, reject) => {
      axios
        .post(`/v1/admin/project/${id}/assign`, data)
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
  getProject = async (id: any) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/v1/project/${id}`)
        .then((res) => {
          const projectData = res?.data?.data;
          console.log('✅ res    ', projectData);
          resolve(projectData);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
}
export default new ProjectStore();
