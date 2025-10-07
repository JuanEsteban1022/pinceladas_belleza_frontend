import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * Componente reutilizable de carrusel
 * @param {Array} imagenes - Lista de URLs de imágenes
 * @param {Object} settings - Configuración personalizada para react-slick
 */
export default function CarruselPrincipal({ imagenes = [], settings = {}, styleProp = '' }) {
    
    const defaultSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        ...settings, // permite sobrescribir cualquier propiedad
    };

    return (
        <div className="carrusel-container">
            <Slider {...defaultSettings}>
                {imagenes.map((src, idx) => (
                    <div key={idx}>
                        <img src={src} alt={`slide-${idx}`} className={styleProp} />
                    </div>
                ))}
            </Slider>
        </div>
    );
}