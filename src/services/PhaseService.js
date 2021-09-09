import axios from 'axios';


//const PHASE_API_BASE_URL = "http://localhost:8010/phases";

class PhaseService {

    getPhases(){
        return axios.get(`/phases/`)
    }
    addPhase(phase){
        return axios.post('/phase/', phase);
    }
    getPhaseById(phaseId){
        return axios.get('/phase/'+ phaseId);
    }
    updatePhase(phase, phaseId){
        return axios.put('/phase/'+ phaseId, phase);
    }
    deletePhase(phaseId){
        return axios.delete('/phase/'+ phaseId);
    }
}
export default new PhaseService()