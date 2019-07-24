import axios from 'axios';


const getUserProfile = uid => new Promise((resolve, reject) => {
  axios
    .get(`http://localhost:50028/api/user/${uid}`)
    .then((res) => {
      let user = res.data;
      resolve(user);
    })
    .catch(err => reject(err));
});

const postUserRequest = (userInfo) => axios.post(`http://localhost:50028/api/user/register`, userInfo);

const updateUserRequest = (user) => axios.put(`http://localhost:50028/api/user/${user}`, user);

export default {
  postUserRequest,
  getUserProfile,
  updateUserRequest
}