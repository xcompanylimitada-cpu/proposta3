window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // --- LÓGICA DA SEÇÃO 1 (MARCA) ---
    const introText = document.getElementById('introText');
    const brandContainer = document.getElementById('brandContainer');
    const mainBrand = document.getElementById('mainBrand');

    let progress1 = scrollY / (windowHeight * 1.5);
    if (progress1 > 1) progress1 = 1;

    if (introText) {
        introText.style.opacity = 1 - (progress1 * 2.5);
        introText.style.transform = `translateY(${-progress1 * 50}px)`;
    }

    if (brandContainer && mainBrand) {
        if (progress1 > 0.05) {
            brandContainer.style.opacity = progress1 * 2;
            const initialScale = window.innerWidth < 600 ? 10 : 25;
            const scaleValue = Math.max(initialScale - (progress1 * (initialScale - 1)), 1);
            mainBrand.style.transform = `scale(${scaleValue})`;
        } else {
            brandContainer.style.opacity = 0;
        }
    }

    // --- LÓGICA DA SEÇÃO 4 (CARDS COM BLUR) ---
    const section4 = document.querySelector('.section-quatro-processo');
    const cards = document.querySelectorAll('.processo-card');

    if (section4 && cards.length > 0) {
        const sectionTop = section4.offsetTop;
        const sectionHeight = section4.offsetHeight - windowHeight;
        const scrollSec4 = scrollY - sectionTop;
        
        let progress4 = Math.max(0, Math.min(1, scrollSec4 / sectionHeight));

        cards.forEach((card) => {
            const index = parseInt(card.dataset.index);
            const totalCards = cards.length;
            const step = 1 / totalCards;
            const start = index * step;
            const blurPoint = start + (step * 0.7);

            if (progress4 > blurPoint) {
                card.classList.add('blurred');
                card.style.opacity = "0";
            } else if (progress4 >= start - 0.05) {
                card.classList.remove('blurred');
                card.style.opacity = "1";
                card.style.zIndex = 100 - index;
            } else {
                card.style.opacity = "0";
            }
        });
    }
});

// --- LÓGICA DA SEÇÃO 2 (DESEMBAÇAR) ---
const observarTexto = () => {
    const secao2 = document.querySelector('.second-section');
    if (!secao2) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elementos = entry.target.querySelectorAll('.titulo-quem-somos, .descricao-quem-somos');
                
                elementos.forEach((el) => {
                    el.classList.add('reveal-text');
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(secao2);
};

// --- ANIMAÇÃO DAS FAIXAS DOURADAS ---
const inicializarFaixasDouradas = () => {
    const faixas = document.querySelectorAll('.divisoria-faixa-dourada');
    
    faixas.forEach((faixa, index) => {
        // Adiciona um pequeno delay escalonado para as animações
        setTimeout(() => {
            faixa.style.opacity = '1';
        }, index * 300);
    });
};

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    observarTexto();
    inicializarFaixasDouradas();
});

// Executa por segurança quando tudo carregar
window.addEventListener('load', () => {
    observarTexto();
    inicializarFaixasDouradas();
});
// AJUSTA A ALTURA DOS IFRAMES MOBILE
document.addEventListener('DOMContentLoaded', function() {
    const mobileFrames = document.querySelectorAll('.mobile-frame');
    
    mobileFrames.forEach(frame => {
        // Quando o iframe carregar
        frame.onload = function() {
            try {
                // Tenta ajustar altura ao conteúdo
                const iframeDoc = frame.contentDocument || frame.contentWindow.document;
                if (iframeDoc && iframeDoc.body) {
                    // Força viewport mobile
                    const viewportMeta = iframeDoc.querySelector('meta[name="viewport"]');
                    if (!viewportMeta) {
                        const meta = document.createElement('meta');
                        meta.name = 'viewport';
                        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
                        iframeDoc.head.appendChild(meta);
                    }
                }
            } catch (e) {
                // Cross-origin, não faz nada
            }
        };
    });
});
