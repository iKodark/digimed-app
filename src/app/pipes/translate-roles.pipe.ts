import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateRoles'
})
export class TranslateRolesPipe implements PipeTransform {

  transform(value: string){
    
    switch(value) {
      case 'doctor': return 'Doutor';
      case 'nurse': return 'Enfermeiro';
      case 'receptionist': return 'Recepcionista';
    }

    return null;
  }

}
