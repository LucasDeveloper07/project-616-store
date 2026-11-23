import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './api';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    constructor(private http: HttpClient) {}

    public loadFeed(): Observable<any> {
        return this.http.get("http://localhost:8081/api/produto/vitrine");
    }

    public viewProduct(codigo: number): Observable<any> {
        return this.http.get(API_URL + `/produto/${codigo}`);
    }
}
