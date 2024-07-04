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

  createProject = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/v1/admin/project', data)
        .then(({ data }) => {
          this.setProject(data.data);
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
