import axios from 'axios';


const postUserVolunteerRequest = (userVolunteerInfo) => axios.post(`http://localhost:50158/api/userVolunteer/register`, userVolunteerInfo);

export default { postUserVolunteerRequest };