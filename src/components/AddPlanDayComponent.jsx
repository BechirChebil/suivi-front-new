import React, { Component } from 'react';
import PlanDayService from '../services/PlanDayService';
import Snackbar from '@material-ui/core/Snackbar';

class AddPlanDayComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id, //step 2
            idplanDay: '',
            day_date: '',
            creneau: '',
            exist: false,
            openSnackBar: false,

        }

        this.changeDayDateHandler = this.changeDayDateHandler.bind(this);
        this.changeCreneauHandler = this.changeCreneauHandler.bind(this);
    }
    //step 3
    componentDidMount() {
        PlanDayService.getPlanDayById(this.props.match.params.id).then((res) => {
            this.setState({ idplanDay: res.data.id });
            this.setState({ creneau: res.data.creneau });
            this.setState({ day_date: res.data.day_date.slice(0, 10) });
            this.setState({ exist: true })
        })
    }

    changeDayDateHandler = (event) => {
        this.setState({ day_date: event.target.value });
    }
    changeCreneauHandler = (event) => {
        this.setState({ creneau: event.target.value });
    }
    retour() {
        this.props.history.push("/plan_days/");
    }
    saveOrUpdateplanDay = (p) => {
        p.preventDefault();
        let planDay = {
            day_date: this.state.day_date,
            creneau: this.state.creneau ? this.state.creneau : "matin",
        };

        if (!this.state.exist)
            PlanDayService.addPlanDay(planDay).then(res => {
                this.setState({ openSnackBar: true });
                setInterval(() => {
                    this.setState({ openSnackBar: false });
                }, 3000);
                this.retour()
            });

        else
            PlanDayService.updatePlanDay(planDay, this.state.idplanDay).then(res => {
                this.setState({ openSnackBar: true });
                setInterval(() => {
                    this.setState({ openSnackBar: false });
                }, 3000);
                this.retour()
            });

    }
    handleCloseSnackBar = () => {
        this.setState({ openSnackBar: false });

    };
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                <h3 className="text-center">{this.state.exist ? "Update " : "Add "} Day </h3>
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Date:</label><br /><br />
                                        <input type="date" required placeholder="day_date" name="day_date" className="form-control"
                                            defaultValue={this.state.day_date} onChange={this.changeDayDateHandler} />
                                    </div><br />
                                    <div className="form-group">
                                        <label>Creneau:</label><br /><br />
                                        <select id="creneau" defaultValue='matin' onChange={this.changeCreneauHandler} value={this.state.creneau} name="creneau">
                                            <option value="matin">Matin</option>
                                            <option value="soir">Soir</option>
                                        </select>
                                    </div><br />

                                    <button className="btn btn-success" onClick={this.saveOrUpdateplanDay.bind(this)}>Save</button>
                                    <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={this.retour.bind(this)}>Retour</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
                <Snackbar
                    severity="success"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={this.state.openSnackBar}
                    onClose={this.handleClose}
                    message={this.state.exist ? ' Successfull Update' : ' Successfull Add'}
                    key={'bottom' + 'left'}
                />
            </div>
        );
    }
}

export default AddPlanDayComponent;