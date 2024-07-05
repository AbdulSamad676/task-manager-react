import axios from '../services/axios';
import { makeAutoObservable } from 'mobx';

class ProjectStore {
  project = {
    name: '',
    description: '',
    users: [],
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
  //   updateProfile = async (data: any) => {
  //     return new Promise((resolve, reject) => {
  //       //   alert('promise callseed');
  //       axios
  //         .post('/v1/profile', data)
  //         .then((data) => {
  //           console.log('update data', data);
  //           //   Here I am having a responce with msg
  //           this.setProfile(data.data);
  //           resolve(data.data);
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //           reject(false);
  //         });
  //     });
  //   };
  // }
}
export default new ProjectStore();
