import auth from './auth';

const stores = {
  auth,
};
export function useStore<T extends keyof typeof stores>(
  name: T,
): (typeof stores)[T] {
  return stores[name];
}
