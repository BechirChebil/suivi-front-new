import React, { Component } from 'react';
import SuiviService from '../services/SuiviService';

import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import PlanDayService from '../services/PlanDayService';
import TutorService from '../services/TutorService';

class ListSuiviComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nom: '',
            prenom: '',
            mail: '',
            departement: '',
            up: '',
            suivis: [],
            planDays: [],
            tutors: [],
            direction: 'asc',
            sortby: "",
            resData: null
        }
        this.addSuivi = this.addSuivi.bind(this);
        this.editSuivi = this.editSuivi.bind(this);
        this.deleteSuivi = this.deleteSuivi.bind(this);
        this.sortByHandler = this.sortByHandler.bind(this)
        this.changeEtat = this.changeEtat.bind(this)
        this.changeEtatExist = this.changeEtatExist.bind(this)
        this.goBack = this.goBack.bind(this)

    }

    componentDidMount() {
        SuiviService.getSuivis().then((res) => {

            this.setState({ suivis: res.data })
        })
        PlanDayService.getPlanDays().then((res) => {
            let result = [].concat(res.data)
                .sort((a, b) => (a['day_date'] > b['day_date'] || a['creneau'] > b['creneau'] ? 1 : -1))
            this.setState({ planDays: result })
        })
        TutorService.getTutors().then((res) => {

            this.setState({ tutors: res.data })
        })
        this.sortTableHandler('id')

        //console.log(this.state.suivis.id   );

    }


    addSuivi() {
        this.props.history.push('/AddSuivi/0');
    }

    editSuivi(id) {
        this.props.history.push(`/AddSuivi/${id}`);
    }

    expoterSuivi(id) {
        SuiviService.exportSuivi(id).then(res => {
            SuiviService.getSuivis().then((res) => {

                this.setState({ suivis: res.data })
            })
        })
        // this.props.history.push(`/ExportSuivi/${id}`);
    }

    deleteSuivi(id) {
        SuiviService.deleteSuivi(id).then(res => {
            this.setState({ suivis: this.state.suivis.filter(suivi => suivi.id !== id) });
        })
    }
    viewSuivi(id) {
        this.props.history.push(`/ViewSuivi/${id}`);

    }

    sortByHandler(key, data) {
        return {
            equipes: [].concat(data.equipes)
                .sort((a, b) => (a[key] > b[key] ? 1 : -1)),
            id: data.id,
            prenom: data.prenom,
            nom: data.nom,

        }
    }

    sortTableHandler = (key) => {
        this.setState({
            suivis: [].concat(this.state.suivis)
                .sort((a, b) => this.state.direction === 'asc'
                    ? (a[key] > b[key] ? 1 : -1) : a[key] < b[key] ? 1 : -1),
            direction:
                this.state.direction === 'asc'
                    ? 'desc'
                    : 'asc',

            sortby: key
        },
        )
    }

    changeEtat = (value, tutor_id, plan_day_id) => {
        let newSuivi = {
            etat: value,
            tutor_id: tutor_id,
            plan_day_id: plan_day_id
        };
        SuiviService.addSuivi(newSuivi).then(res => {
            this.componentDidMount()
        });
    }

    changeEtatExist = (value, suivi) => {
        let newSuivi = {
            etat: value
        };
        SuiviService.updateSuivi(newSuivi, suivi.id).then(res => {
            this.componentDidMount()
        });
    }
    goBack = () => {
        this.props.history.goBack()
    }
    render() {
        /////////////////
        //////////////////////////////////
        return (

            <div ><br />
                <h2 className="text-center">list Suivi</h2>
                <button className="btn btn-success" onClick={this.goBack}>Retour</button>
                <br></br><br></br>
                <div className="row">
                    <table className="table table-striped table-bordered" maxWidth="100%">
                        <thead>
                            <tr style={{ textAlign: "center", width: "100%" }}>
                                <th>Nom</th>
                                <th>Prenom</th>

                                {
                                    this.state.planDays.length > 0 && (
                                        this.state.planDays.map(item =>
                                            <th key={item.id} style={{ textAlign: "center" }} >
                                                {item.day_date.slice(0, 10)}<br />
                                                {item.creneau}
                                            </th>
                                        )
                                    )
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tutors.map(
                                    tutor =>
                                        <tr key={tutor.id} style={{ textAlign: "center", width: "100%" }}>
                                            <td>{tutor.nom} </td>
                                            <td>{tutor.prenom} </td>
                                            {
                                                this.state.planDays.length > 0 && (
                                                    this.state.planDays.map(item => {
                                                        var morning = this.state.suivis.find(element => {
                                                            if (element.plan_day_id ==
                                                                item.id && element.tutor_id == tutor.id && item.creneau == "matin")
                                                                return element
                                                        });
                                                        var soir = this.state.suivis.find(element => {
                                                            if (element.plan_day_id ==
                                                                item.id && element.tutor_id == tutor.id && item.creneau == "soir")
                                                                return element
                                                        });

                                                        return (<td key={item.id}>

                                                            {morning ? <select id="lang" defaultValue='aucun' onChange={(e) => this.changeEtatExist(e.target.value, morning)} value={morning.etat}>
                                                                <option value="present">Présent(e)</option>
                                                                <option value="absent">Absent(e)</option>
                                                                <option value="aucun">aucun</option>
                                                            </select> : ''}
                                                            {soir ? <select id="lang" defaultValue='aucun' onChange={(e) => this.changeEtatExist(e.target.value, soir)} value={soir.etat}>
                                                                <option value="present">Présent(e)</option>
                                                                <option value="absent">Absent(e)</option>
                                                                <option value="aucun">aucun</option>
                                                            </select> : ''}
                                                            {!soir && !morning ? <select id="lang" defaultValue='aucun' onChange={(e) => this.changeEtat(e.target.value, tutor.id, item.id)}>
                                                                <option value="present">Présent(e)</option>
                                                                <option value="absent">Absent(e)</option>
                                                                <option value="aucun">aucun</option>
                                                            </select> : ''}

                                                        </td>)
                                                    }
                                                    )
                                                )
                                            }
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

export default ListSuiviComponent;