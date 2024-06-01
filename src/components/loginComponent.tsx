import React, { useState } from "react";
import { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { Button, Typography } from "@mui/material";
import { LogInComponentType, storageKey } from "../constants";
import styled from "@emotion/styled";
import toast, { useToasterStore } from "react-hot-toast";
import { creatWalletApi } from "../api";
interface UserDataInterface {
  name: string;
  amount: number;
}

interface Iprops {
  userData: UserDataInterface;
  setUserData: React.Dispatch<React.SetStateAction<UserDataInterface>>;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setWalletId: React.Dispatch<React.SetStateAction<string>>;
}

const Modal = styled.div`
  background-color: white;
  width: 20%;
  min-width: 300px;
  text-align: center;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 2%;
  gap: 2px;
`;

function LoginComponent(props: Iprops) {
  const [userData, setUserData] = useState<UserDataInterface>(props.userData);

  const handleInputChange = (event: any) => {
    let data = {
      ...userData,
      [event.target.name]: event.target.value,
    };
    setUserData(data);
  };

  const handleSubmit = async () => {
    creatWalletApi({ name: userData.name, balance: userData.amount }).then(
      (response: any) => {
        if (response.status === "200") {
          props.setWalletId(response.data._id);
          localStorage.setItem(storageKey.walletID, response.data._id);
        } else {
          toast.error(response.message);
        }
      }
    );
  };

  return (
    <div
      style={{
        backgroundColor: "#1F4D90",
        height: "100vh",
        width: "100%",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Modal
        style={{
          backgroundColor: "white",
          width: "20%",
          minWidth: "300px",
          textAlign: "center",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          padding: "2%",
          gap: "12px",
        }}
      >
        <Typography variant="h4">Create Wallet</Typography>
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
            <Typography>Name</Typography>
            <input
              style={{ height: "30px" }}
              name="name"
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

          <Button
            style={{
              backgroundColor: "#1F4D90",
              color: "white",
            }}
            onClick={handleSubmit}
          >
            Create wallet
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default LoginComponent;
