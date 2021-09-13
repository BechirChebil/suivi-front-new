import React, { Component } from 'react';
import PlanDayService from '../services/PlanDayService';


class ListPlanDayComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            planDays: []
        }

        this.addPlanDay = this.addPlanDay.bind(this);
        this.editPlanDay = this.editPlanDay.bind(this);
        this.deletePlanDay = this.deletePlanDay.bind(this);

    }

    componentDidMount() {
        PlanDayService.getPlanDays().then((res) => {
            let result = [].concat(res.data)
                .sort((a, b) => (a['day_date'] + a['creneau'] > b['day_date'] + b['creneau'] ? 1 : -1))
            this.setState({ planDays: result })
        })
    }

    addPlanDay() {
        this.props.history.push('/add_plan_days');
    }

    editPlanDay(id) {
        this.props.history.push(`/update_plan_days/${id}`);
    }
    deletePlanDay(id) {
        PlanDayService.deletePlanDay(id).then(res => {
            this.setState({ planDays: this.state.planDays.filter(planDay => planDay.id !== id) });
        })
    }
    viewPlanDay(id) {
        this.props.history.push(`/ViewPlanDay/${id}`);

    }





    render() {
        var dots = "...";
        const limit = "100"
        return (
            <div>
                <h2 className="text-center">List PlanDay</h2>
                <button className="btn btn-primary" onClick={this.addPlanDay}>Add PlanDay</button>
                <br></br><br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Creneau</th>
                                <th style={{ minWidth: "280px" }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.planDays != null ? this.state.planDays.map(
                                    planDay =>
                                        <tr key={planDay.id} >
                                            <td>{planDay.day_date?.slice(0, 10)} </td>
                                            <td>{planDay.creneau} </td>

                                            <td style={{ minWidth: "280px" }}>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editPlanDay(planDay.id)} className="btn btn-info">Update</button>

                                                <button style={{ marginLeft: "10px" }} onClick={() => {
                                                    if (window.confirm('Are you sure you wish to delete this item?'))
                                                        this.deletePlanDay(planDay.id)
                                                }} className="btn btn-danger">Delete</button>


                                            </td>
                                        </tr>
                                ) : null
                                ////////////////////////////////////

                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default ListPlanDayComponent;