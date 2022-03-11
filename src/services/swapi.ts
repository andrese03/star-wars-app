import axios from "axios";
import { Film, Person, Planet } from "../shared/interfaces";
import { getUrlId } from "../utils/getUrlId";

interface SwapiResults<M> {
  count: number;
  next?: string;
  previous?: string;
  results: M;
}

const Axios = axios.create({
  baseURL: "https://swapi.dev/api",
  headers: {
    "Content-type": "application/json",
  },
});

// Returns the list of star wars people
export const fetchPeople: (
  page?: number,
  search?: string
) => Promise<SwapiResults<Person[]>> = async (
  page?: number,
  search?: string
) => {
  let url = `/people?page=${page ?? 1}`;
  if (search && search.length > 0) {
    url = `${url}&search=${search}`;
  }
  const result = await Axios.get<SwapiResults<Person[]>>(url);

  // Assign correct id
  result.data.results = result.data.results.map((item) => ({
    ...item,
    id: getUrlId(item.url),
  }));

  return result.data;
};

// Returns one star wars people
export const fetchPerson: (
  id: number
) => Promise<SwapiResults<Person>> = async (id: number) => {
  const result = await Axios.get<SwapiResults<Person>>(`/people/${id}`);
  return result.data;
};

// Returns a list of star war planets
export const fetchPlanets: (
  page?: number,
  search?: string
) => Promise<SwapiResults<Planet[]>> = async (
  page?: number,
  search?: string
) => {
  let url = `/planets?page=${page ?? 1}`;
  if (search && search.length > 0) {
    url = `${url}&search=${search}`;
  }
  const result = await Axios.get<SwapiResults<Planet[]>>(url);

  // Assign correct id
  result.data.results = result.data.results.map((item) => ({
    ...item,
    id: getUrlId(item.url),
  }));

  return result.data;
};

// Returns one star wars planet
export const fetchPlanet: (
  id: number
) => Promise<SwapiResults<Planet>> = async (id: number) => {
  const result = await Axios.get<SwapiResults<Planet>>(`/planets/${id}`);
  return result.data;
};

// Returns a list of star war films
export const fetchFilms: (
  page?: number,
  search?: string
) => Promise<SwapiResults<Film[]>> = async (page?: number, search?: string) => {
  let url = `/films?page=${page ?? 1}`;
  if (search && search.length > 0) {
    url = `${url}&search=${search}`;
  }
  const result = await Axios.get<SwapiResults<Film[]>>(url);

  // Assign correct id
  result.data.results = result.data.results.map((item) => ({
    ...item,
    id: getUrlId(item.url),
  }));

  return result.data;
};

// Returns one star wars film
export const fetchFilm: (id: number) => Promise<SwapiResults<Film>> = async (
  id: number
) => {
  const result = await Axios.get<SwapiResults<Film>>(`/films/${id}`);
  return result.data;
};
