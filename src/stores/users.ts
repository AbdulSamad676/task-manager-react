// stores/UserStore.ts

import axios from '../services/axios';
import { makeAutoObservable } from 'mobx';

class UserStore {
  users = [] as any[];

  constructor() {
    makeAutoObservable(this);
  }

  private setUsers = (data: any[]) => {
    this.users = data;
  };

  private updateUserInStore = (userId: any, updatedUser: any) => {
    const index = this.users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  };

  private removeUserFromStore = (userId: any) => {
    this.users = this.users.filter((user) => user.id !== userId);
  };

  getUsers = async (storedToken: any) => {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/admin/user', storedToken)
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

  addUser = async (userData: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post('/v1/admin/user', userData)
        .then(({ data }) => {
          this.users.push(data.data);
          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };

  updateUser = async (userId: any, userData: any) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`/v1/admin/user/${userId}`, userData)
        .then(({ data }) => {
          this.updateUserInStore(userId, data.data);
          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };

  deleteUser = async (userId: any) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/v1/admin/user/${userId}`)
        .then(() => {
          this.removeUserFromStore(userId);
          resolve(true);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };

  assignProjectToUser = async (userId: any, projectId: any) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`/v1/admin/project/${projectId}/assign`, { userId })
        .then(({ data }) => {
          this.updateUserInStore(userId, data.data);
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
