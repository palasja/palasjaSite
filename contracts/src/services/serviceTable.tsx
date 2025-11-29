import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Personal, Service } from '../helpers/contractTypes';
import { Box, Button, IconButton, MenuItem } from '@mui/material';
import {
  useToPaidServiceMutation,
  useToUnpaidServiceMutation,
} from '../redux/slices/servicesRTKSlice';

const ServiceTable = ({
  data,
  edit,
  remove,
}: {
  data: Service[];
  edit: (service: Service) => void;
  remove: (id: string) => void;
}) => {
  //should be memoized or stable
  const [toPaidServices] = useToPaidServiceMutation();
  const [toUnpaidServices] = useToUnpaidServiceMutation();
  const columns = useMemo<MRT_ColumnDef<Service>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Наименование',
        size: 200,
      },
      {
        accessorKey: 'date',
        header: 'Дата услуги',
        size: 100,
      },
      {
        accessorKey: 'user',
        header: 'Пользователь',
        size: 50,
      },
      {
        accessorKey: 'place',
        header: 'Место',
        size: 50,
      },
      {
        accessorKey: 'cost',
        header: 'Стоимость',
        size: 50,
      },
      {
        accessorKey: 'count',
        header: 'Кол-во',
        size: 100,
      },
      {
        accessorKey: 'description',
        header: 'Детали',
        size: 300,
      },
      {
        accessorKey: 'ispaid',
        header: 'Оплачено',
        size: 100,
        Cell: ({ row }) => {
          return row.original.ispaid ? <>YES</> : <>NOU</>;
        },
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
      <Box>
        <IconButton
          onClick={() => {
            edit(data.find((p) => p.id === row.original.id) as Service);
          }}
        >
          *{/* <EditIcon /> */}
        </IconButton>
        <IconButton onClick={() => remove(row.original.id.toString())}>
          -{/* <DeleteIcon /> */}
        </IconButton>
      </Box>
    ),
    enableRowSelection: true,
    renderTopToolbarCustomActions: ({ table }) => (
      <>
        <Button
          onClick={() => {
            const rowSelection = table.getState().rowSelection; //read state
            const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
            const idArr = selectedRows.map((h) => h.original.id);
            console.log(idArr);
            toPaidServices(idArr);
          }}
        >
          Оплачено
        </Button>
        <Button
          onClick={() => {
            // const rowSelection = table.getState().rowSelection; //read state
            const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
            const idArr = selectedRows.map((h) => h.original.id);
            console.log(idArr);
            toUnpaidServices(idArr);
          }}
        >
          Не Оплачено
        </Button>
      </>
    ),
    enablePagination: false,
    enableBottomToolbar: false, //hide the bottom toolbar as well if you want
  });

  return <MaterialReactTable table={table} />;
};

export default ServiceTable;
