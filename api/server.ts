import constants from './constants';
import app from './express';
import AppDataSource from './data-source';

const { API_PORT } = constants;

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")

        // console.log("inserting a new user")
        // const user = new User() // create object
        // user.firstName = "Timber" // define values
        // user.lastName = "Saw"
        // user.age = 25

        // EXAMPLE of adding and getting data with relationship 
        // const userRepo = AppDataSource.getRepository(User)
        // await userRepo.save(user)
        // console.log("user saved with id: ", user.id)
        // const savedUsers = await userRepo.find()
        // console.log("All users from database: ", savedUsers)

        // EXAMPLE of adding and getting data with entity manager
        // await AppDataSource.manager.save(user) // use manager to add to database
        // console.log("Saved a new user with id: " + user.id)
        // const users = await AppDataSource.manager.find(User) // use manager to get values
        // console.log("All users from database: ", users)

        // CLEAR all users from DB
        // const userRepo = AppDataSource.getRepository(User)
        // await userRepo.clear()
        // const savedUsers = await userRepo.find()
        // console.log("All users from database: ", savedUsers)

    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization", err)
    })

app.listen(API_PORT, (err?: Error) => {
  if (err) console.log(err);
  console.info(`Server started on port ${API_PORT}.`);
});
