import axios from 'axios';


//const PHASE_API_BASE_URL = "http://localhost:8010/suivis";

class SuiviService {

    getSuivis() {
        return axios.get(`/suivis/`)
    }
    addSuivi(suivi) {
        return axios.post('/suivi/', suivi);
    }
    getSuiviById(suiviId) {
        return axios.get('/suivi/' + suiviId);
    }
    updateSuivi(suivi, suiviId) {
        return axios.put('/suivi/' + suiviId, suivi);
    }
    deleteSuivi(suiviId) {
        return axios.delete('/suivi/' + suiviId);
    }
}
export default new SuiviService()