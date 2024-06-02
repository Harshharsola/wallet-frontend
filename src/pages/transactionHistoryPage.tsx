import React, { useState } from "react";
import { useEffect } from "react";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getTransactions } from "../api";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import toast from "react-hot-toast";
import { TableFooter } from "@mui/material";
import DownloadTransactions from "../components/downloadComponent";

const Page = styled.div`
  background-color: #1f4d90;
  height: 100vh;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background-color: white;
  text-align: center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 2px;
`;

function TransactionHistoryPage({ walletId }: { walletId: string }) {
  const [transactions, setTransactions] = useState<any>();
  const [transactionsCount, setTransactionsCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    const fetchApi = () => {
      getTransactions({
        walletId: walletId,
        skip: page * rowsPerPage,
        limit: rowsPerPage,
      }).then((response) => {
        if (response.status === "200") {
          setTransactions(response.data.transactions);
          setTransactionsCount(response.data.transactionsCount);
          setCount(response.data.transactionsCount);
        } else {
          toast.error(response.message);
        }
      });
    };
    fetchApi();
  }, [rowsPerPage, page]);
  return (
    <Page>
      <Modal>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((transaction: any) => {
              return (
                <TableRow>
                  <TableCell>{transaction.date.slice(0, 10)}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.balance}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <CustomTablePagination
                rowsPerPageOptions={[1, 2, 5, 10]}
                onPageChange={(event, newPage) => {
                  console.log(event);
                  setPage(newPage);
                }}
                rowsPerPage={rowsPerPage}
                count={count}
                page={page}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
        <DownloadTransactions walletId={walletId} />
      </Modal>
    </Page>
  );
}
const CustomTablePagination = styled(TablePagination)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;
  }
`;

export default TransactionHistoryPage;
