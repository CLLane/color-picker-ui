import { cleanPalettes } from './helpers';

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
    return cleanPalettes(palettes);
  } catch (error) {
    throw new Error(error.message)
  }
};

export const getAllPalettes = async () => {
  try {
    const response = await fetch('http://localhost:3001/palettes');
    const result = await response.json()
    return cleanPalettes(result)
  } catch (error) {
    throw new Error(error.message)
  }
}

export const postNewUser = async (userInfo) => {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch('http://localhost:3001/user/signup', options);
    if (!response.ok) {
      throw new Error('Unable to Sign Up');
    }
    const result = await response.json();
    return result.id;
  } catch (error) {
    throw new Error(error.message)
  }
};

export const postNewProject = async (projectInfo) => {
  try { 
    const options = {
      method: 'POST',
      body: JSON.stringify(projectInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch('http://localhost:3001/projects', options);
    if (!response.ok) {
      throw new Error('Unable to create Project');
    } 
    const result = await response.json();
    return result.id;
  } catch (error) {
    throw new Error (error.message)
  }
};

export const postNewPalette = async (paletteInfo) => {
  try { 
    const options = {
      method: 'POST',
      body: JSON.stringify(paletteInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch('http://localhost:3001/palettes', options);
    if (!response.ok) {
      throw new Error('Unable to create Palette');
    } 
    const result = await response.json();
    return result.id;
  } catch (error) {
    throw new Error (error.message)
  }
};

export const deletePalette = async (id) => {
  try { 
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(`http://localhost:3001/palettes/${id}`, options);
    if (!response.ok) {
      throw new Error('Unable to delete Palette');
    } 
    return response;
  } catch (error) {
    throw new Error (error.message)
  }
};

export const deleteProject = async (id) => {
  try { 
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(`http://localhost:3001/projects/${id}`, options);
    if (!response.ok) {
      throw new Error('Unable to delete Project');
    } 
    return response;
  } catch (error) {
    throw new Error (error.message)
  }
};

export const editProjectName = async (project) => {
  try { 
    const options = {
      method: 'PATCH',
      body: JSON.stringify(project),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await fetch(`http://localhost:3001/projects/${project.id}`, options);
    if (!response.ok) {
      throw new Error('Unable to edit Project');
    } 
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error (error.message)
  }
};