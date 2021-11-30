export const sessionHelper = {
  setItem: (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  },
  getItem: (key: string) => {
    return sessionStorage.getItem(key);
  },
  removeOneItem: (key: string) => {
    sessionStorage.removeItem(key);
  },
  //dont use this unless this is necessary to do
  removeAll: () => {
    sessionStorage.clear();
  },
};
