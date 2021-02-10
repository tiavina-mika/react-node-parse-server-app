import { useEffect } from 'react';
import Parse from 'parse';

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
      <h1>Home</h1>
    </div>
  );
};

export default App;
