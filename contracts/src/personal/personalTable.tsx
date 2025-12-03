import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Personal } from '../helpers/contractTypes';
import { Box, IconButton, MenuItem } from '@mui/material';
import { EditIcon, RemoveIcon } from '../components/icons/icons';

const PersonalTable = ({
  data,
  edit,
  remove,
}: {
  data: Personal[];
  edit: (person: Personal) => void;
  remove: (id: string) => void;
}) => {
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Personal>[]>(
    () => [
      {
        accessorFn: (row) => `${row.lastName} ${row.firstName} ${row.middleName}`,
        header: 'Наименование в именительном',
        size: 200,
      },
      {
        accessorFn: (row) => `${row.lastNameR} ${row.firstNameR} ${row.middleNameR}`,
        header: 'Наименование в родительном',
        size: 200,
      },
      {
        accessorKey: 'positionName',
        header: 'Должность',
        size: 150,
      },
      {
        accessorFn: (row) => `${row.isHead ? 'Руководитель' : 'Сотрудник'}`,
        header: 'Подпись',
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
      <Box width={150}>
        <IconButton
          onClick={() => {
            edit(data.find((p) => p.id === row.original.id) as Personal);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => remove(row.original.id.toString())}>
          <RemoveIcon />
        </IconButton>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default PersonalTable;
