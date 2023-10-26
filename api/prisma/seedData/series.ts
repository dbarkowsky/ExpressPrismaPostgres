export interface ISeries {
  name: string;
  firstIssue: Date;
  companyName?: string;
}

const serieses: ISeries[] = [
  {
    name: 'Avengers',
    firstIssue: new Date('1991-02-04'),
    companyName: 'Marvel',
  },
  {
    name: 'Superman',
    firstIssue: new Date('1991-04-04'),
    companyName: 'DC',
  },
  {
    name: 'Iron Man',
    firstIssue: new Date('1981-02-04'),
    companyName: 'Marvel',
  },
  {
    name: 'Justice League',
    firstIssue: new Date('1971-02-04'),
    companyName: 'DC',
  },
  {
    name: 'Wizards Weekly',
    firstIssue: new Date('1971-02-04'),
    companyName: 'Marvel',
  },
];

export default serieses;
