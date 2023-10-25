import { ICity } from './cities';

export interface ICharacter {
  name: string;
  height: number;
  series: { name: string; firstIssue: Date }[];
  city: ICity;
}

const characters: ICharacter[] = [
  {
    name: 'Superman',
    height: 191,
    series: [
      { name: 'Superman', firstIssue: new Date('1991-04-04') },
      { name: 'Justice League', firstIssue: new Date('1971-02-04') },
    ],
    city: {
      name: 'Metropolis',
      latitude: 28.598189,
      longitude: 77.141004,
    },
  },
  {
    name: 'Hulk',
    height: 250,
    series: [{ name: 'Avengers', firstIssue: new Date('1991-02-04') }],
    city: {
      name: 'New Delhi',
      latitude: 28.598189,
      longitude: 77.141004,
    },
  },
  {
    name: 'Iron Man',
    height: 185,
    series: [
      { name: 'Iron Man', firstIssue: new Date('1981-02-04') },
      { name: 'Avengers', firstIssue: new Date('1991-02-04') },
    ],
    city: {
      name: 'New York',
      latitude: 40.7595968,
      longitude: -73.9776144,
    },
  },
  {
    name: 'Doctor Strange',
    height: 183,
    series: [
      {
        name: 'Wizards Weekly',
        firstIssue: new Date('1971-02-04'),
      },
      { name: 'Avengers', firstIssue: new Date('1991-02-04') },
    ],
    city: {
      name: 'New York',
      latitude: 40.7595968,
      longitude: -73.9776144,
    },
  },
  {
    name: 'Black Widow',
    height: 164,
    series: [{ name: 'Avengers', firstIssue: new Date('1991-02-04') }],
    city: {
      name: 'Moscow',
      latitude: 55.727886,
      longitude: 37.671269,
    },
  },
];

export default characters;
