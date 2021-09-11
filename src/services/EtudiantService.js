import axios from 'axios';


//const PHASE_API_BASE_URL = "http://localhost:8010/etudiants";

class EtudiantService {

    getEtudiants(){
        return axios.get(`/etudiants/`)
    }
    addEtudiant(etudiant){
        return axios.post('/etudiant/', etudiant);
    }
    getEtudiantById(etudiantId){
        return axios.get('/etudiant/'+ etudiantId);
    }
    updateEtudiant(etudiant, etudiantId){
        return axios.put('/etudiant/'+ etudiantId, etudiant);
    }
    deleteEtudiant(etudiantId){
        return axios.delete('/etudiant/'+ etudiantId);
    }
}
export default new EtudiantService()