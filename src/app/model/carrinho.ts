import { Cliente } from "./cliente";
import { ItemCarrinho } from "./item-carrinho";
import { Produto } from "./produto";

export class Carrinho {
    cliente: Cliente = new Cliente();
    itens: ItemCarrinho[] = [];
    total: number = 0;

    constructor(jsonString: string | null) {
        try {
            if (jsonString != null) {
                const dados = JSON.parse(jsonString);
                this.cliente = dados.cliente || new Cliente();
                this.total = dados.total || 0;
                this.itens = dados.itens || [];
            }
        } catch (e) {
            console.error("Erro ao converter cesta do localStorage ", e);
        }
    }

    public addItem(obj: Produto, quantidade: number = 1) {
        let produtoExists = this.itens.find(item => item.produto.codigo === obj.codigo);

        if (produtoExists) {
            produtoExists.qtd += quantidade;
            produtoExists.valorTotal = this.calcItem(produtoExists);
        } else {
            const novo = new ItemCarrinho(obj);
            novo.qtd = quantidade;
            novo.valorTotal = this.calcItem(novo);
            this.itens.push(novo);
        }
    }

    public calcTotal(): number {
        let total = 0;

        for (let o of this.itens) {
            total = total + this.calcItem(o);
        }

        this.total = total;
        return this.total;
    }

    public calcItem(item: ItemCarrinho): number {
        let valor = 0;

        if (item.produto.valorPromo > 0) {
            valor = item.qtd * item.produto.valorPromo;
        } else {
            valor = item.qtd * item.produto.valor;
        }

        return valor;
    }

    public totalUnid(): number {
        return this.itens.reduce((soma, i) => soma + i.qtd, 0);
    }
}
