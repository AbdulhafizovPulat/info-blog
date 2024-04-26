export const SetItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.log("Error saving token");
  }
};

export const GetItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.log("Error getting token");
  }
};

export const RemoveItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.log("Error removing token");
  }
};
