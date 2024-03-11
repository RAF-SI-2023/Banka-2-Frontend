import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appBankAccountMask]'
})
export class BankAccountMaskDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    let maskedValue = '';

    // Apply mask (###-####-#########)
    for (let i = 0; i < value.length; i++) {
      if (i === 3 || i === 7) {
        maskedValue += '-';
      }
      maskedValue += value[i];
    }

    input.value = maskedValue;
  }
}
