import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpf'
})
export class CpfPipe implements PipeTransform {
  // return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
  transform(value: string){
    value = value.replace(/\D/gi, '');
    switch(value.length){

      case 3: 
        value = value.replace(/(\d{3})/g,"\$1.");
      
      case 6: 
        value = value.replace(/(\d{3})(\d{3})/g,"\$1.\$2.");
      
      case 9: 
        value = value.replace(/(\d{3})(\d{3})(\d{3})/gi,"\$1.\$2\.$3\-");
    }
    
    console.log(value);
    return value.substr(0, 14);
  }

}
