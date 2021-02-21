import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Box } from '@material-ui/core';

import CustomCard from '../../components/CustomCard';
import IconButton from '../../components/IconButton';

import { goToProjectAdd, goToProjects, loadProject, clearProject, goToProjectEdit } from '../../actions/projects';
import { getProject } from '../../reducers/projects';
import { useLoadDataBy } from '../../hooks/useLoadData';
import ProjectPreviewDetail from './ProjectPreviewDetail';

const ProjectPreview = () => {
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

  // go to list page
  const _goToProjects =  () => dispatch(goToProjects());

  // go to add page
  const _goToAddPage =  () => {
    dispatch(goToProjectAdd());
  };

  // go to edit page
  const _goToEditPage =  () => {
    dispatch(goToProjectEdit(slug));
  };


  // action button in right side of the card header
  const otherHeaderActionButtons = (
    <Box>
      <IconButton onClick={_goToProjects} type="list" />
      <IconButton onClick={_goToAddPage} type="add" />
      <IconButton onClick={_goToEditPage} type="edit" />
    </Box>
  );

  return (
    <CustomCard
      fullScreen
      title={project?.get('name')}
      content={<ProjectPreviewDetail project={project} />}
      otherHeaderActionButtons={otherHeaderActionButtons}
    />
  );
};

export default ProjectPreview;