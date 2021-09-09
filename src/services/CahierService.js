import axios from 'axios';


//const PRODUCT_API_BASE_URL = "http://localhost:9090/cahierEtudiant/";


class CahierService {

    getCahiers() {
        return axios.get(`/cahierEtudiants/`)
    }
    addCahier(cahier) {
        return axios.post('/cahierEtudiant/', cahier);
    }
    getCahierById(cahierId) {
        return axios.get('/cahierEtudiant/' + cahierId);
    }
    updateCahier(cahier, cahierId) {
        return axios.put('/cahierEtudiant/' + cahierId, cahier);
    }
    deleteCahier(cahierId) {
        return axios.delete('/cahierEtudiant/' + cahierId);
    }
    getCahierByPlanning(planning) {
        return axios.post('/cahierEtudiantByPlanning', planning);
    }
}
export default new CahierService()