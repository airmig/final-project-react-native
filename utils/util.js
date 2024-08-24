export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
  };
  

  export const validateFirstName = (name) => {
    if (name.length === 0) {
        return false; 
    }
    return /^[A-Za-z]+$/.test(name);
}