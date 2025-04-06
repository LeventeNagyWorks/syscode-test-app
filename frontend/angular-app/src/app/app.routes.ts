import { Routes } from '@angular/router';
import { AddressListComponent } from './components/addresses/address-list/address-list.component';
import { AddressDetailComponent } from './components/addresses/address-detail/address-detail.component';
import { AddressFormComponent } from './components/addresses/address-form/address-form.component';
import { StudentListComponent } from './components/students/student-list/student-list.component';
import { StudentDetailComponent } from './components/students/student-detail/student-detail.component';
import { StudentFormComponent } from './components/students/student-form/student-form.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  
  { path: 'addresses', component: AddressListComponent },
  { path: 'addresses/new', component: AddressFormComponent },
  { path: 'addresses/:id', component: AddressDetailComponent },
  { path: 'addresses/:id/edit', component: AddressFormComponent },
  
  { path: 'students', component:  StudentListComponent },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/:id', component: StudentDetailComponent },
  { path: 'students/:id/edit', component: StudentFormComponent },

  { path: '**', redirectTo: '' },
];