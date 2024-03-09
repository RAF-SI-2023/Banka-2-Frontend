
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
     
## Workflow - pogledati [vezbe2](https://learning.raf.edu.rs/mod/url/view.php?id=22203), [vezbe3](https://video.raf.edu.rs/stream.php?video=pLpaQR%2FYY%2FWtiUv0Wc%2BZqKKg9Y%2Ff%2BCPUns7Ny4LL0AdM7dVrVj2fLMkGJxz5sNiuXpS0FLZl8q1XXF7y2eP5irdsubKDUtAXvb9u66UvYVI14l%2FiP%2Bo3QrOCY31RZYeTKR8l0XIVN61xb0NPuoreEDuizA0Od4XXRXwx1Gv8uDmEooaQZrKrunRG9CSHdgY3&file=video.mp4), [Github prezentaciju](https://docs.google.com/presentation/d/1ehKYiWcBT7fCFnmboQ1N0RgnHzhgfs6xhIym-Ss3v-w/edit#slide=id.p)
- Potrebno je forkovati (fork) `dev` granu glavnog projekata u vase lokalne repozitorijume i da radite na svom forku
- Kada hocete da odradite merge sa glavnim projektom potrebno je da kreirate `Pull request` sa vaseg forka i da izaberete da hocete da mergujete sa `dev` granom glavnog projeta
- Kada hocete da dovucete izmene sa remote repozitorijuma (`dev` grana glavnog projekta) u vase lokalne repozitorijume treba da odradite komandu `git pull upstream` gde `upstrem` redstavlja referencu na remote repozitorijum (`dev` grana glavnog projekta)
----



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
