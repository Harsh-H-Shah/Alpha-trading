import React from 'react';
import '../static/css/footer.css';

const Footer = () => {
  return (
    <div>
      <div class="wrapper flex justify-around bg-gray-900 mt-10 p-8">
        <div class="icon facebook">
          <div class="tooltip">Facebook</div>
          <span>
            <i class="fab fa-facebook-f"></i>
          </span>
        </div>
        <div class="icon twitter">
          <div class="tooltip">Twitter</div>
          <span>
            <i class="fab fa-twitter"></i>
          </span>
        </div>
        <div class="icon instagram">
          <div class="tooltip">Instagram</div>
          <span>
            <i class="fab fa-instagram"></i>
          </span>
        </div>
        <div class="icon github">
          <div class="tooltip">Github</div>
          <span>
            <i class="fab fa-github"></i>
          </span>
        </div>
        <div class="icon youtube">
          <div class="tooltip">Youtube</div>
          <span>
            <i class="fab fa-youtube"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
