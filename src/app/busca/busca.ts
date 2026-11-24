import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../model/produto';
import { Carrinho } from '../model/carrinho';
import { ProdutoService } from '../service/produto-service';
import { BuscaService, ItemIndice, ResultadoBusca } from '../service/busca-service';

@Component({
  imports: [CommonModule],
  selector: 'app-busca',
  styleUrl: './busca.css',
  templateUrl: './busca.html',
})
export class Busca {
  private indice: ItemIndice[] = [];

  termo: string = "";
  temTermo: boolean = false;
  resultado: ResultadoBusca = { exatos: [], semelhantes: [] };

  carregando: boolean = false;
  erro: boolean = false;

  mensagem: string = "";
  tipoMensagem: string = "sucesso";
  timer: any;

  constructor(
    private produtoService: ProdutoService,
    private buscaService: BuscaService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.termo = this.route.snapshot.queryParamMap.get("termo") ?? "";

    this.produtoService.loadFeed().subscribe({
      next: (lista) => {
        this.indice = this.buscaService.indexar(lista);
        this.carregando = false;
        this.atualizarResultado();
        this.cd.detectChanges();
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
        this.cd.detectChanges();
      }
    });
  }

  verDetalhe(obj: Produto) {
    localStorage.setItem("codigo-produto", String(obj.codigo));
    location.href = "./product-details";
  }

  adicionarCarrinho(obj: Produto) {
    const carrinho = new Carrinho(localStorage.getItem("carrinho"));
    carrinho.addItem(obj);
    carrinho.calcTotal();
    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    this.mostrarMensagem("Produto adicionado ao carrinho!", "sucesso");
  }

  calcularDesconto(valor: number, valorPromo: number): number {
    const desconto = ((valor - valorPromo) / valor) * 100;
    return Math.round(desconto);
  }

  private atualizarResultado() {
    this.temTermo = this.termo.trim().length > 0;
    this.resultado = this.buscaService.buscar(this.indice, this.termo);
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
