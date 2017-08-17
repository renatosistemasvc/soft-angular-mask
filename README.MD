# mask to input Angular 2+ 

## Description

Directive to masquerade input in angular 2/4 (money and number).

## Demo

<a href="http://www.renatodev.com.br/">DEMO</a>

## Example mask

(087) 8745-9876 - 76888-098 - R$ 1.234,00 - $ 1.00

## Installation

To install this library, run:

```bash
$ npm install soft-angular-mask --save
```
and then from your Angular `AppModule`:

```typescript
...

// Import library
import { MaskModule } from 'soft-angular-mask';

@NgModule({
  ...
  imports: [

    MaskModule

  ],
  ...
})
export class AppModule { }
```

Use in your Angular application:

```xml
<!-- in html -->

<input mask-number [mask]="'99999-999'" name="valCode" [(ngModel)]="valCode">

<input mask-number [mask]="'(99) 999999999'" [reqMin]="13" name="valPhone" [(ngModel)]="valPhone">
   
<input mask-money [prefix]="'R$'" name="valMoney" [(ngModel)]="valMoney">

```

## Options - mask-number

```xml
[mask]="'9'"  <!-- '9' - represents a number -->
[reqMin]="1"  <!-- minimum size to mask -->
```

## Options - mask-money

```xml
[prefix]="'R$'"  <!-- printed before value -->
```

## License

MIT © [Renato Souza de Oliveira](mailto:renatosistemas.vc@gmail.com)
email: mailto:renatosistemas.vc@gmail.com
