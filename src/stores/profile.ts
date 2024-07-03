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
}

export default new ProfileStore();
