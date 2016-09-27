import {customAttribute, inject} from 'aurelia-framework';

@inject(Element)
@customAttribute('speaker-img')
export class SpeakerImageCustomAttribute {
  construcor(element) {
    this.element = element;
  }

  valueChanged(newValue) {
    this.element.src = 'images/speakers/'+newValue;
  }

  bind(bindingContext) {
    this.valueChanged(this.value);
  }
}
