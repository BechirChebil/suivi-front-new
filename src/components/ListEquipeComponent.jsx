import React, { Component } from 'react';
import EquipeService from '../services/EquipeService';


class ListEquipeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            equipes: []
        }

        this.addEquipe = this.addEquipe.bind(this);
        this.editEquipe = this.editEquipe.bind(this);
        this.deleteEquipe = this.deleteEquipe.bind(this);

    }

    componentDidMount() {
        EquipeService.getEquipes().then((res) => {
            this.setState({ equipes: res.data })
        })
    }

    addEquipe() {
        this.props.history.push('/AddEquipe/-1');
    }

    editEquipe(id) {
        this.props.history.push(`/AddEquipe/${id}`);
    }
    deleteEquipe(id) {
        EquipeService.deleteEquipe(id).then(res => {
            this.setState({ equipes: this.state.equipes.filter(equipe => equipe.id !== id) });
        })
    }
    viewEquipe(id) {
        this.props.history.push(`/ViewEquipe/${id}`);

    }





    render() {
        var dots = "...";
        const limit = "100"
        return (
            <div>
                <h2 className="text-center">List Equipe</h2>
                <button className="btn btn-primary" onClick={this.addEquipe}>Add Equipe</button>
                <br></br><br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>numero</th>
                                <th>nom</th>
                                <th>prenom</th>
                                <th>mail</th>

                                
                                <th>classe</th>
                                {/* <th>tutor id</th> */}
                                <th style={{ minWidth: "280px" }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.equipes != null ? this.state.equipes.map(
                                    equipe =>
                                        <tr key={equipe.id} >
                                            <td>{equipe.numero} </td>
                                            <td>{equipe.etudiants.map(
                                                etudiant =>
                                                    <tr key={etudiant.id}>
                                                        <td>{etudiant.nom} </td></tr>
                                            )} </td>
                                            <td>{equipe.etudiants.map(
                                                etudiant =>
                                                    <tr key={etudiant.id}>
                                                        <td>{etudiant.prenom} </td></tr>
                                            )} </td>
                                            <td>{equipe.etudiants.map(
                                                etudiant =>
                                                    <tr key={etudiant.id}>
                                                        <td>{etudiant.mail} </td></tr>
                                            )} </td>
                                            <td>{equipe.etudiants.map(
                                                etudiant =>
                                                    <tr key={etudiant.id}>
                                                        <td>{etudiant.classe} </td></tr>
                                            )} </td>
    
                                            
    
                                            <td style={{ minWidth: "280px" }}>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewEquipe(equipe.id)} className="btn btn-info">View</button>
    
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.editEquipe(equipe.id)} className="btn btn-info">Update</button>
    
                                                <button style={{ marginLeft: "10px" }} onClick={() => {
                                                    if (window.confirm('Are you sure you wish to delete this item?'))
                                                        this.deleteEquipe(equipe.id)
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

export default ListEquipeComponent;