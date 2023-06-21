import axios from "axios";

export const addUser = async (data) => {
  const url = "http://localhost:8000";
  try {
    await axios.post(`${url}/addUser`, data);
  } catch (error) {
    console.log(`Error while adding user:${error}`);
  }
};

export const getUser = async () => {
  const url = "http://localhost:8000";
  try {
    let users = await axios.get(`${url}/getUser`);
  //  console.log(users);
    return users.data;
  } catch (error) {
    console.log(`Error while fetching user:${error}`);
  }
};

export const setConversation = async (data) => {
  const url = "http://localhost:8000";
  try {
    await axios.post(`${url}/conversation/add`, data);
   // console.log(`Conversation set successfully`);
  } catch (error) {
    console.log(`Error in setting conversation :${error}`);
  }
};

export const getConversation = async (data) => {
  const url = "http://localhost:8000";
  try {
    const response=await axios.post(`${url}/conversation/get`,data);
  //  console.log(`Conversation fetched successfully in api.jsx`);
    return response.data;
  } catch (error) {
    console.log(`Error in getting conversation :${error}`);
  }
};


export const newMessage=async(data)=>{
  const url = "http://localhost:8000";
  try{
    const response=await axios.post(`${url}/message/add`,data);
    // console.log(`Message sent successfully in api.jsx`);
    return response.data;


  }
  catch(error)
  {
    console.log(`Error in sending message :${error}`);
  }
  
}

export const getMessages=async(id)=>{
  const url = "http://localhost:8000";
  try{

    //id is the params
    let response=await axios.get(`${url}/messages/get/${id}`);
    // console.log(`Messages fetched successfully in api.jsx`);
    return response.data;

  }
  catch(error)
  {
   
    console.log(`Error in getting message:${error}`)
  }
  
}


export const uploadFile=async(data)=>{
  const url = "http://localhost:8000";
  try{
    return await axios.post(`${url}/file/upload`,data);
    
  }catch(error)
  {
    console.log(`Error in uploading file:${error}`);
  }

  
}



export const addAboutUser=async(data)=>{
  const url = "http://localhost:8000";
  try{
    await axios.post(`${url}/aboutUser/add`,data);
    console.log(`About set successfully in api.jsx`);

  }
  catch(error){
    console.log(`Error in setting about:${error}`);
  }
  

}


export const getAboutUser = async (sub) => {
  const url = "http://localhost:8000";
  try {
    const response = await axios.get(`${url}/aboutUser/get`, {
      params: { sub: sub },
    });
    return response.data;
  } catch (error) {
    console.log(`Error in getting about: ${error}`);
  }
};