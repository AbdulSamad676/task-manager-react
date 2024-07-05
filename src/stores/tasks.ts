import axios from '../services/axios';
import { makeAutoObservable } from 'mobx';

class TaskStore {
  //   task = {
  //     name: '',
  //     email: '',
  //   };
  tasks = [];

  constructor() {
    makeAutoObservable(this);
  }

  private setTesks = (data: any) => {
    this.tasks = data;
  };
  //   private setUsers = (data: any) => {
  //     this.users = data;
  //   };
  //   private removeUser = (id: string) => {
  //     this.users = this.users.filter((users) => users.id !== id);
  //   };
  //   addUser = (data: any) => {
  //     this.users = [...this.users, data];
  //   };
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
}
export default new TaskStore();
