import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

// Components
import Login from './components/login';
import Main from './components/main';
import Menu from './components/menu';
import CourseDetail from './components/course-detail';
import Profile from './components/profile';

// App Component, principal Component
export default function App() {
  return(
    //Router for go to another router
    <Router>
      <Menu />
      <Route path="/" exact={true} component={Main} />
      <Route path="/login" component={Login} />
      <Route path="/course/:id" component={CourseDetail} />
      <Route path="/profile" component={Profile} />
    </Router>
  );
}