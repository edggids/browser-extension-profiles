import { api } from "./api";

export type Storage = {
  get<T>(key:string, fallback:T): Promise<T>;
  set(key: string, data: any): Promise<void>;
  remove(key: string): Promise<void>;
}

const storage:Storage = {
  // TODO: check get[key]
  get<T>(key:string, fallback:T = null): Promise<T> {
      return api.storage.local.get(key)
        .then(result => {
          return result?.[key] ?? fallback;
        });
  },

  set(key: string, data: any): Promise<void>
  {
      return api.storage.local.set({ [key]: data });
  },

  remove(key: string): Promise<void>
  {
      return api.storage.local.remove(key);
  },
};

export default storage;
