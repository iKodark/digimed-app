import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientsComponent } from './patients.component';
import { PatientsRoutingModule } from './patients.routing';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatToolbarModule, MatToolbar} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatGridListModule} from '@angular/material/grid-list';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { PipesModule } from '../pipes/pipes.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [PatientsComponent],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MatCardModule,
    MatRadioModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatGridListModule,
    NgSelectModule,
    MatAutocompleteModule,
    PipesModule,
    NgxMaskModule.forChild (),
  ]
})
export class PatientsModule { }
