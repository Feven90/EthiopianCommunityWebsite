import axios from 'axios';

// const getE = () => new Promise((resolve, reject) => {
//     axios
//     .get(`http://localhost:50028/api/event/allEvents`)
//       .then((res) => {
//         let event = res.data;
//         resolve(event);
//       })
//       .catch(err => reject(err));
//   });

const postVolunteerServiceRequest = (volunteerServiceType) => axios.post(`http://localhost:50028/api/VolunteerService/register`, volunteerServiceType);

export default { postVolunteerServiceRequest };