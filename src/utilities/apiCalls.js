export const getUser = async (userInfo) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch('http://localhost:3001/user/login', options);
    if(!response.ok) {
      throw new Error ('Unable to Login');
    }
    const result = await response.json();
    return result.id;
  } catch (error) {
    throw new Error(error.message)
  }
};

export const getUserProjects = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/projects/${id}`);
    const projects = await response.json();
    return projects;
  } catch (error) {
    throw new Error(error.message)
  }
};

export const getUserPalettes = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/palettes/${id}`);
    const palettes = await response.json();
    return palettes;
  } catch (error) {
    throw new Error(error.message)
  }
};