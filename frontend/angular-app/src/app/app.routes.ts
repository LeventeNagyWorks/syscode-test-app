import { Routes } from '@angular/router';
import { AddressListComponent } from './components/addresses/address-list/address-list.component';
import { AddressDetailComponent } from './components/addresses/address-detail/address-detail.component';
import { AddressFormComponent } from './components/addresses/address-form/address-form.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addresses', component: AddressListComponent },
  { path: 'addresses/new', component: AddressFormComponent },
  { path: 'addresses/:id', component: AddressDetailComponent },
  { path: 'addresses/:id/edit', component: AddressFormComponent },
  { path: '**', redirectTo: '' }
];