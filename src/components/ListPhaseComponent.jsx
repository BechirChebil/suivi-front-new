import React, { Component } from 'react';
import PhaseService from '../services/PhaseService';


class ListPhaseComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            phases: []
        }
        this.addPhase = this.addPhase.bind(this);
        this.editPhase = this.editPhase.bind(this);
        this.deletePhase = this.deletePhase.bind(this);
        this.viewPhase = this.viewPhase.bind(this);

    }

    componentDidMount() {
        PhaseService.getPhases().then((res) => {
            this.setState({ phases: res.data })
        })
    }

    addPhase() {
        this.props.history.push('/AddPhase/-1');
    }

    editPhase(id) {
        this.props.history.push(`/AddPhase/${id}`);
    }
    deletePhase(id) {
        PhaseService.deletePhase(id).then(res => {
            this.setState({ phases: this.state.phases.filter(phase => phase.id !== id) });
        })
    }
    viewPhase(id) {
        this.props.history.push(`/ViewPhase/${id}`);

    }





    render() {
        var dots = "...";
        const limit = "100"
        return (
            <div>
                <h2 className="text-center">List Phase</h2>
                <button className="btn btn-primary" onClick={this.addPhase}>Add Phase</button>
                <br></br><br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Discription</th>
                                <th>Rendu</th>
                                <th style={{ minWidth: "150px" }}>Start Time</th>
                                <th style={{ minWidth: "150px" }}>End Time</th>
                                {/* <th>Seance id</th> */}
                                <th style={{ minWidth: "280px" }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.phases.map(
                                    phase =>
                                        <tr key={phase.id}>
                                            <td>{phase.titre} </td>
                                            <td>{phase.discription.length > limit ?
                                                phase.discription.substring(0, limit) + dots : phase.discription
                                            } </td>
                                            <td style={{ maxWidth: "200px" }}>{phase.rendu} </td>
                                            <td>{phase.startTime} </td>
                                            <td>{phase.endTime} </td>
                                            {/* <td>{phase.seance.id} </td> */}
                                            <td>
                                                <button onClick={() => this.editPhase(phase.id)} className="btn btn-info">Update</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deletePhase(phase.id)} className="btn btn-danger">Delete</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewPhase(phase.id)} className="btn btn-info">View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div >
        );
    }
}

export default ListPhaseComponent;