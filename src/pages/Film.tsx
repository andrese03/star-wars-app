import React, { useEffect } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { ReactComponent as Icon } from "../assets/film.svg";
import Header from "../components/Header";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchFilm, setFilm } from "../slices/films";
import Button from "../components/Button";

function Film() {
  const navigate = useNavigate();
  const location = useParams();
  const film = useAppSelector((state) => state.films.film);
  const loading = useAppSelector((state) => state.films.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilm(Number(location.id)));
    return () => {
      dispatch(setFilm(undefined));
    };
  }, []);

  const handleClickBackButton = () => {
    navigate("/films");
  };

  return (
    <>
      <Header
        title={film?.title ?? "Loading"}
        icon={<Icon fill="white" height={40} width={40} />}
      />

      <Card sx={{ px: 0, pt: 0 }}>
        <List sx={{ width: "100%" }}>
          <ListItem>
            <ListItemText
              primary="Opening Crawl"
              secondary={film?.opening_crawl}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Episode"
              secondary={film?.episode_id}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Director"
              secondary={film?.director}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Producer"
              secondary={film?.producer}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Release Date"
              secondary={film?.release_date}
            ></ListItemText>
          </ListItem>
        </List>
      </Card>

      <Button onClick={handleClickBackButton} disabled={loading}>
        Go Back
      </Button>
    </>
  );
}

export default Film;
