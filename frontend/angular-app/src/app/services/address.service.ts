import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:3001/addresses'; // Address service URL
  private username = 'admin';
  private password = 'admin';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const authHeader = 'Basic ' + btoa(`${this.username}:${this.password}`);
    return new HttpHeaders({
      'Authorization': authHeader
    });
  }

  getAddress(id: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  createAddress(address: Omit<Address, 'id'>): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address, { headers: this.getAuthHeaders() });
  }

  updateAddress(id: string, address: Omit<Address, 'id'>): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/${id}`, address, { headers: this.getAuthHeaders() });
  }

  deleteAddress(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
