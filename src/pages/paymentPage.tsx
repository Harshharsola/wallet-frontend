import React, { useState } from "react";
import { useEffect } from "react";
import styled from "@emotion/styled";
import PaymentComponent from "../components/paymentComponent";
import BalanceComponent from "../components/balanceComponent";

const Page = styled.div`
  background-color: #1f4d90;
  height: 100vh;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

function PaymentsPage({ walletId }: { walletId: string }) {
  const [refreshBalance, setRefreshBalance] = useState<boolean>(false);
  return (
    <Page>
      <BalanceComponent walletId={walletId} refresh={refreshBalance} />
      <PaymentComponent
        walletId={walletId}
        setRefreshBalance={setRefreshBalance}
      />
    </Page>
  );
}

export default PaymentsPage;
