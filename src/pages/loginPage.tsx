import React, { useState } from "react";
import { useEffect } from "react";

import LoginComponent from "../components/loginComponent";
import { LogInComponentType } from "../constants";
import styled from "@emotion/styled";
interface UserDataInterface {
  name: string;
  amount: number;
}
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

function LoginPage({
  userData,
  setUserData,
  setWalletId,
}: {
  userData: UserDataInterface;
  setUserData: React.Dispatch<React.SetStateAction<UserDataInterface>>;
  setWalletId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [logedIn, setLogedIn] = useState<boolean>(false);

  return (
    <Page>
      {!logedIn && (
        <LoginComponent
          userData={userData}
          setUserData={setUserData}
          setLoggedIn={setLogedIn}
          setWalletId={setWalletId}
        />
      )}
    </Page>
  );
}

export default LoginPage;
