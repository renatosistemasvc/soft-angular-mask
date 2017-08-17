import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaskNumberDirective } from './mask.number.directive';
import { MaskMoneyDirective } from './mask.money.directive';

export * from './mask.number.directive';
export * from './mask.money.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MaskNumberDirective,
    MaskMoneyDirective
  ],
  exports: [
    MaskNumberDirective,
    MaskMoneyDirective
  ]
})
export class MaskModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaskModule
    };
  }
}

