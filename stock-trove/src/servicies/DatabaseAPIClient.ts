import axios from 'axios';

const serverBaseUrl = 'http://localhost:3000';

export const createUser = async (userData : {email: string, password: string}) => {
  try {
    const response = await axios.post(`${serverBaseUrl}/users/create`, userData);
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};

export const authenticateUser = async (userData : {email: string, password: string}) => {
  try {
    const response = await axios.get(`${serverBaseUrl}/users/authenticate`, {
      params: userData,
    });
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};

export const followCompany = async (companyData : {email:string, companyname: string, symbol : string , companydescription : string, employeecount : number, logourl : string}) => {
  try {
    const response = await axios.post(`${serverBaseUrl}/companies/follow`, companyData);
    return response.data;
  } catch (error :any) {
    throw error.response.data;
  }
};

export const unfollowCompany = async (unfollowData : {email:string, symbol: string}) => {
  try {
    const response = await axios.delete(`${serverBaseUrl}/companies/unfollow`, {
      data: unfollowData,
    });
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};

export const getUserFollows = async (userData : {email:string}) => {
  try {
    const response = await axios.get(`${serverBaseUrl}/users/getfollows`, {
      params: userData,
    });
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};

export const deleteUserAccount = async (email: string): Promise<string> => {
  try {
    const response = await axios.delete(`${serverBaseUrl}/users/delete`, {
      data: { email : email },
    });

    return response.data;

  } catch (error : any) {
    throw error.response.data;
  }
};

export const updateUserInformation = async (
  userData: { email: string; newemail: string; password: string }
): Promise<string> => {
  try {
    const response = await axios.put(`${serverBaseUrl}/users/updateinfo`, userData);

    return response.data;

  } catch (error : any) {
    throw error.response.data;
  }
};

export const updateEmail = async (
  emailData: { email: string; newemail: string }
) => {
  try {
    const response = await axios.put(`${serverBaseUrl}/users/updateemail`, emailData);
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};

export const updateNotificationTypes = async (userData: {email : string, type1: number, type2: number}) => {
  try {
    const response = await axios.put(`${serverBaseUrl}/users/updatenotificationtypes`, userData);
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};

export const getNotificationTypes = async (email : string) => {
  try {
    const response = await axios.get(`${serverBaseUrl}/users/getnotificationtypes`, {
      params: { email },
    });

    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};


export const getUserRecommendations = async (email : string) => {
  try {
    const response = await axios.get(`${serverBaseUrl}/users/recommendations`, {
      params: { email },
    });
    
    return response.data;
  } catch (error : any) {
    throw error.response.data;
  }
};