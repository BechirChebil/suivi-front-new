import axios from 'axios';


//const PHASE_API_BASE_URL = "http://localhost:8010/planDays";

class PlanDayService {

    getPlanDays() {
        return axios.get(`/planDays/`)
    }
    addPlanDay(planDay) {
        return axios.post('/planDay/', planDay);
    }
    getPlanDayById(planDayId) {
        return axios.get('/planDay/' + planDayId);
    }
    updatePlanDay(planDay, planDayId) {
        return axios.put('/planDay/' + planDayId, planDay);
    }
    deletePlanDay(planDayId) {
        return axios.delete('/planDay/' + planDayId);
    }
}
export default new PlanDayService()