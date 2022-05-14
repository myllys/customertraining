import './App.css';
import React from 'react';
import Activity from './components/Activity';
import AppBar from '@material-ui/core/AppBar';
import Customerlist from './components/Customerlist';
import Calendar from './components/Calendar';
import Traininglist from './components/Traininglist';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



function App() {

  const [selectedTab, setSelectedTab] = React.useState(0);

  const changeTabs = (event, newValue) => {
    setSelectedTab(newValue)
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h3">
              Personal trainer scheduler
            </Typography>
            <Tabs value={selectedTab}
          onChange={changeTabs}
          aria-label="simple tabs example">
            <Tab label="Scheduled training sessions" />
            <Tab label="Customers" />
            <Tab label="Calendar" />
            <Tab label="Activity" />
          </Tabs>
        </Toolbar>
      </AppBar>
      {selectedTab === 0 && <Traininglist /> }
      {selectedTab === 1 && <Customerlist />}
      {selectedTab === 2 && <Calendar />}
      {selectedTab === 3 && <Activity />}
    </div>
  );
}

export default App;
