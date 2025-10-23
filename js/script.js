// Preloader simple 
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Detectar dispositivo móvil para ajustes específicos
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustes específicos para móvil
if (isMobile()) {
    // Reducir animaciones en móvil para mejor performance
    document.querySelectorAll('*').forEach(el => {
        el.style.transition = el.style.transition.replace(/\d+\.?\d*s/g, '0.2s');
    });
}
console.log('🎨 Página de Diseño Gráfico cargada correctamente!');

// Efecto hover mejorado para botones
document.querySelectorAll('button, a[href="#contacto"]').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
