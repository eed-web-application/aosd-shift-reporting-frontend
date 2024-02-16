import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ShiftCalendar from './pages/ShiftCalendar/ShiftCalendar';
import ProgramCalendar from './pages/ProgramCalendar/ProgramCalendar';
import BeamDest from './pages/BeamDestination/BeamDest';
import Home from './pages/Home'; 
import Sidebar from './Components/Sidebar'; // Import Sidebar component
import Layout from './layout/Layout';

function AppRouter() {
  return (
    <Router>
     <div className="app">
      <Layout>
       <Sidebar />
        <div className="content">
         <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/ShiftCalendar" component={ShiftCalendar} />
          <Route path="/ProgramCalendar" component={ProgramCalendar} />
          <Route path="/BeamDest" component={BeamDest} />
         </Switch>
        </div>
      </Layout>
     </div>
    </Router>
  );
}

export default AppRouter;