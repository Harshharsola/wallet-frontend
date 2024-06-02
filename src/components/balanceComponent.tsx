import React, { useState } from "react";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, Typography } from "@mui/material";
import { LogInComponentType, storageKey } from "../constants";
import styled from "@emotion/styled";
import toast, { useToasterStore } from "react-hot-toast";
import { creatWalletApi, getWalletDetails, transact } from "../api";

interface Iprops {
  walletId: string;
  refresh: boolean;
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

function BalanceComponent(props: Iprops) {
  const [walletBalance, setWalletBalance] = useState<number>(0);
  useEffect(() => {
    const fetchWalletDetails = async () => {
      getWalletDetails(props.walletId).then((response) => {
        if (response.status === "200") {
          setWalletBalance(response.data.balance);
        } else {
          toast.error(response.message);
        }
      });
    };
    fetchWalletDetails();
  }, [props.refresh]);

  return (
    <ModalWrapper>
      <Modal>Current Balance = Rupees {walletBalance}</Modal>
    </ModalWrapper>
  );
}

export default BalanceComponent;
