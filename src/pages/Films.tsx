import React, { useState } from "react";
import { ReactComponent as Icon } from "../assets/film.svg";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchFilms } from "../slices/films";
import Search from "../components/Search";
import List from "../components/List";
import Button from "../components/Button";
import { Film } from "../shared/interfaces";

function Films() {
  // Hooks
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const films = useAppSelector((state) => state.films.films);
  const count = useAppSelector((state) => state.films.count);
  const loading = useAppSelector((state) => state.films.loading);
  const dispatch = useAppDispatch();

  const handleClickListItem = (film: Film) => {
    navigate(`/films/${film.id}`);
  };

  const handleLoadMoreButtonClick = () => {
    const newPage = page + 1;
    dispatch(fetchFilms(newPage, true));
    setPage(newPage);
  };

  const handleSearch = (newSearch: string) => {
    const newPage = 1;
    dispatch(fetchFilms(newPage, false, newSearch));
    setPage(newPage);
    setSearch(newSearch);
  };

  return (
    <>
      <Header
        title="Films"
        icon={<Icon fill="white" height={40} width={40} />}
      />

      <Search value={search} onChange={handleSearch} />

      <List
        keySelector={(film) => film.url}
        selector={(film) => film.title}
        items={films}
        loading={loading}
        disabled={loading}
        handleClickItem={handleClickListItem}
      />

      <Button
        onClick={handleLoadMoreButtonClick}
        // This extra loading validation is to prevent two spinners on the screen at the same time
        loading={loading && films.length > 0}
        disabled={loading || films.length >= count}
      >
        Load more
      </Button>
    </>
  );
}

export default Films;
