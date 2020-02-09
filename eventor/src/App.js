import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";
import store from "./redux/store";

import Taskboard from "./components/Taskboard";
import Home from "./components/Home";
import ContactUs from "./components/ContactUs";
import Timetable from "./components/Timetable";
import Header from "./components/Header";	
import Ticket from "./components/Ticket";

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
            <Route exact path="/tasks" component={Taskboard} />
            <Route path="/tasks/" component={Ticket} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
