import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Routes ,Route } from 'react-router-dom';
  import Customerlist from './Customerlist';
  import Traininglist from './Traininglist';
  import Navigation from './Navigation';


  const Pages = () => {
return (
        <HashRouter>
            <div>
                <Navigation/>
                <ul className="header">
                 <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/Customerlist">Customerslist</NavLink></li>
                 <li><NavLink to="/Traininglist">Traininglist</NavLink></li>
                 </ul>
                <div className="content">
                <Routes>
                <Route path="/" element={<Home />} />
                    <Route path="/Customerlist" element={<Customerlist />} />
                    <Route path="/Traininglist" element={<Traininglist />} />
                </Routes>
            </div>
            </div>
        </HashRouter>
        
    );
};