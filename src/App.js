import './App.css';
import React from 'react';

import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import AddPhaseComponent from './components/AddPhaseComponent';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListPhaseComponent from './components/ListPhaseComponent';
import ListSeanceComponent from './components/ListSeanceComponent';
import AddSeanceComponent from './components/AddSeanceComponent';
import HomeComponent from './components/HomeComponent';
import ListPlanningComponent from './components/ListPlanningComponent';
import AddPlanningComponent from './components/AddPlanningComponent';
import ViewPhaseComponent from './components/ViewPhaseComponent';
import ViewSeanceComponent from './components/ViewSeanceComponent';
import ViewPlanningComponent from './components/ViewPlanningComponent';
import UpdateSeance from './components/UpdateSeance';
import AddSeance from './components/AddSeance';
import AddPhase from './components/AddPhase';
import UpdatePhase from './components/UpdatePhase';

import PlanningCahierComponent from './components/PlanningCahierComponent'



function App() {
  return (

    <div>
      <Router >
        <HeaderComponent />
        <div className="container"  >
          <Switch>
            <Route path="/" exact component={HomeComponent} ></Route>

            <Route path="/phases" component={ListPhaseComponent} ></Route>
            <Route path="/AddPhase/:id" component={AddPhaseComponent} ></Route>
            <Route path="/Add2Phase/:id" component={AddPhase} ></Route>
            <Route path="/UpdatePhase/:id" component={UpdatePhase} ></Route>

            <Route path="/seances" component={ListSeanceComponent} ></Route>
            <Route path="/AddSeance/:id" component={AddSeanceComponent} ></Route>
            <Route path="/Add2Seance/:id" component={AddSeance} ></Route>
            <Route path="/UpdateSeance/:id" component={UpdateSeance} ></Route>

            <Route path="/plannings" component={ListPlanningComponent} ></Route>
            {/* <Route path="/planningCahier/:id" component={PlanningCahierComponent} ></Route> */}
            <Route path="/AddPlanning/:id" component={AddPlanningComponent} ></Route>


            <Route path="/ViewPhase/:id" component={ViewPhaseComponent} ></Route>
            <Route path="/ViewSeance/:id" component={ViewSeanceComponent} ></Route>
            <Route path="/ViewPlanning/:id" component={ViewPlanningComponent} ></Route>

          </Switch>
        </div>

      </Router>
      <FooterComponent />

    </div>
  );
}


export default App;