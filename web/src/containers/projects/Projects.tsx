import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submit } from 'redux-form';

import CustomCard from '../../components/CustomCard';
import AddIconButton from '../../components/buttons/AddIconButton';
import ModalDialog from '../../components/ModalDialog';

import ProjectsTable from './ProjectsTable';
import ProjectForm from './ProjectForm';

import { createProject } from '../../actions/projects';

import { getProjects } from '../../reducers/projects';

const Projects = () => {

  const [openDialog, setOpenDialog] =  useState<boolean>(false);

  // dispatch
  const dispatch = useDispatch();

  // selectors
  const projects = useSelector(getProjects) || [];

  // dialog actions
  const _openDialog = () => setOpenDialog(true);
  const _closeDialog = () => setOpenDialog(false);

  const _createProject = async (values: any) => {
    // create new project
    await dispatch(createProject(values));
  };

  const _submit =  ()=>{
    dispatch(submit('projectForm'));
    setOpenDialog(false);
  };

  return (
    <>
      <CustomCard
        title='Liste des projets'
        content={<ProjectsTable rows={projects} />}
        withActionButtons={false}
        actionHeaderButtons={<AddIconButton onAdd={_openDialog} />}
        fullScreen
      />
      <ModalDialog
        title="Ajouter nouveau Projet"
        content={<ProjectForm onSubmit={_createProject} />}
        isVisible={openDialog}
        onConfirm={_submit}
        onClose={_closeDialog} 
      />
    </>
  );
};

export default Projects;