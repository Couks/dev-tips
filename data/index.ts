import type { Tip, Challenge } from "../store";

export const tips: Tip[] = [
  {
    id: "1",
    title: "Desestruturação em JavaScript",
    content:
      "A desestruturação permite extrair dados de arrays ou objetos de forma simples e direta.",
    code: `// Desestruturação de objeto
const pessoa = { nome: 'Ana', idade: 25 };
const { nome, idade } = pessoa;
console.log(nome); // 'Ana'

// Desestruturação de array
const numeros = [1, 2, 3];
const [primeiro, segundo] = numeros;
console.log(primeiro); // 1`,
    language: "javascript",
  },
  {
    id: "2",
    title: "List Comprehension em Python",
    content:
      "List comprehension é uma forma concisa de criar listas em Python.",
    code: `# Criar uma lista de quadrados
quadrados = [x**2 for x in range(10)]
print(quadrados)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# Com condição
pares = [x for x in range(20) if x % 2 == 0]
print(pares)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]`,
    language: "python",
  },
  {
    id: "3",
    title: "Operador Spread em JavaScript",
    content:
      "O operador spread (...) permite expandir arrays e objetos em locais onde múltiplos elementos são esperados.",
    code: `// Combinar arrays
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinado = [...array1, ...array2];
console.log(combinado); // [1, 2, 3, 4, 5, 6]

// Copiar objetos
const obj = { a: 1, b: 2 };
const copia = { ...obj, c: 3 };
console.log(copia); // { a: 1, b: 2, c: 3 }`,
    language: "javascript",
  },
  {
    id: "4",
    title: "String Interpolation em Python",
    content:
      "f-strings permitem incorporar expressões dentro de strings literais.",
    code: `nome = "Maria"
idade = 30
mensagem = f"Olá, {nome}! Você tem {idade} anos."
print(mensagem)  # Olá, Maria! Você tem 30 anos.

# Expressões também funcionam
preco = 49.99
desconto = 0.1
valor_final = f"Preço final: R$ {preco * (1 - desconto):.2f}"
print(valor_final)  # Preço final: R$ 44.99`,
    language: "python",
  },
  {
    id: "5",
    title: "Async/Await em JavaScript",
    content:
      "Async/await simplifica o trabalho com Promises, tornando o código assíncrono mais legível.",
    code: `// Função assíncrona
async function buscarDados() {
  try {
    const resposta = await fetch('https://api.exemplo.com/dados');
    const dados = await resposta.json();
    console.log(dados);
  } catch (erro) {
    console.error('Erro ao buscar dados:', erro);
  }
}

// Chamando a função
buscarDados();`,
    language: "javascript",
  },
  {
    id: "6",
    title: "Decoradores em Python",
    content:
      "Decoradores são funções que modificam o comportamento de outras funções.",
    code: `# Decorador simples
def meu_decorador(funcao):
    def wrapper():
        print("Antes da função")
        funcao()
        print("Depois da função")
    return wrapper

@meu_decorador
def dizer_ola():
    print("Olá!")

dizer_ola()
# Saída:
# Antes da função
# Olá!
# Depois da função`,
    language: "python",
  },
  {
    id: "7",
    title: "Arrow Functions em JavaScript",
    content:
      "Arrow functions oferecem uma sintaxe mais concisa para escrever funções em JavaScript.",
    code: `// Função tradicional
function somar(a, b) {
  return a + b;
}

// Arrow function equivalente
const somarArrow = (a, b) => a + b;

// Com múltiplas linhas
const calcular = (a, b) => {
  const resultado = a * b;
  return resultado + 10;
};

console.log(somarArrow(5, 3)); // 8`,
    language: "javascript",
  },
  {
    id: "8",
    title: "Geradores em Python",
    content:
      "Geradores são funções que permitem criar iteradores de forma eficiente.",
    code: `# Função geradora simples
def contador(maximo):
    contador = 0
    while contador < maximo:
        yield contador
        contador += 1

# Usando o gerador
for numero in contador(5):
    print(numero)  # Imprime 0, 1, 2, 3, 4

# Gerador com expressão
quadrados = (x**2 for x in range(5))
print(list(quadrados))  # [0, 1, 4, 9, 16]`,
    language: "python",
  },
];

export const challenges: Challenge[] = [
  {
    id: "1",
    title: "Inverter uma String",
    description:
      "Crie uma função que inverta uma string sem usar a função reverse().",
    difficulty: "easy",
    language: "javascript",
    code: `function inverterString(str) {
  // Seu código aqui
}

// Teste
console.log(inverterString('hello')); // Deve retornar 'olleh'`,
    solution: `function inverterString(str) {
  let resultado = '';
  for (let i = str.length - 1; i >= 0; i--) {
    resultado += str[i];
  }
  return resultado;
}`,
  },
  {
    id: "2",
    title: "Verificar Palíndromo",
    description:
      "Crie uma função que verifica se uma palavra é um palíndromo (lê-se igual de trás para frente).",
    difficulty: "easy",
    language: "python",
    code: `def eh_palindromo(palavra):
    # Seu código aqui
    pass

# Teste
print(eh_palindromo("radar"))  # Deve retornar True
print(eh_palindromo("python"))  # Deve retornar False`,
    solution: `def eh_palindromo(palavra):
    palavra = palavra.lower()
    return palavra == palavra[::-1]`,
  },
  {
    id: "3",
    title: "Encontrar Números Primos",
    description:
      "Crie uma função que retorne todos os números primos até um determinado número.",
    difficulty: "medium",
    language: "javascript",
    code: `function encontrarPrimos(limite) {
  // Seu código aqui
}

// Teste
console.log(encontrarPrimos(20)); // Deve retornar [2, 3, 5, 7, 11, 13, 17, 19]`,
    solution: `function encontrarPrimos(limite) {
  const primos = [];
  
  for (let num = 2; num <= limite; num++) {
    let ehPrimo = true;
    
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        ehPrimo = false;
        break;
      }
    }
    
    if (ehPrimo) {
      primos.push(num);
    }
  }
  
  return primos;
}`,
  },
  {
    id: "4",
    title: "Fibonacci Recursivo",
    description:
      "Implemente uma função recursiva para calcular o n-ésimo número da sequência de Fibonacci.",
    difficulty: "medium",
    language: "python",
    code: `def fibonacci(n):
    # Seu código aqui
    pass

# Teste
print(fibonacci(7))  # Deve retornar 13 (0, 1, 1, 2, 3, 5, 8, 13)`,
    solution: `def fibonacci(n):
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n-1) + fibonacci(n-2)`,
  },
  {
    id: "5",
    title: "Ordenação Personalizada",
    description:
      "Implemente um algoritmo de ordenação para ordenar objetos por uma propriedade específica.",
    difficulty: "hard",
    language: "javascript",
    code: `const pessoas = [
  { nome: 'Carlos', idade: 30 },
  { nome: 'Ana', idade: 25 },
  { nome: 'Pedro', idade: 40 },
  { nome: 'Maria', idade: 22 }
];

function ordenarPorPropriedade(array, propriedade) {
  // Seu código aqui
}

// Teste
console.log(ordenarPorPropriedade(pessoas, 'idade'));
// Deve retornar as pessoas ordenadas por idade (do menor para o maior)`,
    solution: `function ordenarPorPropriedade(array, propriedade) {
  return [...array].sort((a, b) => {
    if (a[propriedade] < b[propriedade]) return -1;
    if (a[propriedade] > b[propriedade]) return 1;
    return 0;
  });
}`,
  },
  {
    id: "6",
    title: "Manipulação de Matrizes",
    description:
      "Crie uma função que rotacione uma matriz NxN em 90 graus no sentido horário.",
    difficulty: "hard",
    language: "python",
    code: `def rotacionar_matriz(matriz):
    # Seu código aqui
    pass

# Teste
matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
resultado = rotacionar_matriz(matriz)
# Deve retornar:
# [
#   [7, 4, 1],
#   [8, 5, 2],
#   [9, 6, 3]
# ]`,
    solution: `def rotacionar_matriz(matriz):
    n = len(matriz)
    resultado = [[0 for _ in range(n)] for _ in range(n)]
    
    for i in range(n):
        for j in range(n):
            resultado[j][n-1-i] = matriz[i][j]
            
    return resultado`,
  },
  {
    id: "7",
    title: "Validação de Parênteses",
    description:
      "Crie uma função que verifique se uma string contendo parênteses, colchetes e chaves está balanceada.",
    difficulty: "medium",
    language: "javascript",
    code: `function verificarBalanceamento(str) {
  // Seu código aqui
}

// Testes
console.log(verificarBalanceamento("{}[]()"));  // Deve retornar true
console.log(verificarBalanceamento("{[()]}"));  // Deve retornar true
console.log(verificarBalanceamento("{[(])}"));  // Deve retornar false
console.log(verificarBalanceamento("{["));      // Deve retornar false`,
    solution: `function verificarBalanceamento(str) {
  const pilha = [];
  const mapa = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    if (mapa[char]) {
      pilha.push(char);
    } else {
      const ultimo = pilha.pop();
      if (mapa[ultimo] !== char) {
        return false;
      }
    }
  }
  
  return pilha.length === 0;
}`,
  },
  {
    id: "8",
    title: "Busca Binária",
    description:
      "Implemente o algoritmo de busca binária para encontrar um elemento em um array ordenado.",
    difficulty: "medium",
    language: "python",
    code: `def busca_binaria(array, alvo):
    # Seu código aqui
    pass

# Testes
array_ordenado = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
print(busca_binaria(array_ordenado, 7))   # Deve retornar 3 (índice do elemento 7)
print(busca_binaria(array_ordenado, 10))  # Deve retornar -1 (não encontrado)`,
    solution: `def busca_binaria(array, alvo):
    inicio = 0
    fim = len(array) - 1
    
    while inicio <= fim:
        meio = (inicio + fim) // 2
        
        if array[meio] == alvo:
            return meio
        elif array[meio] < alvo:
            inicio = meio + 1
        else:
            fim = meio - 1
            
    return -1`,
  },
];
