import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reset, submit } from 'redux-form';
import { useParams } from 'react-router';
import { Box } from '@material-ui/core';

import CustomCard from '../../components/CustomCard';
import IconButton from '../../components/IconButton';
import ProjectForm from './ProjectForm';

import { createProject, getProjectValues, goToProjectAdd, goToProjects, loadProject, updateProject, clearProject, goToProjectPreview } from '../../actions/projects';
import { getProject } from '../../reducers/projects';
import { ProjectFormValues } from '../../types/project';
import { useLoadDataBy } from '../../hooks/useLoadData';

const ProjectInsert = () => {
  // route params
  const { slug }: any = useParams();

  // dispatch
  const dispatch = useDispatch();

  // load data
  const project = useLoadDataBy({
    action: () => loadProject(slug, true),
    state: getProject,
    params: slug,
  });

  // get initial values for edition
  const getInitialValues = useCallback((): ProjectFormValues | undefined => {
    if (!slug) {
      return { tags: [{ title: '' }] };
    }
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

  // go to edit page
  const _goToPreviewProject =  () => {
    dispatch(goToProjectPreview(slug));
  };

  // action button in right side of the card header
  const otherHeaderActionButtons = (
    <Box>
      {slug && <IconButton onClick={_goToPreviewProject} type="preview" />}
      <IconButton onClick={_goToProjects} type="list" />
      {slug && <IconButton onClick={_goToAddPage} type="add" />}
    </Box>
  );

  return (
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
  );
};

export default ProjectInsert;