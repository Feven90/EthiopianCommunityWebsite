import axios from 'axios';


const getUserProfile = uid => new Promise((resolve, reject) => {
  axios
    .get(`http://localhost:50319/api/user/${uid}`)
    .then((res) => {
      let customer = res.data;
      resolve(customer);
    })
    .catch(err => reject(err));
});

const postUserRequest = (userInfo) => axios.post(`http://localhost:50319/api/user/register`, userInfo);

const updateUserRequest = (user) => axios.put(`http://localhost:50319/api/user/${user}`, user);

export default {
  postUserRequest,
  getUserProfile,
  updateUserRequest
}