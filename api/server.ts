import constants from './constants';
import app from './express';
import AppDataSource from './data-source'

const { API_PORT } = constants;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization", err)
    })

app.listen(API_PORT, (err?: Error) => {
  if (err) console.log(err);
  console.info(`Server started on port ${API_PORT}.`);
});
