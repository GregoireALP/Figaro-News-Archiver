import React from 'react';
import ArchiverCalendar from './components/calendar/ArchiverCalendar';
import NavigationBar from './components/navbar/NavigationBar';

function App() {
  return (
    <div className="app">
        <NavigationBar/>
        <ArchiverCalendar />
    </div>
  );
}

export default App;
