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

export default function App() {
  return(
    <Router>
      <Menu />
      <Route path="/" exact={true} component={Login} />
      <Route path="/main" component={Main} />
      <Route path="/course/:id" component={CourseDetail} />
      <Route path="/profile" component={Profile} />
    </Router>
  );
}