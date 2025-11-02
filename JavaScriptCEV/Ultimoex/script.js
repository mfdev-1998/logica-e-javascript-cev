// --- Declaração de Variáveis e Seleção de Elementos HTML ---
// Seleciona o campo de input para o número usando o seletor CSS.
let num = document.querySelector('input#fnum')

// Seleciona a lista suspensa (select) onde os números adicionados serão exibidos.
let lista = document.querySelector('select#flista')

// Seleciona a área de resultado (div) onde as estatísticas finais serão mostradas.
let res = document.querySelector('div#res')

// Cria um array vazio para armazenar os números digitados pelo usuário.
let valores = []

// --- Funções de Validação ---

// isNumero(n): Verifica se o valor 'n' é um número válido (entre 1 e 100).
function isNumero(n) {
    if(Number(n) >= 1 && Number(n) <= 100) {
        return true // Retorna verdadeiro se o número estiver no intervalo.
    } else {
        return false // Retorna falso se não estiver.
    }
}

// inlista(n, i): Verifica se o número 'n' já está presente no array 'i'.
function inlista(n, i) {
    // Usa o método 'indexOf' para buscar o número. Se o resultado for diferente de -1,
    // significa que o número foi encontrado na lista.
    if(i.indexOf(Number(n)) != -1) {
        return true // Retorna verdadeiro se o número já estiver na lista.
    } else {
        return false // Retorna falso se o número não estiver na lista.
    }
}

// --- Função para Adicionar um Número ---

// adicionar(): Adiciona um novo número à lista, após validações.
function adicionar(){
    // A condição 'if' verifica se o número é válido E se ele NÃO está na lista.
    // O '!' inverte o resultado da função 'inlista'.
    if(isNumero(num.value) && !inlista(num.value, valores)) {
        // Converte o valor do input para número e o adiciona ao array 'valores'.
        valores.push(Number(num.value))
        
        // Cria um novo elemento <option> para a lista suspensa.
        let item = document.createElement('option')
        
        // Define o texto da nova opção.
        item.text = `Valor ${num.value} adicionado.`
        
        // Adiciona a nova opção à lista suspensa (select).
        lista.appendChild(item)
        
        // Limpa a área de resultado para que ela não mostre dados antigos.
        res.innerHTML = ''
    } else {
        // Exibe um alerta se a validação falhar (número inválido ou duplicado).
        window.alert('Valor Inválido ou já encontrado na lista.')
    }
    
    // Limpa o campo de input após a tentativa de adicionar.
    num.value = ''
    
    // Coloca o foco (cursor) de volta no campo de input.
    num.focus()
}

// --- Função para Finalizar a Análise e Exibir Resultados ---

// finalizar(): Realiza cálculos e exibe as estatísticas dos números adicionados.
function finalizar() {
    // Verifica se o array 'valores' está vazio.
    if (valores.length == 0) {
        window.alert('Adicione valores antes de finalizar!')
    } else {
        // Obtém o total de números no array.
        let tot = valores.length
        
        // Inicializa as variáveis 'maior' e 'menor' com o primeiro valor do array.
        let maior = valores[0]
        let menor = valores[0]
        
        // Variáveis para calcular a soma e a média.
        let soma = 0
        let media = 0
        
        // Loop 'for...in' para iterar por cada posição do array 'valores'.
        for(let pos in valores) {
            // Soma o valor atual à variável 'soma'.
            soma += valores[pos]
            
            // Verifica se o valor atual é o maior e o atualiza, se necessário.
            if(valores[pos] > maior)
                maior = valores[pos]
            
            // Verifica se o valor atual é o menor e o atualiza, se necessário.
            if(valores[pos] < menor)
                menor = valores[pos]
        }
        
        // Calcula a média dos valores.
        media = soma / tot
        
        // Limpa o conteúdo anterior da área de resultado.
        res.innerHTML = ''
        
        // Exibe o total de números.
        res.innerHTML += `<p>Ao todo, temos ${tot} números cadastrados.</p>`
        
        // Exibe o maior valor.
        res.innerHTML += `<p>O maior valor informado foi ${maior}.</p>`
        
        // Exibe o menor valor.
        res.innerHTML += `<p>O menor valor informado foi ${menor}.</p>`
        
        // Exibe a soma de todos os valores.
        res.innerHTML += `<p>Somando todos os valores, temos ${soma}.</P>`
        
        // Exibe a média dos valores.
        res.innerHTML += `<P>A média dos valores digitados é ${media}.</P>`
    }
}