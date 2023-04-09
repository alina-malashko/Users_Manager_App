import { UserName } from './../interfaces/user.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'username',
})
export class UserNamePipe implements PipeTransform {
  transform(value: UserName) {
    let result = Object.values(value);
    return result.join(' ');
  }
}
