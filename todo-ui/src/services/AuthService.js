// Functions are used to store the user authentication details in the browser localStorage
// so by this we will be able to access the todoApi's

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (userName, role) => {
  sessionStorage.setItem("authenticatedUser", userName);
  sessionStorage.setItem("role", role);
};

export const isUserLoggedIn = () => {

  return sessionStorage.getItem("authenticatedUser");
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const isAdminUser = () => {
  const role = sessionStorage.getItem("role");
  return role === "ROLE_ADMIN";
};
