import axios from 'axios';


//const PRODUCT_API_BASE_URL = "http://localhost:9090/tutor/";


class TutorService {

    getTutors() {
        return axios.get(`/tutors/`)
    }
    addTutor(tutor) {
        return axios.post('/tutor/', tutor);
    }
    getTutorById(tutorId) {
        return axios.get('/tutor/' + tutorId);
    }
    updateTutor(tutor, tutorId) {
        return axios.put('/tutor/' + tutorId, tutor);
    }
    exportTutor(tutorId) {
        return axios.post('/tutor-copy/' + tutorId);
    }
    deleteTutor(tutorId) {
        return axios.delete('/tutor/' + tutorId);
    }
}
export default new TutorService()