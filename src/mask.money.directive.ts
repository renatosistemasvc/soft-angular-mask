import { Directive, Input, ElementRef, Inject, Provider, forwardRef, Renderer } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const MONEY: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MaskMoneyDirective),
  multi: true
}

@Directive({
  selector: '[mask-money]',
  host: {
    '(input)': 'input($event.target.value, $event.target)',
  },
  providers: [MONEY]
})

export class MaskMoneyDirective implements ControlValueAccessor {

  @Input('prefix') prefix: string;

  constructor(@Inject(Renderer) private renderer: Renderer, @Inject(ElementRef) private element: ElementRef) { }

  writeValue(value: any) {
    
    if (value === undefined || value === null) {
    
      this.propagateChange(null);
      this.renderer.setElementProperty(this.element.nativeElement, 'value', '');
            
    }else{
  
      value = value.toString();
      value = (value.indexOf(".") >= 0) ? (value.length == 3) ? value+'0' : value : value+'00';
      this.input(value);
  
    }

  }

  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  input(val, event?){

    if(val.toString() === '0')
    {
      this.propagateChange('0');
      this.renderer.setElementProperty(this.element.nativeElement, 'value', this.prefix+' 0,00');
      return true;
    }

    let unmask = val.toString().replace(new RegExp(/[^\d]/, 'g'), '').replace(/^0+/, '');
    
    if(unmask.length == 0)
    {
      this.propagateChange(null);
      this.renderer.setElementProperty(this.element.nativeElement, 'value', '');
      return true;
    }

    if(unmask.length == 1)
      unmask = '00'+unmask;

    if(unmask.length == 2)
      unmask = '0'+unmask;

      
    let dec = unmask.slice(unmask.length-2, unmask.length);
    let mil = unmask.slice(0, unmask.length-2);

    let cont = 0;
    let ref = '';
    for(let i = mil.length; i > 0; i--) {

        if(cont == 2 && i > 1)
        {
        
          ref = '.'+mil.slice(i-1, i) + ref;
          cont = 0; 
        
        }else{ 
        
          ref = mil.slice(i-1, i) + ref;
          cont ++;
        }
    }

    let mascared = this.prefix+' '+ref +','+ dec;

    this.propagateChange(mil +'.'+ dec);
    this.renderer.setElementProperty(this.element.nativeElement, 'value', mascared);
    
  
    setTimeout(function(){

      if (event !== undefined)
         event.setSelectionRange(mascared.length, mascared.length);
    
    }, 0);
       
}

  
}
