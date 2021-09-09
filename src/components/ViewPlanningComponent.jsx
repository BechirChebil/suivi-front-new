import React, { Component } from 'react';
import PlanningService from '../services/PlanningService';
import SeanceService from '../services/SeanceService';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import CahierService from '../services/CahierService';

class ViewPlanningComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            planning: {},
            direction: 'asc',
            sortby: ""
        }

        this.editPlanning = this.editPlanning.bind(this);

        this.addSeance = this.addSeance.bind(this);
        this.editSeance = this.editSeance.bind(this);
        this.deleteSeance = this.deleteSeance.bind(this);
        this.sortByHandler = this.sortByHandler.bind(this);
        this.viewCahier = this.viewCahier.bind(this);

    }


    async componentDidMount() {
        await PlanningService.getPlanningById(this.state.id).then(res => {
            this.setState({ planning: res.data });

            //console.log("1", this.state.planning.titre);
            this.state.planning.seances.map(e => console.log(e.titre));
        })
        SeanceService.getSeances().then((res) => {
            this.setState({ seances: res.data })
        })
        this.sortByHandler('date')
    }

    addSeance(id) {
        this.props.history.push(`/Add2Seance/${id}`);
    }


    editSeance(id) {
        this.props.history.push(`/UpdateSeance/${id}`);
    }

    deleteSeance(id) {
        SeanceService.deleteSeance(id).then(res => {
            this.setState({ seances: this.state.seances.filter(seance => seance.id !== id) });
        })
        window.location.reload(false);
    }

    viewSeance(id) {
        this.props.history.push(`/ViewSeance/${id}`);

    }

    editPlanning(id) {
        this.props.history.push(`/AddPlanning/${id}`);
    }

    retour() {
        this.props.history.push('/plannings');
    }

    viewCahier() {
        this.props.history.push({
            pathname: `/planningCahier/${this.props.match.params.id}`,
        })
    }
    sortByHandler = (key) => {
        this.setState({
            planning: {
                seances: [].concat(this.state.planning.seances)
                    .sort((a, b) => this.state.direction === 'asc'
                        ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1),
                id: this.state.planning.id,
                startTime: this.state.planning.startTime,
                titre: this.state.planning.titre,

            },

            direction:
                this.state.direction === 'asc'
                    ? 'desc'
                    : 'asc',

            sortby: key
        },
        )
    }
    render() {
        var dots = "...";
        const limit = "100"
        const { planning } = this.state;
        // planning.seances.map(e=>e.id);
        // console.log("2", this.state.planning);

        //let seance_obj = { id: this.state.planning.seance }
        return (
            <div>
                {/*   {this.state.planning.seances.map((e)=><text>{e.titre}</text>)} */}
                <br></br>

                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">View planning details</h3>

                    <div className="card-body">

                        <div className="row">
                            <label>Titre: </label>
                            <input className="form-control" disabled
                                value={this.state.planning.titre} />
                        </div><br />
                        <div className="row">
                            <label>sujet:</label>
                            <textarea className="form-control" disabled
                                value={this.state.planning.sujet} />
                        </div><br />
                        <div className="row">
                            <label>introduction:</label>
                            <textarea className="form-control" disabled
                                value={this.state.planning.introduction} />
                        </div><br />

                        <div className="row">
                            <label>Start Time: </label>
                            <input className="form-control" disabled
                                value={this.state.planning.startTime} />
                        </div>
                        <br></br>
                        {/* <button className="btn btn-primary" onClick={this.viewCahier.bind(this)} style={{ width: "100%" }} >Notebook</button> */}

                    </div>
                </div>
                <center style={{ margin: "30px" }}>
                    <button className="btn btn-success" onClick={this.retour.bind(this)} style={{ marginRight: "100px" }} >Retour</button>
                    <button style={{ marginLeft: "100px" }} onClick={() => this.editPlanning(this.state.planning.id)} className="btn btn-info">Update</button>
                </center>
                <h2 className="text-center">List Seance</h2>
                <button className="btn btn-primary" onClick={() => this.addSeance(planning.id)}>Add Seance</button>
                <br></br><br></br>
                {/* <div className="row"> */}
                <table className="table table-striped table-bordered">
                    <thead>

                        <tr>
                            <th onClick={() => this.sortByHandler('titre')}>
                                titre {this.state.sortby === 'titre' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>
                            <th onClick={() => this.sortByHandler('objectif')}>
                                objectif
                                {this.state.sortby === 'objectif' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>
                            <th onClick={() => this.sortByHandler('indicationTuteur')}>
                                indicationTuteur
                                {this.state.sortby === 'indicationTuteur' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>
                            <th onClick={() => this.sortByHandler('indicationEtudiant')}>
                                indicationEtudiant
                                {this.state.sortby === 'indicationEtudiant' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>
                            <th onClick={() => this.sortByHandler('date')} style={{ minWidth: "150px" }}>
                                date
                                {this.state.sortby === 'date' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>
                            <th onClick={() => this.sortByHandler('creneau')}>
                                creneau
                                {this.state.sortby === 'creneau' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>

                            <th style={{ minWidth: "280px" }}>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {

                            this.state.planning.titre != null ? this.state.planning.seances.map(
                                seance =>
                                    <tr key={seance.id} >
                                        <td>{seance.titre} </td>
                                        <td>{seance.objectif.length > limit ?
                                            seance.objectif.substring(0, limit) + dots : seance.objectif
                                        } </td>
                                        <td>{seance.indicationTuteur.length > limit ?
                                            seance.indicationTuteur.substring(0, limit) + dots : seance.indicationTuteur
                                        } </td>
                                        <td>{seance.indicationEtudiant.length > limit ?
                                            seance.indicationEtudiant.substring(0, limit) + dots : seance.indicationEtudiant
                                        }  </td>

                                        <td style={{ minWidth: "150px" }}>{seance.date} </td>
                                        <td>{seance.creneau} </td>

                                        <td style={{ minWidth: "280px" }}>
                                            <button style={{ marginLeft: "10px" }} onClick={() => this.viewSeance(seance.id)} className="btn btn-info">View</button>

                                            <button style={{ marginLeft: "10px" }} onClick={() => this.editSeance(seance.id)} className="btn btn-info">Update</button>

                                            <button style={{ marginLeft: "10px" }} onClick={() => {
                                                if (window.confirm('Are you sure you wish to delete this item?'))
                                                    this.deleteSeance(seance.id)
                                            }} className="btn btn-danger">Delete</button>


                                        </td>
                                    </tr>
                            ) : null
                        }
                    </tbody>
                </table>
                {/* </div> */}


            </div>
        );
    }
}

export default ViewPlanningComponent;