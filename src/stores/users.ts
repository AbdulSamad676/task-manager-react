// import axios from '../services/axios';
// import { makeAutoObservable } from 'mobx';

// class UserStore {
//   user = {
//     name: '',
//     email: '',
//   };
//   users = [];

//   constructor() {
//     makeAutoObservable(this);
//   }

//   private setUser = (data: any) => {
//     this.user = data;
//   };
//   private setUsers = (data: any) => {
//     this.users = data;
//     // this.users = [...this.users, data];
//   };
//   private removeUser = (id: any) => {
//     this.users = this.users.filter((user) => user.id !== id);
//   };
//   addUser = (data: any) => {
//     this.users = [...this.users, data];
//   };
//   getUsers = async () => {
//     return new Promise((resolve, reject) => {
//       axios
//         .get('/v1/admin/user')
//         .then(({ data }) => {
//           this.setUsers(data.data);
//           resolve(data.data);
//         })
//         .catch((e) => {
//           console.log(e);
//           reject(false);
//         });
//     });
//   };

//   createUser = async (data: any) => {
//     return new Promise((resolve, reject) => {
//       axios
//         .post('/v1/admin/user', data)
//         .then(({ data }) => {
//           this.setUser(data.data);
//           this.addUser(data.data); // Add the new project to the projects array

//           resolve(data.data);
//         })
//         .catch((e) => {
//           console.log(e);
//           reject(false);
//         });
//     });
//   };
//   updateUser = async (id: any, data: any) => {
//     return new Promise((resolve, reject) => {
//       axios
//         .put(`/v1/admin/user/${id}`, data)
//         .then(({ data }) => {
//           // this.setProject(data.data);
//           this.addUser(data.data);

//           resolve(data.data);
//         })
//         .catch((e) => {
//           console.log(e);
//           reject(false);
//         });
//     });
//   };
//   deleteUser = async (id: string) => {
//     return new Promise((resolve, reject) => {
//       axios
//         .delete(`/v1/admin/user/${id}`)
//         .then(() => {
//           this.removeUser(id); // Remove the project from the projects array
//           resolve(true);
//         })
//         .catch((e) => {
//           console.log(e);
//           reject(false);
//         });
//     });
//   };
// }
// export default new UserStore();
import axios from '../services/axios';
import { makeAutoObservable, action, observable } from 'mobx';

class UserStore {
  @observable user = {
    name: '',
    email: '',
  };
  @observable users: any[] = []; // Ensure users is initialized as an empty array

  constructor() {
    makeAutoObservable(this);
  }

  @action private setUser = (data: any) => {
    this.user = data;
  };

  @action private setUsers = (data: any) => {
    this.users = data;
  };

  @action private removeUser = (id: any) => {
    this.users = this.users.filter((user) => user.id !== id);
  };

  @action addUser = (data: any) => {
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
          this.addUser(data.data); // Add the new user to the users array

          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };

  updateUser = async (id: any, data: any) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`/v1/admin/user/${id}`, data)
        .then(({ data }) => {
          this.addUser(data.data);

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
          this.removeUser(id); // Remove the user from the users array
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
