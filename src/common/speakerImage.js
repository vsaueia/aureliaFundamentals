import {customAttribute, inject} from 'aurelia-framework';

@inject(Element)
@customAttribute('speaker-img')
export class SpeakerImageCustomAttribute {
  constructor(element) {
    this.element = element;
    console.debug(this.element);
  }

  valueChanged(newValue) {
    console.debug('valueChanged');
    this.element.src = 'images/speakers/'+newValue;
  }

  bind(bindingContext) {
    console.debug('bind');
    this.valueChanged(this.value);
  }
}
