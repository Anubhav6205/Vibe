//stores active users

export let usersSocket=[];

export const addUserSocket = (userData, socketId) => {
    const existingUserIndex = usersSocket.findIndex(
      (user) => user?.sub === userData?.sub
    );
  
    if (existingUserIndex !== -1) {
      // Update the socket ID for the existing user
      usersSocket[existingUserIndex].socketId = socketId;
    } else {
      // Add the user to the array if it doesn't exist
      usersSocket.push({ ...userData, socketId });
    }
  };

//getting socket id
//returning user (with socket it) for user with same sub in array 
export const getUserSocket=(userData)=>{
    return usersSocket.find(user=>user?.sub===userData)
}