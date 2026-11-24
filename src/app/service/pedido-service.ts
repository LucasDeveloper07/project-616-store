import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido';
import { API_URL } from './api';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {

    constructor(private http: HttpClient) {}

    public gravar(obj: Pedido): Observable<string> {
        return this.http.post(`${API_URL}/pedido`, obj, { responseType: 'text' });
    }

    public carregar(codigo: number): Observable<Pedido> {
        return this.http.get<Pedido>(`${API_URL}/pedido/${codigo}`);
    }

    public alterar(obj: Pedido): Observable<string> {
        return this.http.put(`${API_URL}/pedido`, obj, { responseType: 'text' });
    }

    public apagar(codigo: number): Observable<string> {
        return this.http.delete(`${API_URL}/pedido/${codigo}`, { responseType: 'text' });
    }

    public listarPorCliente(codigoCliente: number): Observable<Pedido[]> {
        return this.http.get<Pedido[]>(`${API_URL}/pedido/cliente/${codigoCliente}`);
    }
}