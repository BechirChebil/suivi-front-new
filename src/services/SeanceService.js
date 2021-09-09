import axios from 'axios';


//const PHASE_API_BASE_URL = "http://localhost:8010/seances";

class SeanceService {

    getSeances(){
        return axios.get(`/seances/`)
    }
    addSeance(seance){
        return axios.post('/seance/', seance);
    }
    getSeanceById(seanceId){
        return axios.get('/seance/'+ seanceId);
    }
    updateSeance(seance, seanceId){
        return axios.put('/seance/'+ seanceId, seance);
    }
    deleteSeance(seanceId){
        return axios.delete('/seance/'+ seanceId);
    }
}
export default new SeanceService()