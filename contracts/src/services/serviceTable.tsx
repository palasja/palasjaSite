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
import { EditIcon, PayIcon, RemoveIcon, UnpayIcon } from '../components/icons/icons';
import style from './services.module.css';
import { default as CreditScoreIconMaterial } from '@mui/icons-material/CreditScore';
import { default as CreditCardOffIconMaterial } from '@mui/icons-material/CreditCardOff';

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
        size: 50,
      },
      {
        accessorKey: 'description',
        header: 'Детали',
        size: 350,
      },
      {
        accessorKey: 'ispaid',
        header: 'Оплачено',
        size: 50,
        Cell: ({ row }) => {
          return row.original.ispaid ? <CreditScoreIconMaterial /> : <CreditCardOffIconMaterial />;
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
      <Box width={100}>
        <IconButton
          onClick={() => {
            edit(data.find((p) => p.id === row.original.id) as Service);
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
    renderTopToolbarCustomActions: ({ table }) => (
      <div className={style.payBtn}>
        <PayIcon
          onClick={() => {
            // const rowSelection = table.getState().rowSelection; //read state
            const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
            const idArr = selectedRows.map((h) => h.original.id);
            console.log(idArr);
            toPaidServices(idArr);
          }}
        />
        <UnpayIcon
          onClick={() => {
            // const rowSelection = table.getState().rowSelection; //read state
            const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
            const idArr = selectedRows.map((h) => h.original.id);
            console.log(idArr);
            toUnpaidServices(idArr);
          }}
        />
      </div>
    ),
    enablePagination: false,
    enableBottomToolbar: false, //hide the bottom toolbar as well if you want
  });

  return <MaterialReactTable table={table} />;
};

export default ServiceTable;
