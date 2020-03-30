# mvr-call-operator

Compliance Dashboard App

## Features

- User Authentication, listing all registered users and display Compliance dashboard.

#### Steps for building App

- Go to the project directory
  ```
  cd mvr-call-operator
  ```
- Install the Create-React-App template
  ```
  npx create-react-app .
  ```
  (or)
  ```
  yarn create react-app .
  ```
- Install necessary libraries to connect mongodb and build express API
  ```
  npm install express mongoose passport passport-jwt cors bcryptjs body-parser concurrently is-empty validator
  ```

#### To run both client & server

```
npm run dev
```

#### To register for app access.

- Click on 'Register now!' in following url and enter your details to signup with the application.
  <https://localhost:3001/login/>
- Go to login page and provide your credentials at the login screen.
  <http://localhost:3001/login>

#### To run the tests

- Go the respective project directory and run following command to run the test scripts
  ```
  npm test
  ```

### List of Links in the Applicaiton

- LoginPage/RegisterPage: <http://localhost:3001/login>
- HomePage/Dashboard: <http://localhost:3001/dashboard>
- ListOfUsers: <http://localhost:3001/users>
