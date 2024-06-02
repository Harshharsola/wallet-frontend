import React from "react";
import { downloadTransactionsApi } from "../api";
import toast from "react-hot-toast";
import { Button } from "@mui/material";

const DownloadTransactions = ({ walletId }: { walletId: string }) => {
  const downloadTransactions = async () => {
    try {
      const response = await downloadTransactionsApi(walletId);

      if (!response.ok) {
        toast.error("something went wrong");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "transactions.csv";

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error(
        "There was an error downloading the transactions. Please try again later."
      );
    }
  };

  return (
    <div style={{ padding: "8px" }}>
      <Button variant="contained" onClick={downloadTransactions}>
        Download Transactions
      </Button>
    </div>
  );
};

export default DownloadTransactions;
