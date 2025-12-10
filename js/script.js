// mensaje de consola inicial
console.log('🎨 Página de Diseño Gráfico cargada correctamente!');

// ============================================================
// PRELOADER
// ============================================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800); 
    }
});

// ============================================================
// NAVEGACIÓN ACTIVA
// ============================================================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ============================================================
// SCROLL SUAVE
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 120;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================
// ANIMACIONES CON INTERSECTION OBSERVER
// ============================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ============================================================
// SELECT PERSONALIZADO
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const customSelect = document.getElementById('custom-servicio');
    const trigger = customSelect.querySelector('.custom-select__trigger');
    const options = customSelect.querySelectorAll('.custom-select__options li');
    const hiddenSelect = document.getElementById('servicio');

    trigger.addEventListener('click', function() {
        customSelect.classList.toggle('open');
    });

    options.forEach(option => {
        option.addEventListener('click', function() {
            const value = this.getAttribute('data-value');
            trigger.querySelector('span').textContent = value;
            hiddenSelect.value = value;
            options.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            customSelect.classList.remove('open');
        });
    });

    document.addEventListener('click', function(e) {
        if (!customSelect.contains(e.target)) {
            customSelect.classList.remove('open');
        }
    });
});

// ============================================================
// DRAG & DROP ARCHIVOS
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('archivo');
    const fileNameLabel = document.getElementById('drop-zone-file-name');

    if (!dropZone || !fileInput) return;

    dropZone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', () => {
        fileNameLabel.textContent = fileInput.files?.[0]?.name || "";
    });

    ['dragenter','dragover','dragleave','drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, e => {
            e.preventDefault();
            e.stopPropagation();
        });
    });

    ['dragenter','dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('drop-zone--over'));
    });

    ['dragleave','drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('drop-zone--over'));
    });

    dropZone.addEventListener('drop', e => {
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            fileNameLabel.textContent = files[0].name;
        }
    });
});

// ============================================================
// BOTÓN "VOLVER ARRIBA"
// ============================================================
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; 
    width: 50px; height: 50px; border-radius: 50%;
    background: #4C82D8; color: white; border: none;
    font-size: 20px; cursor: pointer; opacity: 0;
    transition: .3s ease; z-index: 1000;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
`;
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    backToTopButton.style.opacity = (window.pageYOffset > 300) ? '1' : '0';
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// EFECTO HOVER BOTONES
// ============================================================
document.querySelectorAll('button, a[href="#contacto"]').forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-2px) scale(1.05)';
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================================
// FORMULARIO EMAILJS
// ============================================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const archivoInput = document.getElementById('archivo');
    const file = archivoInput.files?.[0];

    const templateParams = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        servicio: document.getElementById('servicio').value,
        mensaje: document.getElementById('mensaje').value,
        archivo_info: file ? 
            `Archivo: ${file.name} (${(file.size/1024).toFixed(2)} KB)` :
            "No adjuntó archivo."
    };

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;

    emailjs.send('service_e4p8ynn', 'template_qfiaeii', templateParams)
        .then(() => {
            alert(file ? 
                '¡Mensaje enviado! Enviame el archivo por WhatsApp o Email.' :
                '¡Mensaje enviado con éxito!');
            contactForm.reset();
            document.querySelector('.custom-select__trigger span').textContent = 'Remera';
            document.getElementById('drop-zone-file-name').textContent = '';
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        })
        .catch(() => {
            alert('Error al enviar. Intentá de nuevo.');
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
});

/* ============================================================
   📌 PORTFOLIO DINÁMICO DESDE ATLAS (CORREGIDO Y LIMPIO)
   ============================================================ */
document.addEventListener("DOMContentLoaded", async () => {

    // 1) Cargar datos desde backend
    let portfolioAtlas = [];
    try {
        const res = await fetch("http://localhost:3000/portfolio");
        portfolioAtlas = await res.json();
        console.log("📦 Datos de Atlas:", portfolioAtlas);
    } catch (err) {
        console.error("❌ Error cargando Atlas", err);
        return;
    }

    // 2) Agregar eventos SOLO una vez
    document.querySelectorAll(".portfolio-item").forEach(item => {
        item.addEventListener("click", () => {
            const titulo = item.querySelector("h3").textContent.trim();
            console.log("🖱️ Click en:", titulo);

            const datos = portfolioAtlas.find(p => p.titulo === titulo);

            if (!datos) {
                alert("No hay imágenes guardadas para: " + titulo);
                return;
            }

            abrirLightbox(datos);
        });
    });
});

// 3) Abrir modal
function abrirLightbox(item) {
    const modal = document.getElementById("portfolio-modal");
    const modalTitle = document.getElementById("portfolio-modal-title");
    const gallery = document.getElementById("portfolio-modal-gallery");

    modalTitle.textContent = item.titulo;
    gallery.innerHTML = "";

    item.imagenes.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        gallery.appendChild(img);
    });

    modal.classList.add("active");
}

document.querySelector(".portfolio-modal__close")
.addEventListener("click", () => {
    document.getElementById("portfolio-modal").classList.remove("active");
});

