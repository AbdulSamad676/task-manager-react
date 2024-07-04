import auth from './auth';
import profile from './profile';
import projects from './projects';
import users from './users';
const stores = {
  auth,
  profile,
  users,
  projects,
};
export function useStore<T extends keyof typeof stores>(
  name: T,
): (typeof stores)[T] {
  return stores[name];
}
