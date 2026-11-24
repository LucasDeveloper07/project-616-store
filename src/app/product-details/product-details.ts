import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Carrinho } from '../model/carrinho';
import { ProdutoService } from '../service/produto-service';

@Component({
  imports: [CommonModule],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  obj:Produto = new Produto();
  qtd: number = 1;
  carregando: boolean = true;
  naoEncontrado: boolean = false;

  mensagem: string = "";
  tipoMensagem: string = "sucesso";
  timer: any;

  constructor(private service: ProdutoService, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    let codigoProduto = localStorage.getItem("codigo-produto");

    if (codigoProduto != null) {
      this.service.viewProduct(Number.parseInt(codigoProduto)).subscribe({
        next: (produto) => {
          if (produto.codigo > 0) {
            this.obj = produto;
          } else {
            this.naoEncontrado = true;
          }

          this.carregando = false;
          this.cd.detectChanges();
        },
        error: () => {
          this.carregando = false;
          this.mostrarMensagem("Ocorreu um erro, tente novamente mais tarde!", "erro");
        }
      });
    } else {
      location.href="./feed";
    }
  }

  aumentar() {
    if (this.qtd < this.obj.quantidade) {
      this.qtd++;
    }
  }

  diminuir() {
    if (this.qtd > 1) {
      this.qtd--;
    }
  }

  adicionarCarrinho() {
    this.colocarNoCarrinho();
    this.mostrarMensagem("Produto adicionado ao carrinho!", "sucesso");
  }

  comprarAgora() {
    this.colocarNoCarrinho();
    location.href = "./shopping-cart";
  }

  calcularParcela(valor:number, parcela:number): number {
    return valor / parcela;
  }

  private colocarNoCarrinho() {
    const carrinho = new Carrinho(localStorage.getItem("carrinho"));
    carrinho.addItem(this.obj, this.qtd);
    carrinho.calcTotal();
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }

  private mostrarMensagem(texto: string, tipo: string) {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    this.cd.detectChanges();

    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.mensagem = "";
      this.cd.detectChanges();
    }, 3000);
  }
}
