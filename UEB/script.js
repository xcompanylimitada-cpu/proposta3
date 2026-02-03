// ===== MENU MOBILE =====
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
    });

    // Fecha menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Fecha menu ao clicar fora
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.header') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
        }
    });
}

// ===== CARROSSEL =====
function ajustarCarrossel() {
    const carrosselTrack = document.querySelector('.carrossel-track');
    if (!carrosselTrack) return;
    
    const larguraTela = window.innerWidth;
    
    // Remove qualquer animação existente
    carrosselTrack.style.animation = 'none';
    
    // Força reflow
    void carrosselTrack.offsetWidth;
    
    // Calcula valores baseado no tamanho da tela
    let larguraImagem, gap, duracao;
    
    if (larguraTela < 480) {
        larguraImagem = 220;
        gap = 15;
        duracao = 18;
    } else if (larguraTela < 768) {
        larguraImagem = 250;
        gap = 20;
        duracao = 20;
    } else if (larguraTela < 1024) {
        larguraImagem = 280;
        gap = 25;
        duracao = 25;
    } else {
        larguraImagem = 300;
        gap = 30;
        duracao = 30;
    }
    
    // Calcula a distância total a percorrer (4 imagens originais)
    const distanciaTotal = (larguraImagem * 4) + (gap * 3);
    
    // Aplica nova animação
    carrosselTrack.style.animation = `carrossel-move ${duracao}s linear infinite`;
    
    // Define a animação CSS dinamicamente
    const style = document.createElement('style');
    style.id = 'carrossel-animation';
    style.textContent = `
        @keyframes carrossel-move {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${distanciaTotal}px); }
        }
    `;
    
    // Remove estilo antigo se existir
    const estiloAntigo = document.getElementById('carrossel-animation');
    if (estiloAntigo) {
        estiloAntigo.remove();
    }
    
    document.head.appendChild(style);
}

// Pausa no hover do carrossel
function configurarPausaHover() {
    const carrosselContainer = document.querySelector('.carrossel-container');
    const carrosselTrack = document.querySelector('.carrossel-track');
    
    if (carrosselContainer && carrosselTrack) {
        carrosselContainer.addEventListener('mouseenter', () => {
            carrosselTrack.style.animationPlayState = 'paused';
        });
        
        carrosselContainer.addEventListener('mouseleave', () => {
            carrosselTrack.style.animationPlayState = 'running';
        });
    }
}

// ===== FAQ ACCORDION =====
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const pergunta = item.querySelector('.faq-pergunta');
        
        if (pergunta) {
            pergunta.addEventListener('click', () => {
                // Fecha todos os outros itens
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alterna o item atual
                item.classList.toggle('active');
            });
        }
    });
    
    // Abre o primeiro item por padrão
    faqItems[0].classList.add('active');
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Carrossel
    ajustarCarrossel();
    configurarPausaHover();
    
    // FAQ
    initFAQ();
    
    // Ajusta carrossel quando redimensionar
    window.addEventListener('resize', ajustarCarrossel);
    
    // Verificar imagens
    const imagens = document.querySelectorAll('.carrossel-track img');
    imagens.forEach(img => {
        img.onerror = function() {
            console.log('Imagem não carregou:', this.src);
        };
    });
});