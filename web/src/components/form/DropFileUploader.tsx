import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    marginTop: 2,
    composes: 'flexCenter center stretch flex1',
    border: '2px dashed #9e9e9e',
    borderRadius: 3,
    background: '#f5f5f5 right 20px center no-repeat',
    cursor: 'pointer',
    minHeight: 100,
    position: 'relative',
    transition: 'background-color ease .5s , border-color ease .5s',
    width: '100%',
    '&:hover': {
      backgroundColor: '#e1f5fe',
    	border: '2px dashed #4285f4',
    },
  },
});

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
            <Typography variant="subtitle2" gutterBottom>Drag image file here or</Typography>
            <Typography variant="subtitle2" gutterBottom>Browse from your computer</Typography>
          </>
        ) 

      /* -------------------- selected file name -------------------- */
        : (
          <Typography variant="subtitle2" gutterBottom>
            {currentFile?.name}
          </Typography>
        )}
    </div>
  );
};

export default DropFileUploader;