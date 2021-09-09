import axios from 'axios';


//const PRODUCT_API_BASE_URL = "http://localhost:9090/planning/";


class PlanningService {

    getPlannings() {
        return axios.get(`/plannings/`)
    }
    addPlanning(planning) {
        return axios.post('/planning/', planning);
    }
    getPlanningById(planningId) {
        return axios.get('/planning/' + planningId);
    }
    updatePlanning(planning, planningId) {
        return axios.put('/planning/' + planningId, planning);
    }
    exportPlanning(planningId) {
        return axios.post('/planning-copy/' + planningId);
    }
    deletePlanning(planningId) {
        return axios.delete('/planning/' + planningId);
    }
}
export default new PlanningService()