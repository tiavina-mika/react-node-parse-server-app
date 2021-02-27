import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';
import { useToggle } from 'react-use';

import CustomCard from '../../components/CustomCard';
import ModalDialog from '../../components/ModalDialog';
import DialogTitleIcon from '../../components/DialogTitleIcon';

import ProjectsTable from './ProjectsTable';
import ProjectForm from './ProjectForm';

import { getProjects } from '../../reducers/projects';
import { createProject, goToProjectAdd, loadProjects } from '../../actions/projects';
import { useLoadData } from '../../hooks/useLoadData';

const Projects = () => {
  // states
  const [on, toggle] =  useToggle(false);

  // dispatch
  const dispatch = useDispatch();

  // selectors
  const projects = useLoadData(loadProjects, getProjects);

  // set one default field for array field
  const getInitialValues = useCallback(() => ({
    tags: [{ title: '' }],  
  }), []);

  // go to project form add page
  const _goToProjectAdd = () => {
    dispatch(goToProjectAdd());
  };

  // save form values
  const _createProject = async (values: any) => {
    await dispatch(createProject(values));
    // toggle();
  };

  // submit form
  const _submit =  () => {
    dispatch(submit('projectForm'));
  };

  return (
    <>
      <CustomCard
        title='Liste des projets'
        content={<ProjectsTable rows={projects} />}
        withActionButtons={false}
        onHeaderPrimaryClick={toggle}
        headerPrimaryLabel="Nouveau Projet"
        fullScreen
      />
      <ModalDialog
        title="Ajouter nouveau Projet"
        content={<ProjectForm onSubmit={_createProject} initialValues={getInitialValues()} />}
        iconTitle={<DialogTitleIcon onClick={_goToProjectAdd} />}
        isVisible={on}
        onConfirm={_submit}
        onClose={toggle} 
      />
    </>
  );
};

export default Projects;