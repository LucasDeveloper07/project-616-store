import { ItemPedido } from "./item-pedido";

export class Pedido {
    codigoPedido: number = 0;
    valorTotal: number = 0;
    entrega: string = "";
    obs: string = "";
    dataPedido: string = ""; // formato yyyy-MM-dd
    codigoCliente: number = 0;
    itens: ItemPedido[] = [];
}