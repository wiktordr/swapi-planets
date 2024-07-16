import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://swapi.dev/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export type Planet = {
  name: string;
  population: string;
  rotation_period: string;
  climate: string;
  gravity: string;
  created: string;
  url: string;
  terrain: string;
  surface_water: string;
  orbital_period: string;
  diameter: string;
}

export type PlanetsPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Planet[];
}

export const getPlanetsPage = (page: string = "1", search?: string) => {
  const reqUrl = search ? `/planets/?page=${page}&format=json&search=${search}` : `/planets/?page=${page}&format=json`;
  const response = apiClient.get<PlanetsPage>(reqUrl);

  return response;
};

export const getPlanet = (planetId: string = "1") => {
  const reqUrl = `/planets/${planetId}`;
  const response = apiClient.get<Planet>(reqUrl);

  return response;
};
