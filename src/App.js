import './App.css';
import React from 'react';
import Customerlist from './components/Customerlist';
import Calendar from './components/Calendar';
import Traininglist from './components/Traininglist';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


function App() {

  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabs = (event, newValue) => {
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
          onChange={handleTabs}
          aria-label="simple tabs example">
            <Tab label="Scheduled training sessions" />
            <Tab label="Customers" />
            <Tab label="Calendar" />
          </Tabs>
        </Toolbar>
      </AppBar>
      {selectedTab === 0 && <Traininglist /> }
      {selectedTab === 1 && <Customerlist />}
      {selectedTab === 2 && <Calendar />}
    </div>
  );
}

export default App;
