import React from 'react'

export const Footer = () => {
  return (
    <footer>
    <div className="container__footer">

        <div className="container__footer-categorias">
                <h4>Categorias</h4>
            <ul>
                <a href=""><li>inicio</li></a>
                <a href=""><li>productos</li></a>
                <a href=""><li>contactos</li></a>
                <a href=""><li>preguntas frecuentes</li></a> 
            </ul> 
        </div>

        <div className="container__footer-contactos"> 
                <h4>Contactos</h4>
                <ul>
                    <a href=""><i className="fa-brands fa-whatsapp"></i> <span>+54912345678</span></a>
                    <a href=""><i className="fa-solid fa-phone"></i><span>(011)12345678</span></a>
                    <a href=""><i className="fa-solid fa-envelope"></i><span>email@trainingshop.com</span></a>
                    <a href=""><i className="fa-solid fa-location-dot"></i><span>Capital Federal, Buenos Aires, Argentina</span></a>
                </ul>
        </div>
        <div className="container__footer-redes">
            <h4>Redes</h4>
            <ul>
                <a href=""><i className="fa-brands fa-instagram"></i></a>
            </ul>
        </div>    

    </div>
    <div className="copy">
        <p>Copyright Training Shop - Todos los derechos reservados.</p>
    </div>
    </footer>
  )
}
