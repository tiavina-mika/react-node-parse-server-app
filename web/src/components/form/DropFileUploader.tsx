import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: theme.spacing(2),
    composes: 'flexCenter center stretch flex1',
    borderRadius: 3,
    background: '#f5f5f5 right 20px center no-repeat',
    cursor: 'pointer',
    padding: 10,
    backgroundColor: '#ffffff',
    border: '1px solid #e4e5e6',
    minHeight: 256,
    position: 'relative',
    transition: 'background-color ease .5s , border-color ease .5s',
    width: '100%',
    '&:hover': {
      backgroundColor: '#e1f5fe',
    	border: '2px dashed #4285f4',
    },
  },
  img: {
    width: 180,
    marginBottom: theme.spacing(2),
  },
  label: {
    color: theme.palette.primary.main,
  },
  thumbnail: {
    width: '100%',
  },
}));

type Props = {
	mimeType: string,
	maxFiles?: number,
	input?: any,
};

const DropFileUploader = ({ 
  input: { name, onChange }, 
  mimeType = 'image/*', 
  maxFiles = 1, 
}: Props) => {

  // styles
  const classes = useStyles();

  // state
  const [currentFile, setCurrentFile] = useState<any>(null);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        // const binaryStr = reader.result;
        // console.log(binaryStr);
        setCurrentFile(file);
        onChange(file);
      };
      reader.readAsArrayBuffer(file);
    });
  }, [onChange]);

  // dropzone props
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ 
    accept: mimeType,
    onDrop, 
    maxFiles,
  });

  return (
    <div 
      {...getRootProps()} 
      className={classes.root}
    >
      {/* -------------------- input -------------------- */}
      <input {...getInputProps({ multiple: false })} name={name} />

      {!currentFile && !isDragActive
      /* -------------------- placeholder -------------------- */
        ? (
          <>
            <img alt="" className={classes.img} src="data:image/png;base64,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" />
            <Typography variant="subtitle2" gutterBottom className={classes.label}>Add images</Typography>
            <Typography variant="subtitle2" gutterBottom>Drag and drop to upload</Typography>
          </>
        ) 

      /* -------------------- selected file name -------------------- */
        : (
          <Box display="flex" flex={1} alignSelf="stretch">
            {currentFile && (
              <Box width={200}>
                <img alt="" src={URL.createObjectURL(currentFile)} className={classes.thumbnail} />
              </Box>
            )}
          </Box>
        )}
    </div>
  );
};

export default DropFileUploader;