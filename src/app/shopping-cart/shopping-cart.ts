import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCarrinho } from '../model/item-carrinho';
import { Carrinho } from '../model/carrinho';

@Component({
  imports: [CommonModule],
  selector: 'app-shopping-cart',
  styleUrl: './shopping-cart.css',
  templateUrl: './shopping-cart.html'
})
export class ShoppingCart {
  /*
  mensagem: string = "";
  valorCarrinho: number = 0;
  lista: ItemCarrinho[] = [
    {
      "produto": {
        "codigo": 1,
        "nome": "Funko Pop! Homem-Aranha",
        "descritivo": "Funko Pop do Homem-Aranha inspirado no universo Marvel.",
        "valor": 129.90,
        "valorPromo": 0,
        "quantidade": 15,
        "destaque": 1,
        "keywords": "funko, pop, homem-aranha, spider-man, marvel"
      },
      "qtd": 2,
      "valorTotal": 259.80
    },
    {
      "produto": {
        "codigo": 3,
        "nome": "Funko Pop! Deadpool",
        "descritivo": "Funko Pop do Deadpool, um dos personagens mais irreverentes da Marvel.",
        "valor": 149.90,
        "valorPromo": 129.90,
        "quantidade": 10,
        "destaque": 1,
        "keywords": "funko, pop, deadpool, marvel"
      },
      "qtd": 1,
      "valorTotal": 129.90
    },
    {
      "produto": {
        "codigo": 5,
        "nome": "Action Figure Homem-Aranha",
        "descritivo": "Action figure articulado do Homem-Aranha com detalhes inspirados nos quadrinhos.",
        "valor": 249.90,
        "valorPromo": 219.90,
        "quantidade": 8,
        "destaque": 1,
        "keywords": "action figure, homem-aranha, spider-man, marvel"
      },
      "qtd": 1,
      "valorTotal": 219.90
    },
    {
      "produto": {
        "codigo": 15,
        "nome": "Camiseta Homem de Ferro",
        "descritivo": "Camiseta temática do Homem de Ferro com estampa inspirada no personagem.",
        "valor": 89.90,
        "valorPromo": 69.90,
        "quantidade": 22,
        "destaque": 1,
        "keywords": "camiseta, roupa, homem de ferro, iron man, marvel"
      },
      "qtd": 2,
      "valorTotal": 139.80
    },
    {
      "produto": {
        "codigo": 13,
        "nome": "Caneca Homem-Aranha",
        "descritivo": "Caneca temática do Homem-Aranha para fãs do universo Marvel.",
        "valor": 49.90,
        "valorPromo": 39.90,
        "quantidade": 30,
        "destaque": 0,
        "keywords": "caneca, acessorio, homem-aranha, spider-man, marvel"
      },
      "qtd": 3,
      "valorTotal": 119.70
    }
  ];

  calcularTotal(): number {
    let num = 0;

    for (let obj of this.lista) {
      num += obj.valorTotal;
    }

    return num;
  }
  */

  mensagem: string = "";
  carrinho: Carrinho = new Carrinho(null);

  ngOnInit() {
    let json = localStorage.getItem("carrinho");

    if (json != null) {
      this.carrinho = new Carrinho(json);
    } else {
      this.mensagem = "Seu carrinho está vazio!";
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

  save() {
    this.carrinho.calcTotal();
    localStorage.setItem("carrinho", JSON.stringify(this.carrinho));
  }
}