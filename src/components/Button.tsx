import React from "react";
import { Button as MuiButton, CircularProgress } from "@mui/material";
import Card from "./Card";
import { Box } from "@mui/system";

interface Props {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  loading?: boolean;
  disabled?: boolean;
}

function Button(props: Props) {
  const { onClick, loading = false, disabled = false, children } = props;
  return (
    <>
      <Card sx={{ p: 0 }}>
        <MuiButton
          sx={{
            heigh: "36px",
          }}
          fullWidth
          onClick={onClick}
          disabled={disabled}
        >
          {!loading && children}
          {loading && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress size={24.5} />
            </Box>
          )}
        </MuiButton>
      </Card>
    </>
  );
}

export default Button;
