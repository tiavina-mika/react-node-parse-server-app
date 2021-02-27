import React, { ReactNode } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';

import { Project } from '../../types/project';
import { getImageUrl } from '../../utils/utils';

const useStyles = makeStyles({
  value: {
    fontWeight: 700,
    fontSize: 18,
  },
  imagePreview: {
    width: '100%',
  },
});

type Props = { project: Project };
const ProjectPreviewDetail = ({ project }: Props) => {
  const classes = useStyles();

  const infos = (label: string, value: string): ReactNode => (
    <Box display="flex" flexDirection="column">
      <Typography>
        {label} 
      </Typography>
      <Typography className={classes.value}>
        {value}
      </Typography>
    </Box>
  );

  return (
    <Box>
      {infos('Email', project?.get('name'))}

      {/* ------------------------------------------------------------- */}
      {/* ----------------------- Image Preview ----------------------- */}
      {/* ------------------------------------------------------------- */}
      <Box display="flex" flexDirection="column" mt={3}>
        <Box mb={1}>
          <Typography>
            Image Preview 
          </Typography>
        </Box>
        <Box width={200}>
          <img 
            alt={project?.get('name')} 
            src={getImageUrl('project', project?.get('previewImageId'))}
            className={classes.imagePreview}
          />          
        </Box>

      {/* ------------------------------------------------------------- */}
      {/* ------------------------ Other Images ----------------------- */}
      {/* ------------------------------------------------------------- */}
        <Box display="flex" flexDirection="column" mt={3}>
          <Box mb={1}>
            <Typography>
              Autres images 
            </Typography>            
          </Box>

          <Box display="flex" m={-2}>
            {/* --------------------- image list ------------------------- */}
            {
              project?.get('imagesIds').length > 0
                ? project.get('imagesIds').map((imageId:string, index: number) => (    
                  <Box width={200} key={index} m={2}>
                    <img 
                      alt={project?.get('name')} 
                      src={getImageUrl('project', imageId)}
                      className={classes.imagePreview}
                    />          
                  </Box>
                ))
                // /* --------------------- no other images ------------------------- */
                : (
                  <Box>
                    <Typography>Pas d&apos;autres images</Typography>
                  </Box>
                )
            }            
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectPreviewDetail;