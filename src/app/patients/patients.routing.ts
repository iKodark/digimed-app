import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pacientes'
    },
    children: [
      {
        path: '',
        component: PatientsComponent,
        data: {
          title: 'Pacientes'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule {}
