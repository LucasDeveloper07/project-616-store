import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { normalizar, separar, distancia } from '../util/texto';

export interface ItemIndice {
  produto: Produto;
  texto: string;       // nome + descritivo, sem acento e em minúsculo
  palavras: string[];  // o mesmo texto separado em palavras
}

export interface ResultadoBusca {
  exatos: Produto[];
  semelhantes: Produto[];
}

// palavras que não ajudam a achar nada ("homem de ferro" -> "homem ferro")
const IGNORAR = ["de", "da", "do", "das", "dos", "e", "a", "o", "com", "para", "um", "uma"];

// Categorias do menu do header -> palavras que identificam os produtos.
// A chave é o termo já sem acento e em minúsculo. Um produto entra se tiver QUALQUER uma das palavras.
const CATEGORIAS = new Map<string, string[]>([
    ["action figure", ["action figure"]],
    ["funko pop", ["funko pop"]],
    ["hq's", ["hq"]],
    ["canecas", ["caneca"]],
    ["roupas", ["camiseta"]],
    ["acessorios", ["chaveiro", "mochila", "caderno", "caneca"]]
]);

@Injectable({
    providedIn: 'root'
})
export class BuscaService {

    // monta o texto pesquisável de cada produto (chame uma vez, quando a lista chegar)
    public indexar(produtos: Produto[]): ItemIndice[] {
        return produtos.map(p => {
            const texto = normalizar(`${p.nome} ${p.descritivo}`);
            return { produto: p, texto, palavras: separar(texto) };
        });
    }

    // exatos: contêm TODAS as palavras digitadas
    // semelhantes: contêm ALGUMA palavra, ou algo parecido (tolera erro de digitação)
    public buscar(indice: ItemIndice[], termo: string): ResultadoBusca {

        // termo igual ao nome de uma categoria do menu
        const categoria = CATEGORIAS.get(normalizar(termo).trim());

        if (categoria) {
            const exatos = indice
                .filter(item => categoria.some(p => item.texto.includes(p)))
                .map(item => item.produto);

            return { exatos, semelhantes: [] };
        }

        // busca normal
        const palavras = separar(termo).filter(p => !IGNORAR.includes(p));
        const exatos: Produto[] = [];
        const semelhantes: Produto[] = [];

        if (palavras.length === 0) {
            return { exatos, semelhantes };
        }

        for (const item of indice) {
            if (palavras.every(p => item.texto.includes(p))) {
                exatos.push(item.produto);
            } else if (palavras.some(p => this.parecido(p, item))) {
                semelhantes.push(item.produto);
            }
        }

        return { exatos, semelhantes: semelhantes.slice(0, 8) };
    }

    private parecido(palavra: string, item: ItemIndice): boolean {
        if (item.texto.includes(palavra)) return true;

        // aceita erro de digitação em palavras maiores (ex.: "aranah" ~ "aranha")
        const tolerancia = palavra.length >= 6 ? 2 : palavra.length >= 4 ? 1 : 0;
        if (tolerancia == 0) return false;

        return item.palavras.some(w => distancia(palavra, w) <= tolerancia);
    }
}