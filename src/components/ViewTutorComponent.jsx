import React, { Component } from 'react';
import TutorService from '../services/TutorService';
import EquipeService from '../services/EquipeService';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

class ViewTutorComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            tutor: {},
            direction: 'asc',
            sortby: ""
        }

        this.editTutor = this.editTutor.bind(this);

        this.addEquipe = this.addEquipe.bind(this);
        this.editEquipe = this.editEquipe.bind(this);
        this.deleteEquipe = this.deleteEquipe.bind(this);
        this.sortByHandler = this.sortByHandler.bind(this);
        this.viewCahier = this.viewCahier.bind(this);

    }


    async componentDidMount() {
        await TutorService.getTutorById(this.state.id).then(res => {
            this.setState({ tutor: res.data });

            //console.log("1", this.state.tutor.nom);
            this.state.tutor.equipes.map(e => console.log(e.nom));
        })
        EquipeService.getEquipes().then((res) => {
            this.setState({ equipes: res.data })
        })
        this.sortByHandler('date')
    }

    addEquipe(id) {
        this.props.history.push(`/Add2Equipe/${id}`);
    }


    editEquipe(id) {
        this.props.history.push(`/UpdateEquipe/${id}`);
    }

    deleteEquipe(id) {
        EquipeService.deleteEquipe(id).then(res => {
            this.setState({ equipes: this.state.equipes.filter(equipe => equipe.id !== id) });
        })
        window.location.reload(false);
    }

    viewEquipe(id) {
        this.props.history.push(`/ViewEquipe/${id}`);

    }

    editTutor(id) {
        this.props.history.push(`/AddTutor/${id}`);
    }

    retour() {
        this.props.history.push('/tutors');
    }

    viewCahier() {
        this.props.history.push({
            pathname: `/tutorCahier/${this.props.match.params.id}`,
        })
    }
    sortByHandler = (key) => {
        this.setState({
            tutor: {
                equipes: [].concat(this.state.tutor.equipes)
                    .sort((a, b) => this.state.direction === 'asc'
                        ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1),
                id: this.state.tutor.id,
                startTime: this.state.tutor.startTime,
                nom: this.state.tutor.nom,

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
        const { tutor } = this.state;
        // tutor.equipes.map(e=>e.id);
        // console.log("2", this.state.tutor);

        //let equipe_obj = { id: this.state.tutor.equipe }
        return (
            <div>
                {/*   {this.state.tutor.equipes.map((e)=><text>{e.nom}</text>)} */}
                <br></br>

                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h3 className="text-center">View tutor details</h3>

                    <div className="card-body">

                        <div className="row">
                            <label>Nom: </label>
                            <input className="form-control" disabled
                                value={this.state.tutor.nom} />
                        </div><br />
                        <div className="row">
                            <label>Prenom:</label>
                            <input className="form-control" disabled
                                value={this.state.tutor.prenom} />
                        </div><br />
                        <div className="row">
                            <label>Mail:</label>
                            <input className="form-control" disabled
                                value={this.state.tutor.mail} />
                        </div><br />

                        <div className="row">
                            <label>Departement: </label>
                            <input className="form-control" disabled
                                value={this.state.tutor.departement} />
                        </div>
                        <br></br>
                        <div className="row">
                            <label>Up: </label>
                            <input className="form-control" disabled
                                value={this.state.tutor.up} />
                        </div>
                        {/* <button className="btn btn-primary" onClick={this.viewCahier.bind(this)} style={{ width: "100%" }} >Notebook</button> */}

                    </div>
                </div>
                <center style={{ margin: "30px" }}>
                    <button className="btn btn-success" onClick={this.retour.bind(this)} style={{ marginRight: "100px" }} >Retour</button>
                    <button style={{ marginLeft: "100px" }} onClick={() => this.editTutor(this.state.tutor.id)} className="btn btn-info">Update</button>
                </center>
                <h2 className="text-center">List equipe</h2>
                <button className="btn btn-primary" onClick={() => this.addEquipe(tutor.id)}>Add Equipe</button>
                <br></br><br></br>
                {/* <div className="row"> */}
                <table className="table table-striped table-bordered">
                    <thead>

                        <tr>
                            <th onClick={() => this.sortByHandler('nom')}>
                                equipe num {this.state.sortby === 'nom' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>
                            <th onClick={() => this.sortByHandler('nom')}>
                                nom {this.state.sortby === 'nom' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>
                            <th onClick={() => this.sortByHandler('prenom')}>
                                prenom
                                {this.state.sortby === 'prenom' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>
                            <th onClick={() => this.sortByHandler('mail')}>
                                mail
                                {this.state.sortby === 'mail' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>
                            <th onClick={() => this.sortByHandler('classe')}>
                                classe
                                {this.state.sortby === 'classe' ?
                                    (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                    ''
                                }
                            </th>



                        </tr>
                    </thead>
                    <tbody>
                        {

                            this.state.tutor.nom != null ? this.state.tutor.equipes.map(
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
                        }
                    </tbody>
                </table>
                {/* </div> */}


            </div>
        );
    }
}

export default ViewTutorComponent;