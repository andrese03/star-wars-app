import React from "react";
import {
  Box,
  CircularProgress,
  List as MuiList,
  ListItem,
} from "@mui/material";
import Card from "../components/Card";

interface Props<T> {
  keySelector: (item: T) => string;
  selector: (item: T) => React.ReactNode;
  items: T[];
  handleClickItem: (item: T) => void;
  loading: boolean;
  disabled: boolean;
}

function List<G>(props: Props<G>) {
  const { items, handleClickItem, selector, keySelector, loading, disabled } =
    props;
  return (
    <>
      <Card sx={{ px: 0 }}>
        {/* List */}
        {items.length > 0 && (
          <MuiList sx={{ width: "100%" }}>
            {items.map((item) => {
              return (
                <ListItem
                  key={keySelector(item)}
                  button
                  onClick={() => handleClickItem(item)}
                  disabled={disabled}
                >
                  {selector(item)}
                </ListItem>
              );
            })}
          </MuiList>
        )}

        {/* No Items */}
        {loading && items.length === 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", paddingX: 2 }}>
            <CircularProgress size={48} />
          </Box>
        )}

        {/* No Items */}
        {!loading && items.length === 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", paddingX: 2 }}>
            There are no items to show
          </Box>
        )}
      </Card>
    </>
  );
}

export default List;
