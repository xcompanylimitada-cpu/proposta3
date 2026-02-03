document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('btnMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const linksMobile = document.querySelectorAll('.mobile-links a');

    // Abre/Fecha menu e anima o X
    function toggleMenu() {
        btnMenu.classList.toggle('active');
        menuOverlay.classList.toggle('open');
        
        if (menuOverlay.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    btnMenu.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link
    linksMobile.forEach(link => {
        link.addEventListener('click', () => {
            btnMenu.classList.remove('active');
            menuOverlay.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
    });

    // Slider Background
    const slides = document.querySelectorAll('.slide');
    let current = 0;
    const images = {
        desktop: ['images/fotoYolanda.webp', 'images/hero2dsk.webp', 'images/hero3dsk.webp'],
        mobile: ['images/fotoyolandamobile.webp', 'images/hero2mobile.webp', 'images/hero3mobile.webp']
    };

    function updateSlider() {
        const isMobile = window.innerWidth <= 1024;
        const currentSet = isMobile ? images.mobile : images.desktop;
        slides.forEach((slide, i) => {
            slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${currentSet[i]})`;
        });
    }

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);

    updateSlider();
    window.addEventListener('resize', updateSlider);
});
// Adicione dentro do seu document.addEventListener('DOMContentLoaded', ...
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

const conceptElements = document.querySelectorAll('.concept-title, .concept-description, .carousel-container');
conceptElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
});document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById('js-slider-range');
    const before = document.getElementById('js-before-box');
    const line = document.getElementById('js-divider-line');

    if (slider) {
        slider.addEventListener('input', (e) => {
            let val = e.target.value;
            before.style.width = val + "%";
            line.style.left = val + "%";
        });
    }
});
window.addEventListener('scroll', () => {
    const section = document.getElementById('section-5');
    const pics = [
        document.getElementById('pic-1'),
        document.getElementById('pic-2'),
        document.getElementById('pic-3')
    ];

    if (!section || !pics[0]) return;

    const rect = section.getBoundingClientRect();
    // Calcula o progresso baseado na altura total da seção de 400vh
    const totalScroll = section.offsetHeight - window.innerHeight;
    const currentScroll = -rect.top;
    const progress = Math.min(Math.max(currentScroll / totalScroll, 0), 1);

    // Troca as fotos (0 a 0.33 = foto 1 | 0.33 a 0.66 = foto 2 | 0.66 a 1.0 = foto 3)
    let index = 0;
    if (progress > 0.33) index = 1;
    if (progress > 0.66) index = 2;

    pics.forEach((img, i) => {
        if (i === index) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });
});
window.addEventListener('scroll', () => {
    const section = document.getElementById('section-6');
    const container = document.getElementById('js-eco-container');
    const cards = document.querySelectorAll('.eco-card');

    if (!section) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Progresso para Mobile
    const progress = Math.min(Math.max(-rect.top / (section.offsetHeight - windowHeight), 0), 1);

    // Desktop: Separação
    if (window.innerWidth > 1024) {
        if (rect.top < windowHeight * 0.6) {
            container.classList.add('animate-spread');
        } else {
            container.classList.remove('animate-spread');
        }
    }

    // Mobile: Troca sequencial (Idêntico Seção 5)
    if (window.innerWidth <= 1024) {
        let activeIdx = 0;
        if (progress > 0.33) activeIdx = 1;
        if (progress > 0.66) activeIdx = 2;

        cards.forEach((card, i) => {
            card.classList.toggle('active-mobile', i === activeIdx);
        });
    }
});window.addEventListener('scroll', () => {
    const section = document.querySelector('.eco-section');
    const cards = document.querySelectorAll('.eco-card');
    if (!section) return;

    const rect = section.getBoundingClientRect();
    
    // Desktop Trigger
    if (rect.top < window.innerHeight / 2) section.classList.add('active');

    // Mobile Steps
    if (window.innerWidth <= 768) {
        const scrollStart = section.offsetTop;
        const scrollRange = section.scrollHeight - window.innerHeight;
        const progress = Math.max(0, Math.min(1, (window.scrollY - scrollStart) / scrollRange));

        cards.forEach((card, i) => {
            const start = i / cards.length;
            const end = (i + 1) / cards.length;
            if (progress >= start && progress < end) card.classList.add('show');
            else card.classList.remove('show');
        });
        if (progress >= 0.9) cards[2].classList.add('show');
    }
});
// Adicione ao seu arquivo script.js existente
document.addEventListener('DOMContentLoaded', () => {
    const spaSection = document.querySelector('.spa-section');

    const spaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.3 });

    if (spaSection) {
        spaObserver.observe(spaSection);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ativa a animação de entrada (suave)
                const items = entry.target.querySelectorAll('.noiva-title-v8, .noiva-text-v8, .noiva-img-raw');
                items.forEach((item, i) => {
                    setTimeout(() => {
                        item.style.opacity = "1";
                        item.style.transform = "translateY(0)";
                    }, i * 200);
                });
            }
        });
    }, { threshold: 0.2 });

    const section = document.querySelector('.noiva-section-v8');
    if (section) {
        const items = section.querySelectorAll('.noiva-title-v8, .noiva-text-v8, .noiva-img-raw');
        items.forEach(item => {
            item.style.opacity = "0";
            item.style.transform = "translateY(20px)";
            item.style.transition = "all 0.8s ease-out";
        });
        observer.observe(section);
    }
});
// Animação de entrada Seção 9
document.addEventListener('DOMContentLoaded', () => {
    const observerV9 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.js-reveal-v9');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, index * 300); // Efeito cascata entre os cards
                });
            }
        });
    }, { threshold: 0.15 });

    const sectionV9 = document.querySelector('.section-v9');
    if (sectionV9) {
        const cards = sectionV9.querySelectorAll('.js-reveal-v9');
        cards.forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(40px)";
            card.style.transition = "all 0.8s cubic-bezier(0.2, 1, 0.3, 1)";
        });
        observerV9.observe(sectionV9);
    }
});