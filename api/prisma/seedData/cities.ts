export interface ICity {
  name: string;
  latitude: number;
  longitude: number;
}

const cities: ICity[] = [
  {
    name: 'New York',
    latitude: 40.7595968,
    longitude: -73.9776144,
  },
  {
    name: 'Moscow',
    latitude: 55.727886,
    longitude: 37.671269,
  },
  {
    name: 'Oslo',
    latitude: 59.911889,
    longitude: 10.745646,
  },
  {
    name: 'New Delhi',
    latitude: 28.598189,
    longitude: 77.141004,
  },
];

export default cities;
