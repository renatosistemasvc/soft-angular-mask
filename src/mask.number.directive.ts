import { Directive, Input, ElementRef, Inject, Provider, forwardRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const MASK: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MaskNumberDirective),
  multi: true
}

@Directive({
  selector: '[mask-number]',
  host: {
    '(input)': 'input($event.target.value, $event.target)',
    '(blur)': 'focusout()'
  },
  providers: [MASK]
})

export class MaskNumberDirective {
    
  @Input('mask') mascara: string;
  @Input('reqMin') qtdRequiredMin: number;

  constructor(@Inject(Renderer) private renderer: Renderer, @Inject(ElementRef) private element: ElementRef) { }

  writeValue(value: any) {
    
    if (value === undefined || value === null) {
    
      this.propagateChange(null);
      this.renderer.setElementProperty(this.element.nativeElement, 'value', '');
            
    }else{
  
      this.input(value);
  
    }

  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  input(val, event?){
      
      let mascared:string = '';
      let unmask = val.toString().replace(new RegExp(/[^\d]/, 'g'), '');
      
      let c = 0;

      for(let i = 0; (i < this.mascara.length) && (c < unmask.length); i++) {
          
          if(this.mascara.slice(i, i+1) == '9'){
            
            mascared += unmask.slice(c, c+1);
            c++;

          }else{

            mascared += this.mascara.slice(i, i+1);
            
          }
      }

      this.propagateChange(mascared);
      this.renderer.setElementProperty(this.element.nativeElement, 'value', mascared)
      

      setTimeout(function(){

        if(event !== undefined)
          event.setSelectionRange(mascared.length, mascared.length);
      
      }, 0);

  }

  focusout(){

    let valCurrentField: string = (this.element.nativeElement.value == undefined) ? '' : this.element.nativeElement.value;
      
    if(typeof this.qtdRequiredMin !== 'undefined' && valCurrentField.length < this.qtdRequiredMin){
      
        this.propagateChange(null);
        this.renderer.setElementProperty(this.element.nativeElement, 'value', '')
        
    }else if(typeof this.qtdRequiredMin === 'undefined' && valCurrentField.length != this.mascara.length){

        this.propagateChange(null);
        this.renderer.setElementProperty(this.element.nativeElement, 'value', '')
    }

  }
  
}
