import axios from 'axios';

const getAllUsersWithEventAndServices= () => new Promise((resolve, reject) => {
    axios
    .get(`http://localhost:50158/api/event/AllUsersWithEventAndServices`)
      .then((res) => {
        let userServiceForEvent = res.data;
        resolve(userServiceForEvent);
      })
      .catch(err => reject(err));
  });

export default { getAllUsersWithEventAndServices };
