import auth from './auth';
import profile from './profile';

const stores = {
  auth,
  profile,
};
export function useStore<T extends keyof typeof stores>(
  name: T,
): (typeof stores)[T] {
  return stores[name];
}
