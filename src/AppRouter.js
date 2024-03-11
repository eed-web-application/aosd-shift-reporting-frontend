import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ShiftCalendar from './pages/ShiftCalendar/ShiftCalendar';
import ProgramCalendar from './pages/ProgramCalendar/ProgramCalendar';
import BeamDest from './pages/BeamDestination/BeamDest';
import AccelSystems from './pages/AccelSystems/AccelSystems';
import ShiftInfo from './pages/ShiftComments/ShiftInfo';
import Home from './pages/Home'; 
import Sidebar from './Components/Sidebar'; // Import Sidebar component
import Layout from './layout/Layout';
import './AppRouter.css';

function AppRouter() {
  return (
    <Router basename="/aosd-shift-reporting-frontend">
     <div className="app">

       <Sidebar />
        <div className="content">
         <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/ShiftCalendar" component={ShiftCalendar} />
          <Route path="/ProgramCalendar" component={ProgramCalendar} />
          <Route path="/BeamDest" component={BeamDest} />
          <Route path="/AccelSystems" component={AccelSystems} />
          <Route path="/ShiftInfo" component={ShiftInfo} />
         </Switch>
        </div>

     </div>
    </Router>
  );
}

export default AppRouter;