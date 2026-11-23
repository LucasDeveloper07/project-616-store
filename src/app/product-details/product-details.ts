import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { ProdutoService } from '../service/produto-service';

@Component({
  imports: [CommonModule],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  obj:Produto = new Produto();

  constructor(private service: ProdutoService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    let codigoProduto = localStorage.getItem("codigo-produto");

    if (codigoProduto != null) {
      this.service.viewProduct(Number.parseInt(codigoProduto)).subscribe({
        next: (produto) => {
          this.obj = produto;
          this.cd.detectChanges();
        }
      })
    } else {
      location.href="./feed";
    }
  }

  calcularParcela(valor:number, parcela:number): number {
    return valor / parcela;
  }
}
