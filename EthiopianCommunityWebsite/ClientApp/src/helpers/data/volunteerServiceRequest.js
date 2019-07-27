import axios from 'axios';

const getVolunteerService = () => new Promise((resolve, reject) => {
    axios
    .get(`http://localhost:50028/api/VolunteerService/allServices`)
      .then((res) => {
        let service = res.data;

        resolve(service);
      })
      .catch(err => reject(err));
  });

const postVolunteerServiceRequest = (volunteerServiceType) => axios.post(`http://localhost:50028/api/VolunteerService/register`, volunteerServiceType);

export default { postVolunteerServiceRequest, getVolunteerService };