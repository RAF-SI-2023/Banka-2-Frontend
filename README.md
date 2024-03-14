# Banka-2: Frontend
## Pravila
- Koristiti camelCase
- Ne koristiti skraćenice u kodu
- Koristiti nazive na engleskom jeziku u kodu; prevesti ili transkribovati na srpski jezik za izgled
- Koristiti epoch time za datum i vreme u kodu; prebaciti ga u yyyy-MM-dd HH:mm:ss standard za izgled
- Pre commit-ovanja izmena potrebno je:
  - pokrenuti aplikaciju i uveriti se da sve radi ispravno
  - odraditi formatiranje koda:
    - U InteliJ: komanda `CTRL + ALT + L` nad otvorenim fajlom, ili desni klik nad direktorijumom ili klasom i odabirom opcije `Reformat Code`, gde se štiklira sledeće:
      - `Optimize imports`
      - `Rearrange entities`
      - `Cleanup code`
    - u VSCode: komanda `ALT + SHIFT + F` nad otvorenim fajlom, ili u opcijama štiklirati `Format on Save`, koji kada sačuvate fajl sa CTRL + S ujedno ga i formatira
     
### Workflow: pogledati [vežbe2](https://learning.raf.edu.rs/mod/url/view.php?id=22203), [vežbe3](https://video.raf.edu.rs/stream.php?video=pLpaQR%2FYY%2FWtiUv0Wc%2BZqKKg9Y%2Ff%2BCPUns7Ny4LL0AdM7dVrVj2fLMkGJxz5sNiuXpS0FLZl8q1XXF7y2eP5irdsubKDUtAXvb9u66UvYVI14l%2FiP%2Bo3QrOCY31RZYeTKR8l0XIVN61xb0NPuoreEDuizA0Od4XXRXwx1Gv8uDmEooaQZrKrunRG9CSHdgY3&file=video.mp4), [GitHub prezentaciju](https://docs.google.com/presentation/d/1ehKYiWcBT7fCFnmboQ1N0RgnHzhgfs6xhIym-Ss3v-w/edit#slide=id.p)
- Potrebno je fork-ovati `dev` granu glavnog projekata u vaše lokalne repozitorijume i da radite na svom fork-u
- Kada hoćete da dovučete izmene sa remote repozitorijuma (`dev` grana glavnog projekta) u vaše lokalne repozitorijume, treba da odradite komandu `git pull upstream` gde `upstream` predstavlja referencu na remote repozitorijum (`dev` grana glavnog projekta)
- **Kada hoćete da odradite merge sa glavnim projektom (npr. završili ste issue ili jednu celinu), potrebno je da uradite prethodno navedenu stavku, popravite moguće konflikte, pa kreirate `Pull request` sa vašeg fork-a i da izaberete da hoćete da merge-ujete sa `dev` granom glavnog projekta**

## Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
