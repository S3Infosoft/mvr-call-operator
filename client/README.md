# React-coreui-docker
Compliance Dashboard App

##  Features
- User Authentication, listing all registered users and display Compliance dashboard.

#### Steps for building App
- Go to the project directory
  ```
  cd react-coreui-docker
  ```
- Install the Create-React-App template
  ```
  npx create-react-app .
  ```
  (or)
  ```
  yarn create react-app .
  ```
- Build the Docker image
  ```
  docker build .
  ```
- Containarize the app using docker-compose
  ```
  docker-compose build
  ```

#### To run the server
  ```
  docker-compose up
  ```

#### To register for app access.
- You need to contact your supervisor, who can add your account in Okta for necessary permissions to access the app. Supervior can visit following link, connect to their developer account and add the users who needed the access. 
  <https://developer.okta.com/>
- Go to login page and provide your credentials at the login screen.
  <http://localhost:3001/login>

#### To run the tests
- Go the respective project directory and run following command to run the test scripts
  ```
  npm test
  ```


### List of Links in the Applicaiton
- HomePage: <http://localhost:3001/staff>
- Dashboard: <http://localhost:3001/dashboard>
- ListOfUsers: <http://localhost:3001/user>
