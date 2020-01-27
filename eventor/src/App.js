import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Taskboard from './components/Taskboard';
import Home from './components/Home';
import ContactUs from './components/ContactUs';
import Timetable from './components/Timetable';
import Header from './components/Header';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
	return (
		<div className="App">
			<Provider store={store}>
				<BrowserRouter>
					<Header />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/contactus" component={ContactUs} />
						<Route path="/timetable" component={Timetable} />
						<Route path="/taskboard" component={Taskboard} />
					</Switch>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
