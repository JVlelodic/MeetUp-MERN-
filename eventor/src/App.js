import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Main from './components/Main'; 
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import Timetable from './components/Timetable';
import Header from './components/Header';


function App(){
  return (
    <div className="App">
		<BrowserRouter>
			<Header/>
			<Switch>
				<Route exact path = "/" component = {Home}/>
				<Route path = "/contactus" component = {ContactUs}/>
				<Route path = "/timetable" component = {Timetable}/>
				<Route path = "/taskboard" component = {Main}/>
			</Switch>
		</BrowserRouter>
    </div>
  );
}

export default App;
