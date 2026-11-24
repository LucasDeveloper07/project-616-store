import { buscarProdutos, normalizar } from '../services/busca';
import { ProdutoService } from '../services/produto.service';

describe('busca', () => {
  const lista = new ProdutoService().lista;
  const nomes = (r: any[]) => r.map((p) => p.nome);

  it('normaliza acentos e pontuação', () => {
    expect(normalizar('Capitão América!')).toBe('capitao america');
  });

  it('encontra por nome, ignorando acento e caixa', () => {
    expect(nomes(buscarProdutos(lista, 'CAPITAO').exatos)).toContain('Action Figure Capitão América');
  });

  it('filtra por vários termos', () => {
    const r = buscarProdutos(lista, 'funko aranha').exatos;
    expect(nomes(r)).toContain('Funko Pop! Homem-Aranha');
    expect(nomes(r)).not.toContain('Action Figure Thor');
    expect(r.every((p) => p.nome.startsWith('Funko') || p.keywords.includes('funko'))).toBe(true);
  });

  it('tolera erros de digitação', () => {
    expect(nomes(buscarProdutos(lista, 'wolverene').exatos)).toContain('Action Figure Wolverine');
  });

  it('sugere semelhantes', () => {
    const r = buscarProdutos(lista, 'thor');
    expect(r.exatos.length).toBeGreaterThan(0);
    expect(r.semelhantes.length).toBeGreaterThan(0);
  });

  it('retorna vazio para busca vazia', () => {
    expect(buscarProdutos(lista, '  ').exatos).toEqual([]);
  });
});
