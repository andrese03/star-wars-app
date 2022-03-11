import React from "react";
import { Theme } from "@mui/system";
import { Box, SxProps } from "@mui/material";

interface Props {
  children?: React.ReactNode;
  sx?: SxProps<Theme> | undefined;
}

function Card(props: Props) {
  const { children = null, sx = {} } = props;
  return (
    <Box
      padding={2}
      marginBottom={2}
      bgcolor="background.paper"
      borderRadius="4px"
      sx={sx}
    >
      {children}
    </Box>
  );
}

export default Card;
