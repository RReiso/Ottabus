<h1 align="center">
 <br>
  <a href="https://ottabus.netlify.app/"><img src="./src/images/bus.png" alt="Red bus" width="150"></a>
  <br>
  OTTABUS
</h1>
<h3 align="center">All bus stops of Ottawa in one app!</h3>
<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-yellow" alt="TypeScript badge">
  <img src="https://img.shields.io/badge/React-blue" alt="React badge">
  <img src ="https://img.shields.io/badge/MaterialUI-pink" alt="MaterialUI badge">
  <img src ="https://img.shields.io/badge/React Testing Library-red" alt="React Testing Library badge">
</p>
<p align="center">
<img src="./public/video/ottabus.gif" width="500" alt="Demo video of Ottabus app"></p>
<h3 align="center"><a  href="https://ottabus.netlify.app/">See live</a></h3>

## Description

With constantly increasing gas prices more and more people rely on local public transportation daily. I live in Ottawa and I often use OC transpo services. This app helps fellow commuters learn what buses are coming to a particular stop and in how many minutes they will arrive. The app also shows the current location of a selected bus on an integrated Google map, as well as the current weather in Ottawa. \
While building Ottabus, I implemented mobile-first design and used Material UI for styling. This app integrates three APIs - OC Transpo API, Google Maps API and Open Weather API. It is also my first attempt at using TypeScript. \
I am constantly working on improving my testing skills and I followed the TDD approach while building Ottabus, using React Testing Library to write the tests.

## Key Features

- Responsive design
- Search trips by stop number
- Search trips by stop name
- See upcoming trips
- See in how many minutes the buses are arriving
- See the location of a selected bus on a map
- See the current weather in Ottawa

## Project Screenshots

<p align="center">
  <img src ="./public/img1.png" width="500" alt="project screenshot"></p>
 <p align="center">
  <img src="./public/img2.png" width="500" alt="project screenshot">
  </p>
 <p align="center">
  <img src="./public/img5.png" width="250" alt="project screenshot">
  <img src="./public/img6.png" width="250" alt="project screenshot">

  </p>
 <p align="center">
  <img src ="./public/img3.png" width="600" alt="project screenshot"></p>
 <p align="center">
  <img src ="./public/img4.png" width="300" alt="project screenshot"></p>

## Getting Started

1. Clone the repository:

```
git clone git@github.com:RReiso/Ottabus.git
cd Ottabus
```

2. Create the .env file by using .env.example as a reference:

```
cp .env.example .env
```

3. Update the .env file

4. Install dependencies:

```
npm install
```

5. Run the app:

```
npm start
```

6. Open http://localhost:3000 to view it in your browser.

## Dependencies

- @mui/icons-material: ^5.6.1
- @mui/material: ^5.6.1
- @react-google-maps/api: ^2.8.1
- @testing-library/jest-dom: ^5.16.2
- @testing-library/react: ^12.1.2
- @testing-library/user-event: ^13.5.0
- @types/jest: ^27.4.1
- @types/node: ^16.11.27
- @types/react: ^18.0.5
- @types/react-dom: ^18.0.1
- axios: ^0.26.1
- axios-mock-adapter: ^1.20.0
- react: ^17.0.2
- react-dom: ^17.0.2
- react-scroll-into-view: ^1.12.0
- typescript: ^4.6.3
