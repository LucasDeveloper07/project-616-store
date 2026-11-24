import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Pedido } from '../model/pedido';
import { ItemPedido } from '../model/item-pedido';
import { PedidoService } from '../service/pedido-service';
import { ProdutoService } from '../service/produto-service';
import { AuthService } from '../service/auth-service';

@Component({
  imports: [CommonModule],
  selector: 'app-meus-pedidos',
  styleUrl: './meus-pedidos.css',
  templateUrl: './meus-pedidos.html',
})
export class MeusPedidos {
  pedidos: Pedido[] = [];
  carregando: boolean = true;
  erro: boolean = false;

  private nomes = new Map<number, string>();

  constructor(
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
    private auth: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const cliente = this.auth.clienteRead();

    if (cliente == null) {
      location.href = "./login";
      return;
    }

    forkJoin({
      pedidos: this.pedidoService.listarPorCliente(cliente.codigo),
      produtos: this.produtoService.loadFeed()
    }).subscribe({
      next: ({ pedidos, produtos }) => {
        produtos.forEach(p => this.nomes.set(p.codigo, p.nome));
        this.pedidos = pedidos;
        this.carregando = false;
        this.cd.detectChanges();
      },
      error: () => {
        this.erro = true;
        this.carregando = false;
        this.cd.detectChanges();
      }
    });
  }

  nomeProduto(codigo: number): string {
    return this.nomes.get(codigo) ?? "Produto #" + codigo;
  }

  subtotal(item: ItemPedido): number {
    return item.quantidade * item.valor;
  }

  totalItens(pedido: Pedido): number {
    return pedido.itens.reduce((soma, i) => soma + i.quantidade, 0);
  }
}
