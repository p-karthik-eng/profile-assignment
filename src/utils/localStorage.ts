import type { Profile } from "../store/profileSlice";

export const saveToLocalStorage = (profile: Profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const loadFromLocalStorage = () => {
  const data = localStorage.getItem("profile");
  return data ? JSON.parse(data) : null;
};

export const clearLocalStorage = () => {
  localStorage.removeItem("profile");
};
