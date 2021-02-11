import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import { Column } from 'devextreme-react/data-grid';

import { toMoment } from '../../utils/utils';
import TableButtonsAction from '../../components/devExpressTable/TableButtonsAction';
import Table from '../../components/devExpressTable/Table';
import ModalDialog from '../../components/ModalDialog';

import { deleteProject, getProjectValues, updateProject } from '../../actions/projects';
import CustomCell from '../../components/devExpressTable/CustomCell';
import ProjectForm from './ProjectForm';

const useStyles = makeStyles({
  root: {},
});

const columns = ['id', 'name', 'updatedAt', 'data'];

type Props = {
	rows: any[];
};

const ProjectsTable = ({ rows }: Props) => {
  // state
  const [selectedData, setSelectedData] = useState<any>(null);

  // styles
  const classes = useStyles();

  // dispatch
  const dispatch = useDispatch();

  // retrieving data
  const getDataSource = useCallback(() => {
    return rows.map((project) => ({
      [columns[0]]: project.id,
      [columns[1]]: project.get('name'),
      [columns[2]]: toMoment(new Date(project.updatedAt)).format('YYYY-MM-DD').toUpperCase(),
      [columns[3]]: project,
    }));
  }, [rows]);

  // get initial values
  const getInitialValues = useCallback(() => {
    if (!selectedData) return;

    const projectValues = getProjectValues(selectedData);
    return {
      ...projectValues,
    };

  }, [selectedData]);


  // delete project
  const handleDelete = (projectId: string) => {
    const deletedData = rows.find((row) => row.id === projectId);
    dispatch(deleteProject(deletedData));
  };

  const onSelectionChanged = ({ selectedRowsData }: any) => {
    const selectedData = selectedRowsData[0]; 
    if (selectedData?.data) {
      setSelectedData(selectedData.data);
    }
  };
  const handleCloseDialog = () => {
    setSelectedData(null);
  };


  const _save = async (values: any) => {
		if (!values) return;
    await dispatch(updateProject(selectedData, values));
    handleCloseDialog();
  };
	
  // submit change
  const _submit = () => dispatch(submit('projectForm'));

  return (
    <div className={classes.root}>
      <Table
        dataSource={getDataSource()}
        onSelectionChanged={onSelectionChanged}
        selection={{ mode: 'single' }}
        actionRender={(value: any) => (
          <TableButtonsAction 
            onDelete={() => handleDelete(value.data.id)}
            label={value.data.name}
          />
        )}
      >
        <Column
          dataField={columns[1]}
          caption="Nom"
          cellRender={({ data }) => <CustomCell value={data.name} />}
        />
        <Column
          dataField={columns[2]}
          caption="Date Modification" 
          defaultSortOrder="desc"
          cellRender={({ data }) => <CustomCell value={data.updatedAt} />}
        />
      </Table>

      {/* ----------------- Data Edit Dialog ----------------- */}
      <ModalDialog
        title={`Modifier -  ${selectedData?.name} :`}
        content={<ProjectForm onSubmit={_save} initialValues={getInitialValues()} />}
        isVisible={!!rows.find(project => project.id === selectedData?.id)}
        onClose={handleCloseDialog}
        onConfirm={_submit}
        labelConfirm="Enregistrer"
      />
    </div>
  );
};

export default ProjectsTable;