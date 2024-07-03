import axios from '../services/axios';
import { makeAutoObservable } from 'mobx';

class ProfileStore {
  profile = {} as any;

  constructor() {
    makeAutoObservable(this);
  }

  private setProfile = (data: any) => {
    this.profile = data;
  };

  getProfile = async (token: any) => {
    return new Promise((resolve, reject) => {
      axios
        .get('/v1/profile', token)
        .then(({ data }) => {
          this.setProfile(data.data);
          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };

  updateProfile = async (data: any) => {
    return new Promise((resolve, reject) => {
      //   alert('promise callseed');
      axios
        .post('/v1/profile', data)
        .then((data) => {
          console.log('update data', data);
          //   Here I am having a responce with msg
          this.setProfile(data.data);
          resolve(data.data);
        })
        .catch((e) => {
          console.log(e);
          reject(false);
        });
    });
  };
}

export default new ProfileStore();

// import axios from '../services/axios';
// import { makeAutoObservable } from 'mobx';

// class ProfileStore {
//   profile = {} as any;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   private setProfile = (data: any) => {
//     this.profile = data;
//   };

//   getProfile = async (token: any) => {
//     try {
//       const { data } = await axios.get('/v1/profile', token);
//       this.setProfile(data.data);
//       return data.data;
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//       throw error;
//     }
//   };

//   updateProfile = async (data: any) => {
//     try {
//       const { data: updatedData } = await axios.put('/v1/profile', data);
//         this.setProfile(updatedData.data);
//       return updatedData.data;
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       throw error;
//     }
//   };
// }

// export default new ProfileStore();
