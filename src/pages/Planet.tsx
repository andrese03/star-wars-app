import React, { useEffect } from "react";
import { ReactComponent as Icon } from "../assets/planet.svg";
import Header from "../components/Header";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPlanet, setPlanet } from "../slices/planets";
import Button from "../components/Button";
import { List, ListItem, ListItemText } from "@mui/material";

function Planet() {
  const navigate = useNavigate();
  const location = useParams();
  const planet = useAppSelector((state) => state.planets.planet);
  const loading = useAppSelector((state) => state.planets.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPlanet(Number(location.id)));
    return () => {
      dispatch(setPlanet(undefined));
    };
  }, []);

  const handleClickBackButton = () => {
    navigate("/planets");
  };

  return (
    <>
      <Header
        title={planet?.name ?? "Loading"}
        icon={<Icon fill="white" height={40} width={40} />}
      />

      <Card sx={{ px: 0, pt: 0 }}>
        <List sx={{ width: "100%" }}>
          <ListItem>
            <ListItemText
              primary="Rotation Period"
              secondary={planet?.rotation_period}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Orbital Period"
              secondary={planet?.orbital_period}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Diameter"
              secondary={planet?.diameter}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Climate"
              secondary={planet?.climate}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Gravity"
              secondary={planet?.gravity}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Terrain"
              secondary={planet?.terrain}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Surface water"
              secondary={planet?.surface_water}
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

export default Planet;
