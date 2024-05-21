const API_URL_User = process.env.API_URL_User;

export const createUser = async (userData) => {
    try {
      const response = await fetch(API_URL_User, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  };
  
export const getAllUsers = async () => {
   
    try {
       
        const response = await fetch(`${API_URL_User}`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        const data = await response.json();
     
        return data;
    } catch (error) {
        console.error('Error getting all users:', error);
        return null;
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const response = await fetch(`${API_URL_User}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await fetch(`${API_URL_User}${userId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete user');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting user:', error);
        return null;
    }
};
export const searchUsers = async (name, role) => {
    try {
    console.log(`${API_URL_User}search?name=${name}&role=${role}`);
      const response = await fetch(`${API_URL_User}search?name=${name}&role=${role}`);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error searching users:', error.message);
      return null;
    }
  };