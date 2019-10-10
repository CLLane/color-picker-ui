export const getUser = async (userInfo) => {

 try {
    const options = {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const response = await fetch('http://localhost:3001/user/login', options);
  const result = await response.json();
  return result
} catch (error) {
  throw new Error ('Unable to Login');
}
}