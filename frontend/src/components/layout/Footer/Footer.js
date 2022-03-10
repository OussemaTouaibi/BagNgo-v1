import React, { Fragment } from 'react';
import './footer.scss';


const Footer = () => {
    
    return (
        <Fragment>
   <footer className="footerr">

<div className="container">

  <div className="row">

    <div className="footer-col">

      <h4>Accueil</h4>

      <ul>

        <li><a href="#">about us</a></li>

        <li><a href="#">privacy policy</a></li>

        <li><a href="#">affiliate program</a></li>

      </ul>

    </div>

    <div className="footer-col">

      <h4>Expérience</h4>

      <ul>



      </ul>

    </div>

    <div className="footer-col">

      <h4>Sérvices</h4>

      <ul>

        <li><a href="#">Logement</a></li>

        <li><a href="#">Hote</a></li>

        

      </ul>

    </div>

    <div className="footer-col">

      <h4>Contact</h4>

      <div className="social-links">

        <a href="#"><i className="fab fa-facebook-f"></i></a>

        <a href="#"><i className="fab fa-twitter"></i></a>

        <a href="#"><i className="fab fa-instagram"></i></a>

        <a href="#"><i className="fab fa-youtube"></i></a>

        <a href="#"><i className="fab fa-linkedin"></i></a>




      </div>

    </div>

  </div>

</div>

</footer>


        </Fragment>
    );
}

export default Footer;