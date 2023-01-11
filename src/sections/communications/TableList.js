import ListTable from '@components/table/ListTable';
import { useCommunicationsContext } from '@contexts/communications';
import { Button, Card, TableCell, TablePagination, TableRow } from '@mui/material';
import { useEffect } from 'react';
import Iconify from '@components/iconify';
import { useRouter } from 'next/router';
import moment from 'moment';

const TABLE_HEADERS = {
  // from: {
  //   id: 'from',
  //   label: 'From',
  //   align: 'left',
  // },
  to: {
    id: 'to',
    label: 'To',
    align: 'left',
  },

  type: {
    id: 'type',
    label: 'Type',
    align: 'left',
  },
  timestamp: {
    id: 'timestamp',
    label: 'Date',
    align: 'left',
  },

  status: {
    id: 'status',
    label: 'Status',
    align: 'left',
  },
};

const TableList = () => {
  const { getCommunicationsList, communicationsList } = useCommunicationsContext();
  const router = useRouter();

  useEffect(() => {
    getCommunicationsList();
  }, [getCommunicationsList]);

  const handleBeneficiaryView = (id) => () => {
    if (!id) return;
    router.push(`/beneficiaries/${id}`);
  };

  console.log('communicationsList', communicationsList);

  return (
    <Card>
      <ListTable
        tableHeadersList={TABLE_HEADERS}
        tableRowsList={communicationsList}
        footer={
          <TablePagination
            component="div"
            count={100}
            // page={page}
            // onPageChange={handleChangePage}
            // rowsPerPage={rowsPerPage}
            // onRowsPerPageChange={handleChangeRowsPerPage}
          />
        }
      >
        {(rows, tableHeadersList) =>
          rows.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align={tableHeadersList['to'].align}>
                <Button variant="text" disabled={!row.beneficiaryId} onClick={handleBeneficiaryView(row.beneficiaryId)}>
                  {row.to}
                </Button>
              </TableCell>
              <TableCell align={tableHeadersList['type'].align}>{row.type}</TableCell>
              <TableCell align={tableHeadersList['timestamp'].align}>
                {moment.unix(row.timestamp).format('DD/MM/YY, h:mm a')}
              </TableCell>
              <TableCell align={tableHeadersList['status'].align}>{row.status}</TableCell>
            </TableRow>
          ))
        }
      </ListTable>
    </Card>
  );
};

export default TableList;
