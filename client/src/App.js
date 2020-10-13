import React from 'react';
import ArchiverCalendar from './components/calendar/ArchiverCalendar';
import NavigationBar from './components/navbar/NavigationBar';
import firebase from 'firebase/app'
import config from './config/firebaseConfig'

function App() {

  firebase.initializeApp(config.firebaseConfig)

  return (
    <div className="app">
        <NavigationBar/>
        <ArchiverCalendar />
    </div>
  );
}

export default App;
