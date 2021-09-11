import React, { Component } from 'react';
import EtudiantService from '../services/EtudiantService';


class ListEtudiantComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            etudiants: []
        }
        this.addEtudiant = this.addEtudiant.bind(this);
        this.editEtudiant = this.editEtudiant.bind(this);
        this.deleteEtudiant = this.deleteEtudiant.bind(this);
        this.viewEtudiant = this.viewEtudiant.bind(this);

    }

    componentDidMount() {
        EtudiantService.getEtudiants().then((res) => {
            this.setState({ etudiants: res.data })
        })
    }

    addEtudiant() {
        this.props.history.push('/AddEtudiant/-1');
    }

    editEtudiant(id) {
        this.props.history.push(`/AddEtudiant/${id}`);
    }
    deleteEtudiant(id) {
        EtudiantService.deleteEtudiant(id).then(res => {
            this.setState({ etudiants: this.state.etudiants.filter(etudiant => etudiant.id !== id) });
        })
    }
    viewEtudiant(id) {
        this.props.history.push(`/ViewEtudiant/${id}`);

    }





    render() {
        var dots = "...";
        const limit = "100"
        return (
            <div>
                <h2 className="text-center">List Etudiant</h2>
                <button className="btn btn-primary" onClick={this.addEtudiant}>Add Etudiant</button>
                <br></br><br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>mail</th>
                                <th style={{ minWidth: "150px" }}>classe</th>
                                <th style={{ minWidth: "280px" }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.etudiants.map(
                                    etudiant =>
                                        <tr key={etudiant.id}>
                                            <td>{etudiant.nom} </td>
                                            <td>{etudiant.prenom.length > limit ?
                                                etudiant.prenom.substring(0, limit) + dots : etudiant.prenom
                                            } </td>
                                            <td style={{ maxWidth: "200px" }}>{etudiant.mail} </td>
                                            <td>{etudiant.classe} </td>
                                           
                                            {/* <td>{etudiant.seance.id} </td> */}
                                            <td>
                                                <button onClick={() => this.editEtudiant(etudiant.id)} className="btn btn-info">Update</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEtudiant(etudiant.id)} className="btn btn-danger">Delete</button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewEtudiant(etudiant.id)} className="btn btn-info">View</button>
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

export default ListEtudiantComponent;