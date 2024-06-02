import React, { useState } from "react";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, Typography } from "@mui/material";
import { LogInComponentType, storageKey } from "../constants";
import styled from "@emotion/styled";
import toast, { useToasterStore } from "react-hot-toast";
import { creatWalletApi, transact } from "../api";

interface Iprops {
  walletId: string;
  setRefreshBalance: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = styled.div`
  background-color: white;
  width: 20%;
  min-width: 300px;
  text-align: center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 2px;
`;

const ModalWrapper = styled.div`
  background-color: "#1F4D90";
  height: "100vh";
  width: "100%";
  text-align: "center";
  display: "flex";
  flex-direction: "column";
  align-items: "center";
  justify-content: "center";
`;

function PaymentComponent(props: Iprops) {
  const [paymentDetails, setPaymentDetails] = useState<{
    amount?: number | undefined;
    description?: string | undefined;
  }>();
  const handleInputChange = (event: any) => {
    let data = {
      ...paymentDetails,
      [event.target.name]: event.target.value,
    };
    setPaymentDetails(data);
  };
  const handleSubmit = async (transactionType: string) => {
    if (!paymentDetails?.amount || !paymentDetails.description) {
      toast.error("missing fields");
      return;
    }
    let response;
    if (transactionType === "DEBIT") {
      response = await transact({
        walletId: props.walletId,
        amount: -1 * paymentDetails.amount,
        description: paymentDetails.description,
      });
    } else if (transactionType === "CREDIT") {
      response = await transact({
        walletId: props.walletId,
        amount: paymentDetails.amount,
        description: paymentDetails.description,
      });
    }
    if (response.status === "200") {
      props.setRefreshBalance((prev) => !prev);
      toast.success("Transaction successfull");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <ModalWrapper>
      <Modal>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "100%",
              gap: "4px",
            }}
          >
            <Typography>Description</Typography>
            <input
              style={{ height: "30px" }}
              name="description"
              onChange={handleInputChange}
            ></input>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
              width: "100%",
              gap: "4px",
            }}
          >
            <Typography>Add Amount</Typography>
            <input
              style={{ height: "30px" }}
              name="amount"
              type="number"
              onChange={handleInputChange}
            ></input>
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              style={{
                backgroundColor: "#1F4D90",
                color: "white",
              }}
              onClick={() => {
                handleSubmit("DEBIT");
              }}
            >
              Pay
            </Button>
            <Button
              style={{
                backgroundColor: "#1F4D90",
                color: "white",
              }}
              onClick={() => {
                handleSubmit("CREDIT");
              }}
            >
              Recharge wallet
            </Button>
          </div>
        </div>
      </Modal>
    </ModalWrapper>
  );
}

export default PaymentComponent;
