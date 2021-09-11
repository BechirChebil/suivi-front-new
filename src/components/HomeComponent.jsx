import { BottomNavigation } from 'material-ui';
import React, { Component } from 'react';
import { ButtonToolbar } from 'react-bootstrap';
import img from '../images/logo.jpg'
class HomeComponent extends Component {

    cancel() {
        this.props.history.push('/etudiants');
    }
    cancel1() {
        this.props.history.push('/equipes');
    }
    cancel2() {
        this.props.history.push('/tutors');
    }
    historique() {
        this.props.history.push('/tutors');
    }
    render() {
        return (
            <div style={{ margin: "10px" }}>
                <center>
                    <button className="btn btn-danger" onClick={this.cancel2.bind(this)} style={{ margin: "10px", width: "200px" }}>Liste de tuteur</button>
                    <button className="btn btn-danger" onClick={this.cancel1.bind(this)} style={{ margin: "10px", width: "200px" }}>Equipe</button>
                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ margin: "10px", width: "200px" }}>Etudiant</button>
                    <button className="btn btn-danger" onClick={this.historique.bind(this)} style={{ margin: "10px", width: "200px" }}>HISTORIQUE</button>
                    <img src={img} width="600" marginBottom="100" alt="logo" />
                </center>
            </div>
        );
    }
}

export default HomeComponent;