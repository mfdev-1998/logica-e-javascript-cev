// ===============================================
// 1. Elementos do DOM e Variáveis Globais
// ===============================================

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section[id]');

// Elementos da Notificação e Contador
const notificacaoEl = document.getElementById('notificacao-carrinho');
const nomeProdutoNotificacao = document.getElementById('nome-produto-notificacao');
const totalCarrinhoNotificacao = document.getElementById('total-carrinho-notificacao');
const contadorCarrinhoEl = document.getElementById('contador-carrinho'); 

// Variáveis do Carrinho
let carrinho = [];
let totalCarrinho = 0;


// ===============================================
// 2. Funções de Utilidade (Carrinho e UI)
// ===============================================

/**
 * Atualiza o número de itens no contador visual.
 */
function atualizarContadorCarrinho() {
    contadorCarrinhoEl.textContent = carrinho.length; 
}

/**
 * Exibe a notificação de item adicionado.
 * @param {string} produtoNome - O nome do produto adicionado.
 */
function exibirNotificacao(produtoNome) {
    nomeProdutoNotificacao.textContent = produtoNome;
    totalCarrinhoNotificacao.textContent = `Total: R$ ${totalCarrinho.toFixed(2).replace('.', ',')}`;
    
    notificacaoEl.classList.add('mostrar');

    // Tempo de 5 segundos (5000ms), corrigido da última vez
    setTimeout(() => {
        notificacaoEl.classList.remove('mostrar');
    }, 5000); 
}

/**
 * Função principal para adicionar o produto ao carrinho.
 * (Esta é a única função adicionarAoCarrinho correta)
 */
function adicionarAoCarrinho(e) {
    const card = e.target.closest('.produto-card');

    // Leitura dos data attributes
    const nome = card.dataset.nome;
    const preco = parseFloat(card.dataset.preco);

    // Adiciona o produto e atualiza o total
    carrinho.push({ nome, preco });
    totalCarrinho += preco;

    // Atualiza o contador e exibe a notificação
    atualizarContadorCarrinho(); 
    exibirNotificacao(nome); // Corrigido para passar a variável 'nome'

    // O console.log é útil para debug, mas pode ser removido
    console.log(`Produto adicionado: ${nome}. Novo total: R$ ${totalCarrinho.toFixed(2)}`);
}


// ===============================================
// 3. Ouvintes de Eventos (Execução)
// ===============================================

// A. Menu Responsivo e Fechar no Clique
const linksInternos = document.querySelectorAll('.nav-links a');
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

linksInternos.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// B. Rolagem Suave (Smooth Scroll)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// C. ScrollSpy
window.addEventListener('scroll', () => {
    let current = '';
    // Corrigido: window.pageYOffset ao invés de window.pageXOffset
    const scrollY = window.pageYOffset + 65; 

    sections.forEach(section => { // Corrigido 'seaction' para 'section'
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight; // Corrigido: usando section ao invés de um undefined 'section'

        if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.classList.remove('active-spy');
        if (link.getAttribute('href').includes(current)){
            link.classList.add('active-spy');
        }
    });
});

// D. Adicionar ao Carrinho
document.querySelectorAll('.btn-adicionar').forEach(button => {
    button.addEventListener('click', adicionarAoCarrinho);
});