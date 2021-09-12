import React, { Component } from 'react';
import TutorService from '../services/TutorService';

import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import jsPDF from "jspdf";
import "jspdf-autotable";

class ListTutorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            nom: '',
            prenom: '',
            mail: '',
            dept: '',
            up: '',
            tutors: [],
            direction: 'asc',
            sortby: "",
            resData: null
        }
        this.addTutor = this.addTutor.bind(this);
        this.editTutor = this.editTutor.bind(this);
        this.deleteTutor = this.deleteTutor.bind(this);
        this.sortByHandler = this.sortByHandler.bind(this)
        this.voirSuivi = this.voirSuivi.bind(this)
    }

    componentDidMount() {
        TutorService.getTutors().then((res) => {

            this.setState({ tutors: res.data })
        })

        this.sortTableHandler('id')

        //console.log(this.state.tutors.id   );

    }


    addTutor() {
        this.props.history.push('/AddTutor/0');
    }

    editTutor(id) {
        this.props.history.push(`/AddTutor/${id}`);
    }

    expoterTutor(id) {
        TutorService.exportTutor(id).then(res => {
            TutorService.getTutors().then((res) => {

                this.setState({ tutors: res.data })
            })
        })
        // this.props.history.push(`/ExportTutor/${id}`);
    }

    deleteTutor(id) {
        TutorService.deleteTutor(id).then(res => {
            this.setState({ tutors: this.state.tutors.filter(tutor => tutor.id !== id) });
        })
    }
    viewTutor(id) {
        this.props.history.push(`/ViewTutor/${id}`);

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
            tutors: [].concat(this.state.tutors)
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
    // htmlToPdfContent = (tutor) => {
    //     return (
    //         <div>
    //             Title
    //             <p>description</p>
    //         </div>
    //     )
    // }
    //////generat fuction
    exportPDF = (id, indice) => {
        TutorService.getTutorById(id).then((res) => {
            this.setState({ resData: res.data })
        }).then(() => {

            var resData = this.state.resData

            const unit = "pt";
            const size = "A4"; // Use A1, A2, A3 or A4
            const orientation = "portrait"; // portrait or landscape

            const marginLeft = 40;
            const doc = new jsPDF(orientation, unit, size);
            var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

            const title = resData.nom + " " + resData.prenom;

            var resDataSorted = this.sortByHandler("date", resData)
            var result = []
            var res
            var column
            for (var i = 0; i < 4; i++) {
                if (i == 0) {
                    res = resDataSorted.equipes.map(equipe => {
                        return equipe.date?.slice(0, 10) + " " + equipe.creneau + "\n" + equipe.nom
                    }
                    )
                    column = [
                        '',
                        ...res
                    ]
                    result = [...result, column]
                } else if (i == 1) {
                    res = resDataSorted.equipes.map(equipe => {
                        return equipe.objectif
                    }
                    )
                    column = [
                        'OBJECTIFS',
                        ...res
                    ]
                    result = [...result, column]
                }
                else if (i == 2) {
                    res = resDataSorted.equipes.map(equipe => {
                        return equipe.etudiants.map(etudiant =>
                            etudiant.prenom?.slice(11, 16) + " => " +
                            etudiant.endTime?.slice(11, 16) + ": " +
                            etudiant.nom +
                            "\n").join("")
                    }
                    )
                    column = [
                        'PHASES',
                        ...res
                    ]
                    result = [...result, column]
                } else if (i == 3) {
                    res = resDataSorted.equipes.map(equipe => {
                        return equipe.etudiants.map(etudiant =>
                            etudiant.rendu + "\n").join("")
                    }
                    )
                    column = [
                        'RENDUS',
                        ...res
                    ]
                    result = [...result, column]
                }
            }

            let content = {
                columnStyles: {
                    0: {
                        halign: 'center',
                        fillColor: [150, 150, 255],
                        textColor: [255, 255, 255],
                        fontStyle: 'bold',
                        fontSize: 12,
                        lineWidth: 1
                    }
                }, // Cells in first column centered and green
                startY: 60,
                body: result
            };
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.setTextColor("#2E8BC0")
            doc.text(title, pageWidth / 2, 30, { align: 'center' });
            doc.autoTable(content);

            doc.addPage();
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.setTextColor("#2E8BC0")
            doc.text("Sujet", pageWidth / 2, 30, { align: 'center' })
            doc.setFont("helvetica", "normal");
            doc.setTextColor("#000000")
            doc.setFont("helvetica", "normal");
            doc.setTextColor("#000000")
            doc.setFontSize(12);
            var splitSujet = doc.splitTextToSize(resData.sujet, pageWidth - 75);
            var y = 70;
            for (var i = 0; i < splitSujet.length; i++) {
                if (y + 10 > pageHeight) {
                    y = 70;
                    doc.addPage();
                }
                doc.text(30, y, splitSujet[i]);
                y = y + 15;
            }
            doc.addPage();
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.setTextColor("#2E8BC0")
            doc.text("Introduction", pageWidth / 2, 30, { align: 'center' })
            doc.setFont("helvetica", "normal");
            doc.setTextColor("#000000")
            doc.setFontSize(12);
            var splitIntro = doc.splitTextToSize(resData.introduction, pageWidth - 75);
            y = 70;
            for (var i = 0; i < splitIntro.length; i++) {
                if (y + 10 > pageHeight) {
                    y = 70;
                    doc.addPage();
                }
                doc.text(30, y, splitIntro[i]);
                y = y + 15;
            }

            if (indice > 0) {


                resData.equipes.map(equipe => {
                    doc.addPage();
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(18);
                    doc.setTextColor("#2E8BC0")
                    y = 70;
                    var title = equipe.date?.slice(0, 10) + " " + equipe.creneau + "\n" + equipe.nom;
                    doc.text(title, pageWidth / 2, 30, { align: 'center' });
                    doc.setTextColor("#000000")
                    doc.setFontSize(14);
                    doc.text("Objectif:", 30, y);
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(12);
                    y = y + 30
                    var splitObjectif = doc.splitTextToSize(equipe.objectif, pageWidth - 30);
                    for (var i = 0; i < splitObjectif.length; i++) {
                        if (y + 10 > pageHeight) {
                            y = 70;
                            doc.addPage();
                        }
                        doc.text(38, y, splitObjectif[i]);
                        y = y + 15;
                    }
                    y = y + 15
                    doc.setFont("helvetica", "bold");
                    doc.setFontSize(14);
                    doc.text("Indication pour l'étudiant:", 30, y);
                    doc.setFont("helvetica", "normal");
                    doc.setFontSize(12);
                    y = y + 30
                    var splitIndEtudiant = doc.splitTextToSize(equipe.indicationEtudiant, pageWidth - 30);
                    for (var i = 0; i < splitIndEtudiant.length; i++) {
                        if (y + 10 > pageHeight) {
                            y = 70;
                            doc.addPage();
                        }
                        doc.text(38, y, splitIndEtudiant[i]);
                        y = y + 15;
                    }
                    if (indice == 2) {
                        y = y + 15
                        doc.setFont("helvetica", "bold");
                        doc.setFontSize(14);
                        doc.text("Indication pour le tuteur:", 30, y);
                        doc.setFont("helvetica", "normal");
                        doc.setFontSize(12);
                        y = y + 30
                        var splitIndTuteur = doc.splitTextToSize(equipe.indicationTuteur, pageWidth - 30);
                        for (var i = 0; i < splitIndTuteur.length; i++) {
                            if (y + 10 > pageHeight) {
                                y = 70;
                                doc.addPage();
                            }
                            doc.text(38, y, splitIndTuteur[i]);
                            y = y + 15;
                        }

                    }
                    equipe.etudiants.map(etudiant => {
                        y = y + 30
                        if (y + 10 > pageHeight) {
                            y = 70;
                            doc.addPage();
                        }
                        doc.setFont("helvetica", "bold");
                        doc.setFontSize(12);
                        doc.setTextColor("#2E8BC0")
                        doc.text(etudiant.nom + ": " + etudiant.prenom?.slice(11, 16) + " => " +
                            etudiant.endTime?.slice(11, 16), 30, y)

                        doc.setFont("helvetica", "normal");
                        doc.setFontSize(12);
                        doc.setTextColor("#000000")
                        var splitDescription = doc.splitTextToSize(etudiant.discription, pageWidth - 70);
                        y = y + 15;
                        for (var i = 0; i < splitDescription.length; i++) {
                            if (y + 10 > pageHeight) {
                                y = 70;
                                doc.addPage();
                            }
                            doc.text(38, y, splitDescription[i]);
                            y = y + 15;
                        }
                    })
                })

            }
            if (indice == 0)
                doc.save("tutor.pdf")
            else if (indice == 1)
                doc.save("etudiant.pdf")
            else
                doc.save("tuteur.pdf")


        })

    }

    voirSuivi() {
        this.props.history.push(`/suivis`);

    }
    render() {
        /////////////////
        //////////////////////////////////
        return (

            <div ><br />
                <h2 className="text-center">list Tutor</h2>
                <button className="btn btn-primary" onClick={this.addTutor}>Add Tutor</button>
                <button style={{ float: 'right' }} className="btn btn-primary" onClick={this.voirSuivi}>Liste de Suivi</button>
                <br></br><br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th onClick={() => this.sortTableHandler('id')}>
                                    id {this.state.sortby === 'id' ?
                                        (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                        ''
                                    }
                                </th>
                                <th onClick={() => this.sortTableHandler('nom')}>
                                    nom {this.state.sortby === 'nom' ?
                                        (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                        ''
                                    }
                                </th>
                                <th onClick={() => this.sortTableHandler('prenom')}>
                                    prenom {this.state.sortby === 'prenom' ?
                                        (this.state.direction === 'asc' ? <FaArrowUp /> : <FaArrowDown />) :
                                        ''
                                    }
                                </th>
                                <th style={{ minWidth: "280px" }}>mail</th>
                                <th style={{ minWidth: "280px" }}>departement</th>
                                <th style={{ minWidth: "280px" }}>up</th>
                                <th style={{ minWidth: "280px" }}>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.tutors.map(
                                    tutor =>
                                        <tr key={tutor.id}>
                                            <td>{tutor.id} </td>
                                            <td>{tutor.nom} </td>
                                            <td>{tutor.prenom} </td>
                                            <td>{tutor.mail} </td>
                                            <td>{tutor.dept} </td>
                                            <td>{tutor.up} </td>
                                            <td>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewTutor(tutor.id)} className="btn btn-info">View</button>
                                                <button style={{ marginLeft: "10px" }} className="btn btn-danger">
                                                    <a target="_blank" style={{ textDecoration: 'none', color: 'white' }} href={"mailto:" + tutor.mail}>
                                                        Contact
                                                    </a>
                                                </button>

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

export default ListTutorComponent;