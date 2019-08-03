import axios from 'axios';

const getEvents = () => new Promise((resolve, reject) => {
    axios
    .get(`http://localhost:50158/api/event/allEvents`)
      .then((res) => {
        let event = res.data;
        resolve(event);
      })
      .catch(err => reject(err));
  });

const postEventRequest = (eventInfo) => axios.post(`http://localhost:50158/api/event/register`, eventInfo);

export default { postEventRequest, getEvents };