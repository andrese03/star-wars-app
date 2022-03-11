import React, { useState } from "react";
import { ReactComponent as Icon } from "../assets/people.svg";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPeople } from "../slices/people";
import Search from "../components/Search";
import List from "../components/List";
import Button from "../components/Button";
import { Person } from "../shared/interfaces";

function People() {
  // Hooks
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const people = useAppSelector((state) => state.people.people);
  const count = useAppSelector((state) => state.people.count);
  const loading = useAppSelector((state) => state.people.loading);
  const dispatch = useAppDispatch();

  const handleClickListItem = (person: Person) => {
    navigate(`/people/${person.id}`);
  };

  const handleLoadMoreButtonClick = () => {
    const newPage = page + 1;
    dispatch(fetchPeople(newPage, true));
    setPage(newPage);
  };

  const handleSearch = (newSearch: string) => {
    const newPage = 1;
    dispatch(fetchPeople(newPage, false, newSearch));
    setPage(newPage);
    setSearch(newSearch);
  };

  return (
    <>
      <Header
        title="People"
        icon={<Icon fill="white" height={40} width={40} />}
      />

      <Search
        value={search}
        onChange={handleSearch}
        placeholder="Search for the chosen one..."
      />

      <List
        keySelector={(person) => person.url}
        selector={(person) => person.name}
        items={people}
        loading={loading}
        disabled={loading}
        handleClickItem={handleClickListItem}
      />

      <Button
        onClick={handleLoadMoreButtonClick}
        // This extra loading validation is to prevent two spinners on the screen at the same time
        loading={loading && people.length > 0}
        disabled={loading || people.length >= count}
      >
        Load more
      </Button>
    </>
  );
}

export default People;
