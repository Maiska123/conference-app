


> My friend asked me to help him on a pre-job-interview -task, and i delivered... maybe too much(?)

hence why born,

# ConferenceApp  <img src="demo/demo.gif" width="300" height="250"/>

Angular based application to show current date meeting in a specific "room" (*repository doesn't include backend or database-schemas)

| Frontend | (Used backend*) | (Used database*) | Tested On |
|--|--|--|--|
| ![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white) | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) | ![MicrosoftSQLServer](https://img.shields.io/badge/Microsoft%20SQL%20Sever-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white) | ![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white) |


![mainscreen1](demo/conference-calendar-main-screen-1.jpg)




https://user-images.githubusercontent.com/42906162/199672322-f0c88e39-a0e5-4c64-801b-40a1f0e66a9a.mp4


## !! Huomioita työssä !!

1. kesä ja talviaikakäsittely hardcoodattua - 3600 sekuntia missä käytetäänkään

2. tapahtumien päivitys ei tapahdu ellei näkymä refreshaa ( tähän käsittelyyn pitäisi tehdä vakiopolleri frontendiin, joko  pollataan tapahtumanmuutos bittiä tai kokonaan aina uutta meetings arrayta)

3. testiä varten hypätään http://localhost:4200/dashboard/{roomId}

4. RoomId voi olla 1 - (kuinka monelle huoneelle on dataa kannassa...)

5. Kellonaika on synkronoitu kaikkien näkymäosien kanssa time servicellä

6. tapahtumat eivät ole vielä synkronoitu koska tämä aiempi käsittely niiden päivittämiselle on 404

7. jos tapahtumia on, niin vähimmäisvaatimus on 
	* otsikko ja 
	* järjestäjä sekä 
	* alku että päättymisaika

8. huoneella täytyy olla 
	* nimi


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

its' good to have 
`Typescript and Angular` globally installed to dev
`npm install -g typescript`
`npm install -g @angular/cli`

for development used libraries
`npm install --save @angular/cdk`
`npm install --save @angular/material`
`npm install --save @angular/animations`

run 
`npm install`
to init this projekt


## Development server - TESTING LOCALLY!

go to `cd .\conference-app\` and then

Run `ng serve --disable-host-check --open` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
