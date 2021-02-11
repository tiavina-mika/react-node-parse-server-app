import { Card } from '@material-ui/core';

const Projects = () => {

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
    <Card>
      <h1>Projects</h1>
    </Card>
  );
};

export default Projects;
