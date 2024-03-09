
# Pravila
 - Koristiti camelCase
 - Koristiti nazive na engleskom
 - Ne koristiti skracenice
 - Za datum i vreme koristiti epoch time,
 - Pre komitovanja izmena potrebno je pokrenuti aplikaciju i uveriti se da sve radi ispravno
 - Pre komitovanja izmena potrebano je odraditi “Reformat Code”
   - U InteliJ to se radi tako sto desnim klikom klikne na klasu sa kojom ste radili i odaberete “Reformat code” i odaberite sledece:
     - “Optimize imports”
     - “Rearrange entities”
     - “Cleanup code"
   - u VScode-u komandom Alt + Shift + F, odaberete "format on save" checkbox u settings-u, i sacuvate
     
## Workflow
- Potrebno je forkovati (fork) `dev` granu glavnog projekata u vase lokalne repozitorijume i da radite na svom forku
- Kada hocete da odratite merge sa glavnim projektom potrebno je da kreirate `Pull request` sa vaseg forka i da izaberete da hocete da mergujete sa `dev` granom glavnog projeta




# Banka2Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
