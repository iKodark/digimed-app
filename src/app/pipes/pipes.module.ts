import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterArrayObjectsPipe } from './filter-array-objects.pipe';
import { CpfPipe } from './masks/cpf.pipe';
import { TranslateRolesPipe } from './translate-roles.pipe';



@NgModule({
  declarations: [
    FilterArrayObjectsPipe,
    CpfPipe,
    TranslateRolesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterArrayObjectsPipe,
    CpfPipe,
    TranslateRolesPipe
  ]
})
export class PipesModule { }
