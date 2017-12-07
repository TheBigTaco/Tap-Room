import {Pipe, PipeTransform} from '@angular/core';
import { AppComponent, Keg } from './app.component';

@Pipe({
  name: "empty",
  pure: false
})

export class EmptyPipe implements PipeTransform {
  transform(input: Keg[]) {
    let output: Keg[] = [];
    for(let i = 0; i < input.length; i++) {
      if(input[i].empty) {
        output.push(input[i]);
      }
    }
    return output;
  }
}
