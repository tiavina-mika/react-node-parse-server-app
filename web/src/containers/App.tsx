import { ReactNode, useEffect } from 'react';
import Parse from 'parse';

type Props = {
  children: ReactNode;
};

const App = ({ children }: Props) => {

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
      <h1>Everywhere</h1>
      {children}
    </div>
  );
};

export default App;
