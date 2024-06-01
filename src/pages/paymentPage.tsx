import React, { useState } from "react";
import { useEffect } from "react";
import styled from "@emotion/styled";
import PaymentComponent from "../components/paymentComponent";

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

function PaymentsPage({ walletId }: { walletId: string }) {
  return (
    <Page>
      <PaymentComponent walletId={walletId} />
    </Page>
  );
}

export default PaymentsPage;
