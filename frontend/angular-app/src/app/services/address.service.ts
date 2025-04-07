import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = 'http://localhost:3001/addresses';
  
  // Add basic auth credentials - using the exact credentials from your BasicStrategy
  private createAuthHeaders(): HttpHeaders {
    const username = 'admin';
    const password = 'admin';
    const authString = `${username}:${password}`;
    const base64Auth = btoa(authString);
    
    return new HttpHeaders({
      'Authorization': `Basic ${base64Auth}`
    });
  }
  
  constructor(private http: HttpClient) {}

  getAddresses(page: number = 1, pageSize: number = 100): Observable<Address[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', pageSize.toString());
     
    return this.http.get<Address[]>(this.apiUrl, { 
      params,
      headers: this.createAuthHeaders()
    });
  }

  getAddressCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`, {
      headers: this.createAuthHeaders()
    });
  }

  getAddress(id: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/${id}`, {
      headers: this.createAuthHeaders()
    });
  }

  createAddress(address: Omit<Address, 'id'>): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address, {
      headers: this.createAuthHeaders()
    });
  }

  updateAddress(id: string, address: Omit<Address, 'id'>): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/${id}`, address, {
      headers: this.createAuthHeaders()
    });
  }

  deleteAddress(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.createAuthHeaders()
    });
  }

  getAddressesByProfileId(profileId: string, page: number = 1, pageSize: number = 100): Observable<Address[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', pageSize.toString());
      
    return this.http.get<Address[]>(`${this.apiUrl}/profile/${profileId}`, {
      params,
      headers: this.createAuthHeaders()
    });
  }

  getAddressByProfileId(profileId: string): Observable<Address> {
    return this.http.get<Address>(`${this.apiUrl}/profile/${profileId}/single`, {
      headers: this.createAuthHeaders()
    });
  }

}
