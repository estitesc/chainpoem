import * as React from 'react';
import './App.css';
import Main from './Main';
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

export default App;
