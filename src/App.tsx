import React, { useEffect, useState } from "react";
import "./App.css";
import LoginPage from "./pages/loginPage";
import { Toaster } from "react-hot-toast";
import { storageKey } from "./constants";
import PaymentsPage from "./pages/paymentPage";
import WalletPage from "./pages/walletPage";
interface UserDataInterface {
  name: string;
  amount: number;
}
function App() {
  const [userData, setUserData] = useState<UserDataInterface>({
    name: "",
    amount: 0,
  });
  const [walletId, setWalletId] = useState<string>("");
  const [showLoginPage, setShowLoginPage] = useState<boolean>(true);
  useEffect(() => {
    const walletIdFromStorage = localStorage.getItem(storageKey.walletID);
    if (!walletIdFromStorage) {
      setShowLoginPage(true);
    } else {
      setWalletId(walletIdFromStorage);
      setShowLoginPage(false);
    }
  }, []);

  return (
    <div>
      {showLoginPage && (
        <LoginPage
          userData={userData}
          setUserData={setUserData}
          setWalletId={setWalletId}
        />
      )}
      {walletId.length !== 0 && <WalletPage walletId={walletId} />}
      <Toaster />
    </div>
  );
}

export default App;
