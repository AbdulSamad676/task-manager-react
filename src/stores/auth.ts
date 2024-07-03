import { makeAutoObservable } from 'mobx';
import axios from '../services/axios';

class AuthStore {
  isAuthorized = false;
  role = '';
  user = {};
  constructor() {
    makeAutoObservable(this);
  }

  private setAuthorize() {
    this.isAuthorized = true;
    this.user = {};
  }
  private setUser(data: any) {
    this.user = data;
  }

  private setRole = (role: string) => {
    localStorage.setItem('role', role);
    this.role = role;
  };

  loginUser = async (data: any) => {
    try {
      const res = await axios.post('/v1/login', data);
      if (res.status == 200) {
        const { data } = res;
        // console.log('data in store', data);
        localStorage.setItem('logged', 'true');
        localStorage.setItem('token', data?.data.token);
        // console.log('token in store', data?.data.access_token);
        this.setUser(data?.data);
        // profile.getProfile().then((data: any) => {
        console.log('user in store', data?.data.token);
        this.setAuthorize();
        this.setRole(data?.data.user.role);
        localStorage.setItem('userRole', data?.data.user.role);
        // });
        return res;
      }
    } catch (e) {
      return e;
    }
  };
  registerUser = async (data: any) => {
    try {
      const res = await axios.post('/v1/register', data);
      console.log('api response', res);
      if (res.status == 200) {
        // const profile_data = await profile.getProfile();
        // if (profile_data) {
        //   console.log(profile_data);
        //   localStorage.setItem('userType', profile_data?.type);
        // }
        console.log(res);
        // this.setUnAuthorize();
        localStorage.setItem('logged', 'true');
        localStorage.setItem('token', res.data.access_token);
      }
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}

// export default const auth = new AuthStore();
export default new AuthStore();
