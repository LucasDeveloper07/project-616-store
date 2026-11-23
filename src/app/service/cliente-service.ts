import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api';
import { Cliente } from '../model/cliente';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    constructor(private http: HttpClient) {}

    public cadastrar(obj: Cliente): Observable<string> {
        return this.http.post(`${API_URL}/cliente`, obj, { responseType: 'text' });
    }

    public login(email: string, senha: string): Observable<Cliente> {
        return this.http.post<Cliente>(`${API_URL}/cliente/login`, { email, senha });
    }

    public carregar(codigo: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${API_URL}/cliente/${codigo}`);
    }

    public alterar(obj: Cliente): Observable<string> {
        return this.http.put(`${API_URL}/cliente`, obj, { responseType: 'text' });
    }
}
