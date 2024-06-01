import React, { useState } from "react";
import { useEffect } from "react";
import styled from "@emotion/styled";
import PaymentsPage from "./paymentPage";
import TransactionHistoryPage from "./transactionHistoryPage";
import { Button } from "@mui/material";

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

function WalletPage({ walletId }: { walletId: string }) {
  const [showPaymentPage, setShowPaymentPage] = useState<boolean>(true);
  return (
    <Page>
      <Button
        variant="contained"
        onClick={() => {
          setShowPaymentPage((prev) => !prev);
        }}
      >
        {showPaymentPage ? "Show Transaction History" : "Make Payment"}
      </Button>
      {showPaymentPage ? (
        <PaymentsPage walletId={walletId} />
      ) : (
        <TransactionHistoryPage walletId={walletId} />
      )}
    </Page>
  );
}

export default WalletPage;
