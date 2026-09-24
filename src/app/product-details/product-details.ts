import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';

@Component({
  imports: [CommonModule],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  obj:Produto = new Produto();

  ngOnInit() {
    let json = localStorage.getItem("produto");

    if (json != null) {
      this.obj = JSON.parse(json);
    } else {
      location.href="./feed";
    }
  }

  calcularParcela(valor:number, parcela:number): number {
    return valor / parcela;
  }
}
