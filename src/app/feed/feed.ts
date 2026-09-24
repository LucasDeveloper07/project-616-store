import { Component } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-feed',
  styleUrl: './feed.css',
  templateUrl: './feed.html',
})

export class Feed {
  lista: Produto [] = [
    {
      "codigo": 1,
      "nome": "Funko Pop! Homem-Aranha",
      "descritivo": "Funko Pop do Homem-Aranha inspirado no universo Marvel.",
      "valor": 129.90,
      "valorPromo": 109.90,
      "quantidade": 15,
      "destaque": 1,
      "keywords": "funko, pop, homem-aranha, spider-man, marvel"
    },
    {
      "codigo": 2,
      "nome": "Funko Pop! Homem de Ferro",
      "descritivo": "Funko Pop do Homem de Ferro com design inspirado nos filmes da Marvel.",
      "valor": 139.90,
      "valorPromo": 119.90,
      "quantidade": 12,
      "destaque": 1,
      "keywords": "funko, pop, homem de ferro, iron man, marvel"
    },
    {
      "codigo": 3,
      "nome": "Funko Pop! Deadpool",
      "descritivo": "Funko Pop do Deadpool, um dos personagens mais irreverentes da Marvel.",
      "valor": 149.90,
      "valorPromo": 129.90,
      "quantidade": 10,
      "destaque": 1,
      "keywords": "funko, pop, deadpool, marvel"
    },
    {
      "codigo": 4,
      "nome": "Funko Pop! Groot",
      "descritivo": "Funko Pop do Groot, personagem dos Guardiões da Galáxia.",
      "valor": 119.90,
      "valorPromo": 99.90,
      "quantidade": 20,
      "destaque": 0,
      "keywords": "funko, pop, groot, guardioes da galaxia, marvel"
    },
    {
      "codigo": 5,
      "nome": "Action Figure Homem-Aranha",
      "descritivo": "Action figure articulado do Homem-Aranha com detalhes inspirados nos quadrinhos.",
      "valor": 249.90,
      "valorPromo": 219.90,
      "quantidade": 8,
      "destaque": 1,
      "keywords": "action figure, homem-aranha, spider-man, marvel"
    },
    {
      "codigo": 6,
      "nome": "Action Figure Capitão América",
      "descritivo": "Action figure articulado do Capitão América acompanhado de seu escudo.",
      "valor": 279.90,
      "valorPromo": 239.90,
      "quantidade": 7,
      "destaque": 1,
      "keywords": "action figure, capitao america, captain america, marvel"
    },
    {
      "codigo": 7,
      "nome": "Action Figure Thor",
      "descritivo": "Action figure do Thor com detalhes inspirados no personagem da Marvel.",
      "valor": 299.90,
      "valorPromo": 259.90,
      "quantidade": 5,
      "destaque": 0,
      "keywords": "action figure, thor, mjolnir, marvel"
    },
    {
      "codigo": 8,
      "nome": "Action Figure Wolverine",
      "descritivo": "Action figure articulado do Wolverine com suas tradicionais garras.",
      "valor": 289.90,
      "valorPromo": 249.90,
      "quantidade": 6,
      "destaque": 1,
      "keywords": "action figure, wolverine, x-men, marvel"
    },
    {
      "codigo": 9,
      "nome": "HQ Homem-Aranha",
      "descritivo": "História em quadrinhos apresentando uma aventura do Homem-Aranha.",
      "valor": 49.90,
      "valorPromo": 39.90,
      "quantidade": 25,
      "destaque": 0,
      "keywords": "hq, homem-aranha, spider-man, quadrinhos, marvel"
    },
    {
      "codigo": 10,
      "nome": "HQ Vingadores",
      "descritivo": "História em quadrinhos com uma aventura dos principais heróis dos Vingadores.",
      "valor": 54.90,
      "valorPromo": 44.90,
      "quantidade": 18,
      "destaque": 1,
      "keywords": "hq, vingadores, avengers, quadrinhos, marvel"
    },
    {
      "codigo": 11,
      "nome": "HQ X-Men",
      "descritivo": "História em quadrinhos apresentando uma aventura dos mutantes da equipe X-Men.",
      "valor": 59.90,
      "valorPromo": 49.90,
      "quantidade": 14,
      "destaque": 0,
      "keywords": "hq, x-men, wolverine, mutantes, quadrinhos, marvel"
    },
    {
      "codigo": 12,
      "nome": "HQ Guerra Civil",
      "descritivo": "Edição em quadrinhos baseada no clássico conflito entre os heróis da Marvel.",
      "valor": 89.90,
      "valorPromo": 74.90,
      "quantidade": 9,
      "destaque": 1,
      "keywords": "hq, guerra civil, civil war, capitao america, homem de ferro, marvel"
    },
    {
      "codigo": 13,
      "nome": "Caneca Homem-Aranha",
      "descritivo": "Caneca temática do Homem-Aranha para fãs do universo Marvel.",
      "valor": 49.90,
      "valorPromo": 39.90,
      "quantidade": 30,
      "destaque": 0,
      "keywords": "caneca, acessorio, homem-aranha, spider-man, marvel"
    },
    {
      "codigo": 14,
      "nome": "Chaveiro do Capitão América",
      "descritivo": "Chaveiro inspirado no icônico escudo do Capitão América.",
      "valor": 29.90,
      "valorPromo": 24.90,
      "quantidade": 40,
      "destaque": 0,
      "keywords": "chaveiro, acessorio, capitao america, escudo, marvel"
    },
    {
      "codigo": 15,
      "nome": "Camiseta Homem de Ferro",
      "descritivo": "Camiseta temática do Homem de Ferro com estampa inspirada no personagem.",
      "valor": 89.90,
      "valorPromo": 69.90,
      "quantidade": 22,
      "destaque": 1,
      "keywords": "camiseta, roupa, homem de ferro, iron man, marvel"
    },
    {
      "codigo": 16,
      "nome": "Mochila Marvel Avengers",
      "descritivo": "Mochila temática dos Vingadores com design inspirado no universo Marvel.",
      "valor": 159.90,
      "valorPromo": 139.90,
      "quantidade": 11,
      "destaque": 0,
      "keywords": "mochila, acessorio, vingadores, avengers, marvel"
    },
    {
      "codigo": 17,
      "nome": "Funko Pop! Loki",
      "descritivo": "Funko Pop do Loki, um dos personagens mais conhecidos do universo Marvel.",
      "valor": 139.90,
      "valorPromo": 119.90,
      "quantidade": 13,
      "destaque": 1,
      "keywords": "funko, pop, loki, marvel"
    },
    {
      "codigo": 18,
      "nome": "Funko Pop! Venom",
      "descritivo": "Funko Pop do Venom com seu visual característico.",
      "valor": 149.90,
      "valorPromo": 129.90,
      "quantidade": 9,
      "destaque": 1,
      "keywords": "funko, pop, venom, homem-aranha, marvel"
    },
    {
      "codigo": 19,
      "nome": "Action Figure Hulk",
      "descritivo": "Action figure articulado do Hulk com acabamento detalhado.",
      "valor": 269.90,
      "valorPromo": 229.90,
      "quantidade": 6,
      "destaque": 0,
      "keywords": "action figure, hulk, vingadores, avengers, marvel"
    },
    {
      "codigo": 20,
      "nome": "Caderno Marvel",
      "descritivo": "Caderno temático Marvel ideal para estudos, anotações e desenhos.",
      "valor": 39.90,
      "valorPromo": 34.90,
      "quantidade": 35,
      "destaque": 0,
      "keywords": "caderno, papelaria, acessorio, marvel, vingadores"
    }
  ];
}
