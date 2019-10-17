# Color Picker 

A random hex-code generator that allows a user to create projects and save palettes to projects. 

- Data is requested from [color-picker-api](https://github.com/djavanm/color-picker-api), which is deployed to [heroku](https://color-picker-api.herokuapp.com/).
- Created with React and React Route, utilizing jest and enzyme for testing. 

The app allows user to login or create a new account. Once logged in the user will be able to generate random hexcodes and in the event they find one they like there is an option to save a palette. If the user chooses to save a palette they must first create a project and once a project is created the palette will be saved, this can happen simultaneously. A user can create as many palettes as they would like and assign them to new or existing projects. The users projects and palettes. The user can utilze a button to logout, see all palettes, and lock hex-codes they like.

# Technology
  - React
  - React Router
  - Jest
  - Enzyme

## Setup
  - Deployed on [Heroku](https://color-picker-ui.herokuapp.com/)

  - Locally
    1. clone down the repository
    2. npm install
    3. npm start
    4. Visit: http://localhost:3000/

  - Testing
    - npm test

## Developers
 - Djavan Munroe [@CLLane](https://github.com/djavanm)
 - Chris Lane [@djavanm](https://github.com/CLLane)

## Screenshots
![](src/Images/LoginScreen.png)
![](src/Images/HomeScreen.png)
