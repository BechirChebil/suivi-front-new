import axios from 'axios';


//const PHASE_API_BASE_URL = "http://localhost:8010/equipes";

class EquipeService {

    getEquipes(){
        return axios.get(`/equipes/`)
    }
    addEquipe(equipe){
        return axios.post('/equipe/', equipe);
    }
    getEquipeById(equipeId){
        return axios.get('/equipe/'+ equipeId);
    }
    updateEquipe(equipe, equipeId){
        return axios.put('/equipe/'+ equipeId, equipe);
    }
    deleteEquipe(equipeId){
        return axios.delete('/equipe/'+ equipeId);
    }
}
export default new EquipeService()