import React from "react";
import { Box, Container } from "@mui/material";
import { SxProps, Theme } from "@mui/system";

interface Props {
  children?: React.ReactNode;
  sx?: SxProps<Theme> | undefined;
}
function AppContainer(props: Props) {
  const { children = null, sx = {} } = props;
  return (
    <Container maxWidth="lg">
      <Box paddingTop={2} sx={sx}>
        {children}
      </Box>
    </Container>
  );
}

export default AppContainer;
