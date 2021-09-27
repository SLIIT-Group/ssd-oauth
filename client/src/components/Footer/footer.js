import React from "react";
import "./footer.css";

function footer() {
  return (
    <div align="center">
      <div className="footer-style">
        <footer id="footer" className="section">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <div className="footer">
                  <div className="footer-logo">
                    <a className="logo" href="#">
                      <img src="./img/logo.png" alt="" />
                    </a>
                  </div>
                  <p>
                    This is a demonstration of how to improve web security with
                    OAuth
                  </p>
                  <ul className="footer-contact">
                    <li>
                      <i className="fa fa-map-marker"/> SLIIT, New Kandy
                      Road, Malabe
                    </li>
                    <li>
                      <i className="fa fa-phone"/> +94 76 7 611 379
                    </li>
                    <li>
                      <i className="fa fa-envelope"/> sliitgroup19@gmail.com
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-4">
                <div className="footer">
                  <br />
                  <br />
                  <br />
                  <h3 className="footer-title">SSD Assignment 2</h3>
                  <h3 className="footer-title">SLIIT</h3>
                </div>
              </div>

              <div className="col-md-4">
                <div className="footer">
                  <br />
                  <h3 className="footer-title">Location</h3>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8243473074417!2d79.84925541437687!3d6.911595095005982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25942865f1bfb%3A0x141db277b60011d8!2sLiberty%20Plaza!5e0!3m2!1sen!2slk!4v1592066508414!5m2!1sen!2slk"
                    width="100%"
                    height="100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default footer;
