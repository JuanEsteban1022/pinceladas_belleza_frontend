export default function Nosotros() {
    return (
        <div className="nosotros-container">
            <h2 className="nosotros-titulo">¿Quiénes Somos?</h2>

            <section className="nosotros-descripcion">
                <p style={{ textAlign: 'justify' }}>
                    En <strong className="marca">Pinceladas de Belleza,</strong> transformamos la pasión por el maquillaje en una realidad dedicada a ti. Lo que comenzó como un sueño personal, hoy florece para ofrecerte una experiencia única en el mundo de la belleza. Nos especializamos en seleccionar cuidadosamente los productos de skincare, maquillaje y cuidado corporal de la más alta calidad, pensados exclusivamente para realzar tu esencia.
                </p>
            </section>

            <section className="nosotros-objetivo">
                <h3 className="nosotros-subtitulo">Nuestro objetivo va más allá de una simple venta.</h3>
                <p>
                    Queremos ser tu aliado en el fascinante camino de la belleza, ofreciéndote la mejor experiencia de compra.
                    Buscamos que encuentres todo lo que necesitas en un solo lugar, de forma fácil, agradable y segura.
                </p>
                <p>
                    Te ofrecemos los mejores productos de <strong className="nosotros-subtitulo">skincare, maquillaje y cuidado corporal,</strong> garantizando calidad y resultados visibles.
                </p>

                <h4 className="nosotros-subseccion">Asesoría y acompañamiento</h4>
                <p>
                    Creemos en el poder de la información. Por eso, te brindamos asesoría personalizada y contenido valioso,
                    para que cada elección que hagas sea perfecta para ti.
                </p>

                <h4 className="nosotros-subseccion">Mirando hacia el futuro</h4>
                <p>
                    Nuestro sueño es expandir esta pasión y creatividad lanzando nuestra propia línea de maquillaje,
                    desarrollada con la misma dedicación y amor que nos ha caracterizado desde el principio.
                </p>
            </section>


            <section className="nosotros-tarjetas">
                <div className="tarjeta">
                    <h3>Misión</h3>
                    <p>Ofrecer productos de belleza que inspiren seguridad, autoestima y autenticidad.</p>
                </div>
                <div className="tarjeta">
                    <h3>Visión</h3>
                    <p>Convertirnos en la marca de referencia para quienes buscan resaltar su belleza única.</p>
                </div>
                <div className="tarjeta">
                    <h3>Valores</h3>
                    <p>Calidad, integridad, transparencia, innovación, empoderamiento y bienestar.</p>
                </div>
            </section>

            <section className="nosotros-logo">
                <img src="public/logo-512x512.png" alt="Logo Pinceladas de Belleza" />
            </section>

            <section className="nosotros-frase">
                <p>“Cada pincelada cuenta. Cada detalle revela tu esencia. Brilla con elegancia.”</p>
            </section>
        </div>
    );
}
