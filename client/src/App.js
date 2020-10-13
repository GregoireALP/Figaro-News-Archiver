import React from 'react';
import ArchiverCalendar from './components/calendar/ArchiverCalendar';
import firebase from 'firebase/app'
import config from './config/firebaseConfig'
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import AboutPage from './components/about/AboutPage';
import NavigationBar from './components/navbar/NavigationBar';

function App() {

  firebase.initializeApp(config.firebaseConfig)

  return (
    <BrowserRouter>

      <NavigationBar />
      <Route path="/" exact component={ArchiverCalendar} />
      <Route path="/about" exact component={AboutPage} />

    </BrowserRouter>
  );
}

export default App;
