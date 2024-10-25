export const mockLogin = (email: string, password: string): boolean => {
  if (email && password) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    return true;
  }
  return false;
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("isLoggedIn") === "true";
};

export const getUserCredentials = (): {
  email: string | null;
  password: string | null;
} => {
  return {
    email: localStorage.getItem("userEmail"),
    password: localStorage.getItem("userPassword"),
  };
};

export const logout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userPassword");
};
