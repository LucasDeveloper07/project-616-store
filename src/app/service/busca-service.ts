import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { normalizar, separar, distancia } from '../util/texto';

export interface ItemIndice {
    produto: Produto;
    texto: string;
    palavras: string[];
}

export interface ResultadoBusca {
    exatos: Produto[];
    semelhantes: Produto[];
}

const IGNORAR = ["de", "da", "do", "das", "dos", "e", "a", "o", "com", "para", "um", "uma"];

@Injectable({
    providedIn: 'root'
})
export class BuscaService {

    public indexar(produtos: Produto[]): ItemIndice[] {
        return produtos.map(p => {
            const texto = normalizar(`${p.nome} ${p.descritivo}`);
            return { produto: p, texto, palavras: separar(texto) };
        });
    }

    public buscar(indice: ItemIndice[], termo: string): ResultadoBusca {
        const palavras = separar(termo).filter(p => !IGNORAR.includes(p));
        const exatos: Produto[] = [];
        const semelhantes: Produto[] = [];

        if (palavras.length === 0) {
            return {exatos, semelhantes};
        }

        for (const item of indice) {
            if (palavras.every(p => item.texto.includes(p))) {
                exatos.push(item.produto);
            } else if (palavras.some(p => this.parecido(p, item))) {
                semelhantes.push(item.produto);
            }
        }

        return {exatos, semelhantes: semelhantes.slice(0, 8)};
    }

    private parecido(palavra: string, item: ItemIndice): boolean {
        if (item.texto.includes(palavra)) return true;

        const tolerancia = palavra.length >= 6 ? 2 : palavra.length >= 4 ? 1 : 0;
        if (tolerancia == 0) return false;

        return item.palavras.some(w => distancia(palavra, w) <= tolerancia);
    }
}
