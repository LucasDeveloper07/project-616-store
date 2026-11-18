import { Injectable, Service } from '@angular/core';
import { Produto } from '../model/produto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {

    constructor(private http: HttpClient) {}

    public loadFeed(): Observable<any> {
        return this.http.get("http://localhost:8081/api/produto/vitrine");
    }
}
