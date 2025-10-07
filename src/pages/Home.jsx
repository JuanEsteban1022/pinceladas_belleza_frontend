import Carrusel from "../components/CarruselPrincipal";

export default function Home() {

  const imagesMakeup = [
    'src/assets/images/carrusel/makeup.jpg',
    'src/assets/images/carrusel/oil.jpg',
    'src/assets/images/carrusel/serum.jpg',
    'src/assets/images/carrusel/aplicar.jpg',
  ];

  const imagesMarks = [
    'src/assets/images/marks/atenea.jpg',
    'src/assets/images/marks/bioaqua.jpg',
    'src/assets/images/marks/bloomshell.jpg',
    'src/assets/images/marks/dolcebella.jpg',
    'src/assets/images/marks/misscosmetics.jpg',
  ];

  const settingsMakeup = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  const settingsMarks = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div style={{ margin: '1rem 0 1rem 0' }}>
      <Carrusel imagenes={imagesMakeup} settings={settingsMakeup} styleProp={'carrusel-img'} />
      <section style={{ margin: '2em 0 2rem 0', textAlign: 'center' }} className="nosotros-frase">
        <p>“Cada pincelada cuenta. Cada detalle revela tu esencia. Brilla con elegancia.”</p>
      </section>
      <Carrusel imagenes={imagesMarks} settings={settingsMarks} styleProp={'carrusel-img-marks'} />
      <div style={{ padding: '20px' }}>
        <h2 style={{ marginTop: '2rem' }}>Bienvenida a Pinceladas de Belleza</h2>
        <p>Descubre nuestros productos de belleza y cuidado personal.</p>
      </div>
    </div>
  );
}
