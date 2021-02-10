import { useEffect } from 'react';
import Parse from 'parse';
import logo from './logo.svg';

import './App.css';

const App = () => {

  // useEffect(() => {
  //   const addProject = async () => {
  //     const Project = Parse.Object.extend('Project');

  //     const project = new Project();
  //     project.set('name', 'project 1');
  //     await project.save();
  //   };
  //   addProject();
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit 
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
