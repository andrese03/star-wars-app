import React, { useEffect } from "react";
import { ReactComponent as Icon } from "../assets/people.svg";
import Header from "../components/Header";
import Card from "../components/Card";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchPerson, setPerson } from "../slices/people";
import Button from "../components/Button";
import { List, ListItem, ListItemText } from "@mui/material";

function Person() {
  const navigate = useNavigate();
  const location = useParams();
  const person = useAppSelector((state) => state.people.person);
  const loading = useAppSelector((state) => state.people.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPerson(Number(location.id)));
    return () => {
      dispatch(setPerson(undefined));
    };
  }, []);

  const handleClickBackButton = () => {
    navigate("/people");
  };

  return (
    <>
      <Header
        title={person?.name ?? "Loading"}
        icon={<Icon fill="white" height={40} width={40} />}
      />

      <Card sx={{ px: 0, pt: 0 }}>
        <List sx={{ width: "100%" }}>
          <ListItem>
            <ListItemText
              primary="Gender"
              secondary={person?.gender}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Height"
              secondary={person?.height}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Mass"
              secondary={person?.mass}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Hair Color"
              secondary={person?.hair_color}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Skin Color"
              secondary={person?.skin_color}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Eye Color"
              secondary={person?.eye_color}
            ></ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Birth Year"
              secondary={person?.birth_year}
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

export default Person;
