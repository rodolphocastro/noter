/**
 * Uma anotação a ser mantida pela aplicação.
 */
export interface Note {
  id?: string;
  titulo: string;
  descricao: string | null;
}

/**
 * Cria uma anotação vazia.
 */
export function createBlankNote (): Note {
  return {
    titulo: '',
    descricao: ''
  }
}
