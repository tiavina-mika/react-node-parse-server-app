import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset, submit } from 'redux-form';
import { useParams } from 'react-router';
import { Box } from '@material-ui/core';

import CustomCard from '../../components/CustomCard';
import IconButton from '../../components/IconButton';
import ProjectForm from './ProjectForm';

import { createProject, getProjectValues, goToProjectAdd, goToProjects, loadProject, updateProject, clearProject } from '../../actions/projects';
import { getProject } from '../../reducers/projects';
import { ProjectFormValues } from '../../types/project';

const ProjectInsert = () => {

  // const [openDialog, setOpenDialog] =  useState<boolean>(false);
  const { slug }: any = useParams();

  // dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (!slug) return;
    dispatch(loadProject(slug, true));
  }, [dispatch]);

  const project = useSelector(getProject);

  // get initial values for edition
  const getInitialValues = useCallback(() => {
    if (!slug) return;
    const projectValues = getProjectValues(project);
    return {
      ...projectValues,
    };

  }, [project]);

  // save form values
  const _save = async (values: ProjectFormValues) => {
    if (slug) {
      await dispatch(updateProject(project, values));
      return;
    }
    await dispatch(createProject(values));
  };

  // submit form
  const _submit = () => {
    dispatch(submit('projectForm'));
  };

  // clear / reset form values
  const _reset =  ()=>{
    dispatch(reset('projectForm'));
  };

  // go to list page
  const _goToProjects =  () => dispatch(goToProjects());
  const _goToAddPage =  () => {
    dispatch(clearProject());
    dispatch(goToProjectAdd());
  };

  // action button in right side of the card header
  const otherHeaderActionButtons = (
    <Box>
      <IconButton onClick={_goToProjects} type="list" />
      {slug && <IconButton onClick={_goToAddPage} type="add" />}
    </Box>
  );

  return (
    <>
      <CustomCard
        fullScreen
        title={slug ? 'Modifier ' + project?.get('name') : 'Nouveau project'}
        content={<ProjectForm onSubmit={_save} initialValues={getInitialValues()} />}
        okLabel="Enregistrer"
        okAction={_submit}
        withActionButtons
        cancelAction={_reset}
        actionButtonPosition='left'
        otherHeaderActionButtons={otherHeaderActionButtons}
      />
      {/* // <ModalDialog
      //   title="Ajouter nouveau Projet"
      //   content={<ProjectForm onSubmit={_createProject} />}
      //   isVisible={openDialog}
      //   onConfirm={_submit}
      //   onClose={_closeDialog} 
      // /> */}
    </>
  );
};

export default ProjectInsert;