import axios from '../services/axios';
import { makeAutoObservable } from 'mobx';

class UserStore {
  // user = {
  //   name: '',
  //   description: '',
  // };
  users = [];

  constructor() {
    makeAutoObservable(this);
  }

  // private setProject = (data: any) => {
  //   this.project = data;
  // };
  private setUsers = (data: any) => {
    this.users = data;
  };

  // createProject = async (data: any) => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post('/v1/admin/project', data)
  //       .then(({ data }) => {
  //         this.setUsers(data.data);
  //         resolve(data.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //         reject(false);
  //       });
  //   });
  // };

  getUsers = async () => {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/admin/user')
        .then(({ data }) => {
          this.setUsers(data.data);
          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
}
export default new UserStore();
