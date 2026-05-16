import { useMemo } from 'react';
import {
  createMRTColumnHelper,
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Service, ServiceCostChange } from '../helpers/contractTypes';
import { Box, IconButton } from '@mui/material';
import {
  useToPaidServiceMutation,
  useToUnpaidServiceMutation,
} from '../redux/slices/servicesRTKSlice';
import { EditIcon, PayIcon, RemoveIcon, UnpayIcon } from '../components/icons/icons';
import style from './services.module.css';
import { default as CreditScoreIconMaterial } from '@mui/icons-material/CreditScore';
import { default as CreditCardOffIconMaterial } from '@mui/icons-material/CreditCardOff';
import { useAppDispatch } from '../redux/hooks';
import {
  fullDesc,
  serviceCosChange
} from '../redux/slices/servicesSlice';
import {useLazyGetServiceCostChangeByIdQuery } from '../redux/slices/servicesRTKSlice';


const ServiceTable = ({
  data,
  edit,
  remove,
  showDetail,
  showServiceCost,
}: {
  data: Service[];
  edit: (service: Service) => void;
  remove: (id: string) => void;
  showDetail: () => void;
  showServiceCost: () => void
}) => {
  //should be memoized or stable
  const [toPaidServices] = useToPaidServiceMutation();
  const [toUnpaidServices] = useToUnpaidServiceMutation();
  const dispatch = useAppDispatch();
  const getShortDescription = (desc: string): string => {
    return desc.length < 75 ? desc : `${desc.substring(0, 90)} ...`;
  }
  const [getServiceChangeCost] = useLazyGetServiceCostChangeByIdQuery();
  const showFullDetails = (desc: string) => {
    dispatch(fullDesc(desc));
    showDetail();
  }
  const showCostChange = async (srviceId: number) => {
    showServiceCost();
    const result = await getServiceChangeCost(srviceId).unwrap();
    dispatch(serviceCosChange(result));
    
  }
  const columns = useMemo<MRT_ColumnDef<Service>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Услуга',
        size: 100,
      },
      {
        accessorKey: 'date',
        header: 'Дата услуги',
        size: 50,
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
        Cell: ({ cell, row }) => {
          return <div onClick={() => showCostChange(row.original.id)}>{cell.getValue<string>()} </div>;
        },
      },
      {
        accessorKey: 'count',
        header: 'Кол-во',
        size: 40,
      },
      {
        accessorKey: 'time',
        header: 'Время',
        size: 50,
      },

      {
        accessorKey: 'description',
        header: 'Детали',
        size: 250,
        Cell: ({ cell }) => {
          return <div className={style.description} onClick={() => showFullDetails(cell.getValue<string>())}>{getShortDescription(cell.getValue<string>().toString())} </div>;
        },
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
            toPaidServices(idArr);
          }}
        />
        <UnpayIcon
          onClick={() => {
            // const rowSelection = table.getState().rowSelection; //read state
            const selectedRows = table.getSelectedRowModel().rows; //or read entire rows
            const idArr = selectedRows.map((h) => h.original.id);
            toUnpaidServices(idArr);
          }}
        />
      </div>
    ),
    enablePagination: false,
    enableBottomToolbar: false, //hide the bottom toolbar as well if you want
    initialState:{
      sorting: [
        {
          id: 'date',
          desc: true
        }
      ]
    }
  });

  return <MaterialReactTable table={table} />;
};


export default ServiceTable