import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { submit } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import { Column } from 'devextreme-react/data-grid';

import { toMoment } from '../../utils/utils';
import TableButtonsAction from '../../components/devExpressTable/TableButtonsAction';
import Table from '../../components/devExpressTable/Table';
import ModalDialog from '../../components/ModalDialog';

import { deleteProject, getProjectValues, goToProjectEdit, updateProject } from '../../actions/projects';
import CustomCell from '../../components/devExpressTable/CustomCell';
import ProjectForm from './ProjectForm';
import { Project } from '../../types/project';
import DialogTitleIcon from '../../components/DialogTitleIcon';

const useStyles = makeStyles({
  root: {},
});

const columns: string[] = ['name', 'updatedAt', 'data'];

type Props = {
	rows: Project[];
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
    return rows.map((project: Project) => ({
      [columns[0]]: project.get('name'),
      [columns[1]]: project.updatedAt,
      [columns[2]]: project,
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

  // close dialog
  const handleCloseDialog = () => {
    setSelectedData(null);
  };

  // open dialog
	const _openEditDialog = (selectedData: any) => {
    if (!selectedData?.data) return;
		setSelectedData(selectedData.data);
	};

  // save form values
  const _save = async (values: any) => {
		if (!values) return;
    await dispatch(updateProject(selectedData, values));
    handleCloseDialog();
  };
	
  // go to project form edit page
  const _goToProjectEdit =  (slug: any) => {
    dispatch(goToProjectEdit(slug));
  };

  // submit change
  const _submit = () => dispatch(submit('projectForm'));

  return (
    <div className={classes.root}>
      <Table
        dataSource={getDataSource()}
        // onSelectionChanged={onSelectionChanged}
        actionRender={(value: any) => (
          <TableButtonsAction 
						onEdit={() => _openEditDialog(value.data)}
            onDelete={() => handleDelete(value.data.data.id)}
            openDialog={!!rows.find(template => template.id === selectedData?.id)}
						label={value.data.name}
          />
        )}
      >
        <Column
          dataField={columns[0]}
          caption="Nom"
          cellRender={({ data }) => <CustomCell value={data.name} />}
        />
        <Column
          dataField={columns[1]}
          caption="Date Modification" 
          dataType="date"
          defaultSortOrder="desc"
          cellRender={({ data }) => <CustomCell value={toMoment(new Date(data.updatedAt)).format('YYYY-MM-DD à HH:ss')} />}
        />
      </Table>

      {/* ----------------- Data Edit Dialog ----------------- */}
      <ModalDialog
        title={`Modifier - ${selectedData?.get('name')}`}
        content={<ProjectForm onSubmit={_save} initialValues={getInitialValues()} />}
        isVisible={!!rows.find(project => project.id === selectedData?.id)}
        iconTitle={<DialogTitleIcon onClick={() => _goToProjectEdit(selectedData.get('slug'))} />}
        onClose={handleCloseDialog}
        onConfirm={_submit}
        labelConfirm="Enregistrer"
      />
    </div>
  );
};

export default ProjectsTable;