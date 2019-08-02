import axios from 'axios';


const getUserProfile = uid => new Promise((resolve, reject) => {
  axios
    .get(`http://localhost:63183/api/user/${uid}`)
    .then((res) => {
      console.log(res);
      let user = res.data;
      resolve(user);
    })
    .catch(err => reject(err));
});

const postUserRequest = (userInfo) => axios.post(`http://localhost:63183/api/user/register`, userInfo);

const updateUserRequest = (user) => axios.put(`http://localhost:63183/api/user/${user}`, user);

export default {
  postUserRequest,
  getUserProfile,
  updateUserRequest
}