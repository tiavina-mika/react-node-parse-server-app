import { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DataGrid, { SearchPanel, Grouping, Pager, Paging, Column } from 'devextreme-react/data-grid';
import clsx from 'clsx';

const useStyles = makeStyles({
  grid: {
    '& td div, td': {
      fontSize: 15,
      fontWeight: 400,
    },
    '& td': {
      padding: '6px 20px !important',
    },
    '& td .dx-button-content': {
      padding: 5,
      marginRight: 5, 
      marginLeft: 5, 
    },
  },
  selectableRow: {
    '& tr': {
      cursor: 'pointer', 
    },
  },
});

type Props = {
	dataSource: any[];
	showBorders?: boolean;
	showRowLines?: boolean;
	rowAlternationEnabled?: boolean;
	actionColumnWidth?: number;
	showColumnLines?: boolean;
	defaultPageSize?: number;
	actionRender?: any;
	onSelectionChanged?: any;
	className?: string;
	selection?: any;
	pageSizes?: number[];
	children: ReactNode;
};

const Table = ({
  dataSource,
  showBorders = true,
  showRowLines = true,
  actionRender,
  rowAlternationEnabled = true,
  defaultPageSize = 10,
  className,
  showColumnLines = true,
  onSelectionChanged,
  selection,
  actionColumnWidth,
  pageSizes = [10, 25, 50, 100],
  children,
}: Props) => {

  // styles
  const classes = useStyles();

  return (
    <DataGrid
      dataSource={dataSource}
      showBorders={showBorders}
      rowAlternationEnabled={rowAlternationEnabled}
      showRowLines={showRowLines}
      showColumnLines={showColumnLines}
      className={clsx(classes.grid, className, selection && classes.selectableRow)}
      onSelectionChanged={onSelectionChanged}
      selection={selection}
    >
      {/* columns */}
      {children}

      {/* the buttons action column (preview, delete, edit) */}
      { actionRender && (
        <Column
          width={actionColumnWidth || 80}
          dataField="Actions"
          type="buttons"
          cellRender={actionRender}
        />
      )}
      <SearchPanel visible highlightCaseSensitive />
      <Grouping autoExpandAll={false} />
      <Pager allowedPageSizes={pageSizes} showPageSizeSelector />
      <Paging defaultPageSize={defaultPageSize} />
    </DataGrid>
  );
};

export default Table;