import axios from '../services/axios';
import { makeAutoObservable } from 'mobx';

class UserStore {
  user = {
    name: '',
    email: '',
  };
  users = [];

  constructor() {
    makeAutoObservable(this);
  }

  private setUser = (data: any) => {
    this.user = data;
  };
  private setUsers = (data: any) => {
    this.users = data;
  };
  private removeUser = (id: string) => {
    this.users = this.users.filter((users) => users.id !== id);
  };
  addUser = (data: any) => {
    this.users = [...this.users, data];
  };
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

  createUser = async (data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/v1/admin/user', data)
        .then(({ data }) => {
          this.setUser(data.data);
          this.addUser(data.data); // Add the new project to the projects array

          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
  deleteUser = async (id: string) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/v1/admin/user/${id}`)
        .then(() => {
          this.removeUser(id); // Remove the project from the projects array
          resolve(true);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
}
export default new UserStore();
