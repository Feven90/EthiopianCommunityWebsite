import axios from 'axios';

const postEventVolunteerServiceRequest = (eventInfo) => axios.post(`http://localhost:50158/api/event/register`, eventInfo);

export default { postEventVolunteerServiceRequest };
