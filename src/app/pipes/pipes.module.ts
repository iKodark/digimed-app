import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterArrayObjectsPipe } from './filter-array-objects.pipe';



@NgModule({
  declarations: [
    FilterArrayObjectsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterArrayObjectsPipe
  ]
})
export class PipesModule { }
