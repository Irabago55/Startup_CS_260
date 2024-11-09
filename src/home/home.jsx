import React from 'react';
import { Carousel } from './carousel'
import './home.css';

export function Home() {
    return (
        <main>
            {/* <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <ol className="carousel-indicators">
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></li>
                <li data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="d-block w-100" src="public/Beauty_By_EB_IMG.jpg" alt="First slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src="public/Skin_Care_IMG.jpg" alt="Second slide" />
                </div>
                <div className="carousel-item">
                  <img className="d-block w-100" src="public/Hair_Care_IMG.jpg" alt="Third slide" />
                </div>
              </div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </a>
            </div>           */}
            <div>
                <Carousel />
            </div>
        <h3 className="mission-section">Our Mission</h3>
        <p className="mission-text">
            At Beauty by EB, our mission is to provide the finest <i>all-natural</i> beauty products that help our loyal clients not only look their best but feel more 
            <i>confident</i> every day. Whether you're seeking <i>thicker, fuller</i> hair or a <i>radiant complexion,</i> we offer premium products at a fraction of the cost. Why pay 
            more when you can have the best? Choose Beauty by EB and be <i>Eternamente Bella—beautiful, always.</i>
        </p>
        <p>
            Placeholder text for a 3rd service party that will generate inspirational quotes
        </p>
        </main>
    );
}