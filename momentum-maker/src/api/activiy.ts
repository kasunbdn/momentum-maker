import axios from "axios";

  
const getRandomActivity = async (username: string) => {
    const rsp = await axios.get(`activity?username=${username}`);
    return rsp;
  }

  const getActivityList = async (username: string) => {
    const rsp = await axios.get(`userActivity?username=${username}`);
    return rsp;
  }

  const addActivityToUser = async (username: string, id: number) => {
    const rsp = await axios.post(`userActivity?username=${username}&activityId=${id}`);
    return rsp;
  }
  
  const removeActivityFromUser = async (id: number) => {
    const rsp = await axios.delete(`userActivity/${id}`);
    return rsp;
  }

  const startActivity = async (id: number) => {
    const rsp = await axios.put(`startActivity/${id}`);
    return rsp;
  }

  const completeActivity = async (id: number) => {
    const rsp = await axios.put(`completeActivity/${id}`);
    return rsp;
  }

  export { getActivityList, startActivity, completeActivity, addActivityToUser, getRandomActivity, removeActivityFromUser };