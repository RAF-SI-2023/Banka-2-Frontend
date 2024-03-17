import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appNoPaste]'
})
export class NoPasteDirective {

  constructor() { }

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    // Prevent default paste behavior
    event.preventDefault();
  }

}
