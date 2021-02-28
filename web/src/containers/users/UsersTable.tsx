import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Column } from 'devextreme-react/data-grid';
import { Chip } from '@material-ui/core';

import { toMoment } from '../../utils/utils';
import TableButtonsAction from '../../components/devExpressTable/TableButtonsAction';
import Table from '../../components/devExpressTable/Table';
import CustomCell from '../../components/devExpressTable/CustomCell';
import { User } from '../../types/user';
import { deleteUser, goToUserPreview } from '../../actions/users';
import { loadUserRoles } from '../../actions/roles';
import { Role } from '../../types/role';

const columns: string[] = ['firstName', 'updatedAt', 'roles', 'data'];

type Props = {
	rows: User[];
};

const UsersTable = ({ rows }: Props) => {
  

  // dispatch
  const dispatch = useDispatch();

  // retrieving data
  const getDataSource = useCallback(() => {

    return rows.map((user: User) => {
      // const usersRoles = roles.map(role => role.get('users'));
      // console.log('usersRoles: ', usersRoles);
      // console.log('r', usersRoles.find((u: User) => u.id !== user.id));
      // console.log('r', roles.map(role => role.has('users').get('users').find((u: User) => u.id === user.id)));
      return {
        [columns[0]]: user.get('firstName'),
        [columns[1]]: user.updatedAt,
        // [columns[2]]: roles,
        [columns[2]]: user,
      };
    });
  }, [rows]);

  // delete user
  const handleDelete = (userId: string) => {
    const deletedData = rows.find((row) => row.id === userId);
    dispatch(deleteUser(deletedData));
  };

  // go to user form edit page
  const _goToUserPreview =  (slug: string) => {
    dispatch(goToUserPreview(slug));
  };

  // const roles = (roles: any) => {
  //   console.log('roles: ', roles);
    
  //   return roles.map((role: any) => <Chip label={role.get('name')} color="primary" />);
  // };
  
  return (
    <div>
      <Table
        dataSource={getDataSource()}
        actionColumnWidth={120}
        actionRender={(value: any) => (
          <TableButtonsAction 
						onPreview={() => _goToUserPreview(value.data.data.get('slug'))}
            onDelete={() => handleDelete(value.data.data.id)}
						label={value.data.name}
          />
        )}
      >
        <Column
          dataField={columns[0]}
          caption="Nom"
          cellRender={({ data }) => <CustomCell value={data.firstName} />}
        />
        <Column
          dataField={columns[1]}
          caption="Date Modification" 
          dataType="date"
          defaultSortOrder="desc"
          cellRender={({ data }) => <CustomCell value={toMoment(new Date(data.updatedAt)).format('YYYY-MM-DD à HH:ss')} />}
        />
        {/* <Column
          dataField={columns[2]}
          caption="Roles"
          cellRender={({ data }) => <CustomCell value={roles(data.roles)} />}
        /> */}
      </Table>
    </div>
  );
};

export default UsersTable;