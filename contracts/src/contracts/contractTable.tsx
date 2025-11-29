import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { Contract } from '../helpers/contractTypes';
import { Box, IconButton } from '@mui/material';
import { getURLByBase64File } from '../helpers/helper';
import { useLazyGetContractsScanQuery } from '../redux/slices/contractRTKSlice';
import { useAppSelector } from '../redux/hooks';
import { getChosenOrganization } from '../redux/slices/orgsSlice';
import { getChoosenMonth } from '../redux/slices/servicesSlice';

const ContractTable = ({
  data,
  edit,
  remove,
}: {
  data: Contract[];
  edit: (contract: Contract) => void;
  remove: (id: string) => void;
}) => {
  const [getContractScan] = useLazyGetContractsScanQuery();
  const choosenOrg = useAppSelector(getChosenOrganization);
  const choosenMonth = useAppSelector(getChoosenMonth);
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Contract>[]>(
    () => [
      {
        accessorKey: 'number',
        header: 'Номер',
        size: 200,
      },
      {
        accessorKey: 'signDate',
        header: 'Дата подписания',
        size: 200,
      },
      {
        accessorKey: 'startDate',
        header: 'Дата начала',
        size: 200,
      },
      {
        accessorKey: 'endDate',
        header: 'Дата окончания',
        size: 200,
      },
      {
        accessorKey: 'scan',
        header: 'Скад договора',
        size: 200,
        Cell: ({ row }) => {
          return (
            <button
              onClick={async () => {
                const fileName = `${choosenOrg?.name}_${choosenMonth}`;
                const result = await getContractScan({ orgId: row.original.id }).unwrap();
                const url = getURLByBase64File(result.scan, 'application/pdf');
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();
                // Cleanup
                URL.revokeObjectURL(url);
              }}
            >
              Scan
            </button>
          );
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
            edit(data.find((p) => p.id === row.original.id) as Contract);
          }}
        >
          *{/* <EditIcon /> */}
        </IconButton>
        <IconButton onClick={() => remove(row.original.id.toString())}>
          -{/* <DeleteIcon /> */}
        </IconButton>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default ContractTable;
