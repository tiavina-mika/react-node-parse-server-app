import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';

import CustomCard from '../../components/CustomCard';
import AddIconButton from '../../components/buttons/AddIconButton';
import ModalDialog from '../../components/ModalDialog';

import ProjectsTable from './ProjectsTable';
import ProjectForm from './ProjectForm';

import { createProject, goToProjectAdd, loadProjects } from '../../actions/projects';

import { getProjects } from '../../reducers/projects';
import { useLoadData } from '../../hooks/useLoadData';
import DialogTitleIcon from '../../components/DialogTitleIcon';

const Projects = () => {

  // states
  const [openDialog, setOpenDialog] =  useState<boolean>(false);

  // dispatch
  const dispatch = useDispatch();

  // selectors
  const projects = useLoadData(loadProjects, getProjects);

  // dialog actions
  const _openDialog = () => setOpenDialog(true);
  const _closeDialog = () => setOpenDialog(false);

  // go to project form add page
  const _goToProjectAdd = () => {
    dispatch(goToProjectAdd());
  };

  // save form values
  const _createProject = async (values: any) => {
    await dispatch(createProject(values));
  };

  // submit form
  const _submit =  () => {
    dispatch(submit('projectForm'));
    setOpenDialog(false);
  };

  return (
    <>
      <CustomCard
        title='Liste des projets'
        content={<ProjectsTable rows={projects} />}
        withActionButtons={false}
        onHeaderPrimaryClick={_openDialog}
        headerPrimaryLabel="Nouveau Projet"
        fullScreen
      />
      <ModalDialog
        title="Ajouter nouveau Projet"
        content={<ProjectForm onSubmit={_createProject} />}
        iconTitle={<DialogTitleIcon onClick={_goToProjectAdd} />}
        isVisible={openDialog}
        onConfirm={_submit}
        onClose={_closeDialog} 
      />
    </>
  );
};

export default Projects;