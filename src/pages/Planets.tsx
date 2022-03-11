import React, { useState } from "react";
import { ReactComponent as Icon } from "../assets/planet.svg";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPlanets } from "../slices/planets";
import Search from "../components/Search";
import List from "../components/List";
import Button from "../components/Button";
import { Planet } from "../shared/interfaces";

function People() {
  // Hooks
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const planets = useAppSelector((state) => state.planets.planets);
  const count = useAppSelector((state) => state.planets.count);
  const loading = useAppSelector((state) => state.planets.loading);
  const dispatch = useAppDispatch();

  const handleClickListItem = (person: Planet) => {
    navigate(`/planets/${person.id}`);
  };

  const handleLoadMoreButtonClick = () => {
    const newPage = page + 1;
    dispatch(fetchPlanets(newPage, true));
    setPage(newPage);
  };

  const handleSearch = (newSearch: string) => {
    const newPage = 1;
    dispatch(fetchPlanets(newPage, false, newSearch));
    setPage(newPage);
    setSearch(newSearch);
  };

  return (
    <>
      <Header
        title="Planets"
        icon={<Icon fill="white" height={40} width={40} />}
      />

      <Search value={search} onChange={handleSearch} />

      <List
        keySelector={(person) => person.url}
        selector={(person) => person.name}
        items={planets}
        loading={loading}
        disabled={loading}
        handleClickItem={handleClickListItem}
      />

      <Button
        onClick={handleLoadMoreButtonClick}
        // This extra loading validation is to prevent two spinners on the screen at the same time
        loading={loading && planets.length > 0}
        disabled={loading || planets.length >= count}
      >
        Load more
      </Button>
    </>
  );
}

export default People;
