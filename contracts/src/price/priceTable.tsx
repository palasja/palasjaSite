import { MaterialReactTable, MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { Price } from '../helpers/contractTypes';
import style from './price.modole.css';
import { EditIcon, RemoveIcon } from '../components/icons/icons';
import { Box, IconButton } from '@mui/material';
import { useMemo } from 'react';

const PriceTable = ({
  data,
  edit,
  remove,
}: {
  data: Price[];
  edit: (service: Price) => void;
  remove: (id: string) => void;
}) => {
  const columns = useMemo<MRT_ColumnDef<Price>[]>(
    () => [
      {
        accessorKey: 'serviceName',
        header: 'Услуга',
        size: 100,
      },
      {
        accessorKey: 'cost',
        header: 'Стоимость',
        size: 50,
      },
      {
        accessorKey: 'description',
        header: 'Детали',
        size: 150,
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    positionActionsColumn: 'last',
    renderRowActions: ({ row }) => (
      <Box width={100}>
        <IconButton
          onClick={() => {
            edit(data.find((p) => p.id === row.original.id) as Price);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => remove(row.original.id.toString())}>
          <RemoveIcon />
        </IconButton>
      </Box>
    ),
    enableRowSelection: true,
    enablePagination: false,
    enableBottomToolbar: false, //hide the bottom toolbar as well if you want
  });
  return <MaterialReactTable table={table} />;
};

export default PriceTable;
