import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCarrinho } from '../model/item-carrinho';
import { Carrinho } from '../model/carrinho';
import { Pedido } from '../model/pedido';
import { ItemPedido } from '../model/item-pedido';
import { PedidoService } from '../service/pedido-service';
import { AuthService } from '../service/auth-service';

@Component({
  imports: [CommonModule],
  selector: 'app-shopping-cart',
  styleUrl: './shopping-cart.css',
  templateUrl: './shopping-cart.html'
})
export class ShoppingCart {
  mensagem: string = "";
  tipoMensagem: string = "sucesso";
  enviando: boolean = false;
  carrinho: Carrinho = new Carrinho(null);

  constructor(
    private pedidoService: PedidoService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    let json = localStorage.getItem("carrinho");

    if (json != null) {
      this.carrinho = new Carrinho(json);
    }
  }

  adicionar(item: ItemCarrinho) {
    item.qtd++;
    item.valorTotal = this.carrinho.calcItem(item);
    this.save();
  }

  diminuir(item: ItemCarrinho) {
    if (item.qtd > 1) {
      item.qtd--;
      item.valorTotal = this.carrinho.calcItem(item);
      this.save();
    }
  }

  remover(item: ItemCarrinho) {
    this.carrinho.itens = this.carrinho.itens.filter(i => i !== item);
    this.save();
  }

  finalizar() {
    if (this.carrinho.itens.length == 0) {
      return;
    }

    // O usuário deve estar logado
    const cliente = this.auth.clienteRead();
    
    if (cliente == null) {
      location.href = "./login";
      return;
    }

    // Montagem do pedido
    const pedido = new Pedido();
    pedido.codigoCliente = cliente.codigo;
    pedido.entrega = cliente.logradouro;
    pedido.valorTotal = this.carrinho.calcTotal();
    pedido.dataPedido = this.hoje();

    // itemCarrinho passa a ser itemPedido
    pedido.itens = this.carrinho.itens.map(i => {
      const item = new ItemPedido();
      item.codigoProduto = i.produto.codigo;
      item.quantidade = i.qtd;
      item.valor = i.produto.valorPromo > 0 ? i.produto.valorPromo : i.produto.valor;
      
      return item;
    });

    // persistência do pedido
    this.enviando = true;
    this.cd.detectChanges();

    this.pedidoService.gravar(pedido).subscribe({
      next: (resposta) => {
        const numero = resposta.match(/\d+$/)?.[0];

        localStorage.removeItem("carrinho");
        this.carrinho = new Carrinho(null);
        this.enviando = false;
        this.cd.detectChanges();

        this.mostrarMensagem(
          numero ? `Pedido nº ${numero} realizado com sucesso!` : "Pedido realizado com sucesso!", "sucesso"
        );
      },
      error: () => {
        this.enviando = false;
        this.mostrarMensagem("Não foi possível finalizar o pedido. Tente novamente!", "erro");
      }
    });
  }

  save() {
    this.carrinho.calcTotal();
    localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
  }

  private mostrarMensagem(texto: string, tipo: string) {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
    this.cd.detectChanges();

    setTimeout(() => {
      this.mensagem = "";
      this.cd.detectChanges();
    }, 4000);
  }

  private hoje(): string {
    const d = new Date();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');

    return `${d.getFullYear()}-${mes}-${dia}`;
  }
}