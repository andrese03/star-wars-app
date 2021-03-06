import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Card from "../components/Card";
import useDebounce from "../hooks/debounce";

interface Props {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

function Search(props: Props) {
  const { value, onChange, disabled = false, placeholder } = props;
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);

  useEffect(() => {
    onChange(search);
  }, [debouncedSearch]);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  return (
    <Card>
      <TextField
        id="app-search"
        label="Search"
        variant="outlined"
        placeholder={placeholder ?? "Search..."}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
        autoFocus
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={disabled}
        autoComplete="off"
      />
    </Card>
  );
}

export default Search;
