// Normliza o texto ("Homem-Aranha" -> "homem-aranha")
export function normalizar(s: string): string {
    return (s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// "homem-aranha ferro" -> ["homem", "aranha", "ferro"]
export function separar(s: string): string[] {
  return normalizar(s).split(/[^a-z0-9]+/).filter(p => p.length > 0);
}

// Distância de Levenshtein: quantas letras mudar para uma palavra virar a outra
export function distancia(a: string, b: string): number {
  const linha = Array.from({ length: b.length + 1 }, (_, j) => j);

  for (let i = 1; i <= a.length; i++) {
    let anterior = linha[0];
    linha[0] = i;

    for (let j = 1; j <= b.length; j++) {
      const temp = linha[j];
      linha[j] = Math.min(
        linha[j] + 1,
        linha[j - 1] + 1,
        anterior + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      anterior = temp;
    }
  }
  return linha[b.length];
}