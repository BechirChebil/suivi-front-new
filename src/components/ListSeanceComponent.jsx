import React, { Component } from 'react';
import SeanceService from '../services/SeanceService';


class ListSeanceComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            seances: []
        }

        this.addSeance = this.addSeance.bind(this);
        this.editSeance = this.editSeance.bind(this);
        this.deleteSeance = this.deleteSeance.bind(this);

    }

    componentDidMount() {
        SeanceService.getSeances().then((res) => {
            this.setState({ seances: res.data })
        })
    }

    addSeance() {
        this.props.history.push('/AddSeance/-1');
    }

    editSeance(id) {
        this.props.history.push(`/AddSeance/${id}`);
    }
    deleteSeance(id) {
        SeanceService.deleteSeance(id).then(res => {
            this.setState({ seances: this.state.seances.filter(seance => seance.id !== id) });
        })
    }
    viewSeance(id) {
        this.props.history.push(`/ViewSeance/${id}`);

    }





    render() {
        var dots = "...";
        const limit = "100"
        return (
            <div>
                <h2 className="text-center">List Seance</h2>
                <button className="btn btn-primary" onClick={this.addSeance}>Add Seance</button>
                <br></br><br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>titre</th>
                                <th>objectif</th>
                                <th>indicationTuteur</th>
                                <th>indicationEtudiant</th>

                                <th style={{ minWidth: "150px" }}>date</th>
                                <th>creneau</th>
                                {/* <th>planning id</th> */}
                                <th style={{ minWidth: "280px" }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.seances.map(
                                    seance =>
                                        <tr key={seance.id}>
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
                                            

                                            <td>{seance.date} </td>
                                            <td>{seance.creneau} </td>
                                            {/* <td>{seance.planning.id} </td> */}
                                            <td>
                                                <button onClick={() => this.editSeance(seance.id)} className="btn btn-info">Update</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteSeance(seance.id)} className="btn btn-danger">Delete</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewSeance(seance.id)} className="btn btn-info">View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }
}

export default ListSeanceComponent;