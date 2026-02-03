// SISTEMA COMPLETO - FORMULÁRIO + ANIMAÇÕES
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Site carregado com animações');
    
    // ANIMAÇÕES EXISTENTES CONTINUAM
    // (life bar, gold strip, hover effects, etc)
    
    // FORMULÁRIO BLOQUEIA CORS
    const form = document.getElementById('doctorInfoForm');
    if (!form) return;
    
    document.getElementById('skipBtn')?.addEventListener('click', function() {
        window.location.href = 'https://chat.whatsapp.com/JFHV3htqEtnLKdZznpuhXP';
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const dados = {
            nome: document.getElementById('nome').value,
            whatsapp: document.getElementById('whatsapp').value,
            email: document.getElementById('email').value,
            crm: document.getElementById('crm').value
        };
        
        if (!dados.nome || !dados.whatsapp || !dados.email || !dados.crm) {
            alert('Preencha tudo');
            return;
        }
        
        // Animação de loading (já existe no CSS)
        form.style.display = 'none';
        document.getElementById('formLoading').style.display = 'block';
        
        // ENVIA COM 'no-cors' - BLOQUEIA CORS
        fetch('https://visaopsiquiatrica-lab.supabase.co/rest/v1/doctor_registrations', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'sb_publishable_CZ41TibUniT2zaEgKTurkA_1JBNf3nu'
            },
            body: JSON.stringify([{
                nome: dados.nome,
                whatsapp: dados.whatsapp,
                email: dados.email,
                crm: dados.crm,
                aula_date: '15 de janeiro'
            }])
        });
        
        // Animação de sucesso antes de redirecionar
        setTimeout(() => {
            document.getElementById('formLoading').style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
            
            setTimeout(() => {
                window.location.href = 'https://chat.whatsapp.com/JFHV3htqEtnLKdZznpuhXP';
            }, 1500);
        }, 2000);
    });
});