// main.js - JavaScript corrigido para carrossel mobile

// INICIALIZAÇÃO DO SWIPER
const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 800,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});

// CONTROLE DO MENU HAMBURGUER - VERSÃO SIMPLIFICADA E TESTADA
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    // Verificar se os elementos existem
    if (!menuToggle || !navMenu) {
        console.error('Elementos do menu não encontrados!');
        return;
    }
    
    // Função para abrir o menu
    function openMenu() {
        console.log('Abrindo menu...');
        navMenu.classList.add('active');
        if (closeMenu) {
            closeMenu.style.display = 'flex';
        }
        document.body.style.overflow = 'hidden';
        menuToggle.style.display = 'none';
    }
    
    // Função para fechar o menu
    function closeMenuFunc() {
        console.log('Fechando menu...');
        navMenu.classList.remove('active');
        if (closeMenu) {
            closeMenu.style.display = 'none';
        }
        document.body.style.overflow = 'auto';
        menuToggle.style.display = 'block';
    }
    
    // Evento de clique no botão do menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // Impede que o evento se propague
        openMenu();
    });
    
    // Evento de clique no botão fechar
    if (closeMenu) {
        closeMenu.addEventListener('click', function(e) {
            e.stopPropagation(); // Impede que o evento se propague
            closeMenuFunc();
        });
    }
    
    // Fechar menu ao clicar em links
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', closeMenuFunc);
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            e.target !== menuToggle) {
            closeMenuFunc();
        }
    });
    
    // Impedir que cliques dentro do menu fechem ele
    navMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Ajustar menu na redimensionamento da janela
    function handleResize() {
        if (window.innerWidth > 768) {
            // Se for desktop, garantir que o menu está fechado e os botões escondidos
            navMenu.classList.remove('active');
            menuToggle.style.display = 'none';
            if (closeMenu) {
                closeMenu.style.display = 'none';
            }
            document.body.style.overflow = 'auto';
        } else {
            // Se for mobile, mostrar o botão do menu
            menuToggle.style.display = 'block';
            if (closeMenu) {
                closeMenu.style.display = 'none';
            }
        }
    }
    
    // Configurar o menu inicialmente
    handleResize();
    
    // Adicionar o event listener para redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Adicionar o background futurista ao body
    const futuristicBg = document.createElement('div');
    futuristicBg.className = 'futuristic-bg';
    
    // Criar as bolinhas brilhantes
    for (let i = 1; i <= 4; i++) {
        const circle = document.createElement('div');
        circle.className = 'circle';
        futuristicBg.appendChild(circle);
    }
    
    document.body.appendChild(futuristicBg);
    
    // Correção específica para Safari - Garantir altura mínima
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
        document.body.style.minHeight = window.innerHeight + 'px';
        window.addEventListener('resize', function() {
            document.body.style.minHeight = window.innerHeight + 'px';
        });
    }
});

// CARROSSEL 2 - FUNCIONAMENTO
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel2-track');
    if (track) {
        // Duplica os itens para loop infinito
        const items = track.innerHTML;
        track.innerHTML += items;
        
        // Controle de velocidade
        window.ajustarVelocidadeCarrossel2 = function(segundos) {
            track.style.animationDuration = segundos + 's';
        }
        
        // Velocidade padrão
        ajustarVelocidadeCarrossel2(40);
    }
});

// CORREÇÃO PARA SCROLL COM HASH NO MOBILE
(function() {
    const hash = window.location.hash;
    
    if (hash && window.innerWidth <= 768) {
        // Salvar a função original de scroll
        const originalScrollTo = window.scrollTo;
        
        // Bloquear scroll automático do navegador
        window.scrollTo = function() {};
        
        // Quando a página carregar, fazer scroll manual
        window.addEventListener('load', function() {
            setTimeout(function() {
                const section = document.querySelector(hash);
                if (section) {
                    const targetPosition = section.offsetTop - 80;
                    
                    // Restaurar função de scroll e usar
                    window.scrollTo = originalScrollTo;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'instant'
                    });
                    
                    // Para Swiper (se existir)
                    if (typeof Swiper !== 'undefined') {
                        document.querySelectorAll('.swiper').forEach(swiper => {
                            if (swiper.swiper) {
                                swiper.swiper.update();
                            }
                        });
                    }
                }
            }, 300);
        });
    }
})();

// FORÇAR RECÁLCULO DO CARROSSEL EM MOBILE (correção extra)
if (window.innerWidth <= 768) {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
            const track = document.querySelector('.carousel2-track');
            if (track) {
                // Forçar reflow
                track.style.display = 'none';
                void track.offsetHeight;
                track.style.display = 'flex';
                
                // Reiniciar animação
                track.style.animation = 'none';
                void track.offsetHeight;
                track.style.animation = 'carousel2-scroll-mobile 60s linear infinite';
            }
        }, 500);
    });
}
