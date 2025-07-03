export const saveToLocalStorage = (profile: any) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const loadFromLocalStorage = () => {
  const data = localStorage.getItem("profile");
  return data ? JSON.parse(data) : null;
};

export const clearLocalStorage = () => {
  localStorage.removeItem("profile");
};
