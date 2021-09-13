import './App.css';
import React from 'react';

import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
// import AddEtudiantComponent from './components/AddEtudiantComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListEtudiantComponent from './components/ListEtudiantComponent';
import ListEquipeComponent from './components/ListEquipeComponent';
// import AddEquipeComponent from './components/AddEquipeComponent';
import HomeComponent from './components/HomeComponent';
import ListTutorComponent from './components/ListTutorComponent';
// import AddTutorComponent from './components/AddTutorComponent';
// import ViewEtudiantComponent from './components/ViewEtudiantComponent';
// import ViewEquipeComponent from './components/ViewEquipeComponent';
import ViewTutorComponent from './components/ViewTutorComponent';
import ListSuiviComponent from './components/ListSuiviComponent';
import ListPlanDayComponent from './components/ListPlanDayComponent';
import AddPlanDayComponent from './components/AddPlanDayComponent';
// import UpdateEquipe from './components/UpdateEquipe';
// import AddEquipe from './components/AddEquipe';
// import AddEtudiant from './components/AddEtudiant';
// import UpdateEtudiant from './components/UpdateEtudiant';




function App() {
  return (

    <div>
      <Router >
        <HeaderComponent />
        <div className="container"  >
          <Switch>
            <Route path="/" exact component={HomeComponent} ></Route>

            <Route path="/etudiants" component={ListEtudiantComponent} ></Route>
            {/* <Route path="/AddEtudiant/:id" component={AddEtudiantComponent} ></Route> */}
            {/* <Route path="/Add2Etudiant/:id" component={AddEtudiant} ></Route>
            <Route path="/UpdateEtudiant/:id" component={UpdateEtudiant} ></Route> */}

            <Route path="/equipes" component={ListEquipeComponent} ></Route>
            {/* <Route path="/AddEquipe/:id" component={AddEquipeComponent} ></Route>
            <Route path="/Add2Equipe/:id" component={AddEquipe} ></Route>
            <Route path="/UpdateEquipe/:id" component={UpdateEquipe} ></Route> */}

            <Route path="/tutors" component={ListTutorComponent} ></Route>
            {/* <Route path="/tutorCahier/:id" component={TutorCahierComponent} ></Route> */}

            {/* 
            <Route path="/ViewEtudiant/:id" component={ViewEtudiantComponent} ></Route>
            <Route path="/ViewEquipe/:id" component={ViewEquipeComponent} ></Route> */}
            <Route path="/suivis" component={ListSuiviComponent} ></Route>
            <Route path="/plan_days" component={ListPlanDayComponent} ></Route>
            <Route path="/add_plan_days" component={AddPlanDayComponent} ></Route>
            <Route path="/update_plan_days/:id" component={AddPlanDayComponent} ></Route>
            <Route path="/ViewTutor/:id" component={ViewTutorComponent} ></Route>

          </Switch>
        </div>

      </Router>
      <FooterComponent />

    </div>
  );
}


export default App;