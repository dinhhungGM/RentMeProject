import React, {memo} from "react";
import { Carousel } from "react-bootstrap";
import "./Carousel.scss";


function CarouselHeader() {
  const handleChange = (e) => {
    console.log(e.target.value);
  };
  
  return (
    <div className="carousel__header">
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block h-100"
            src="https://public-pictures.epal.gg/app/images/home/header/0811/Hila.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block h-100"
            src="https://public-pictures.epal.gg/app/images/home/header/0811/Extrawired.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block h-100"
            src="https://public-pictures.epal.gg/app/images/home/header/0811/Nicolle.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block h-100"
            src="https://public-pictures.epal.gg/app/images/home/header/0811/Yoonah.jpg"
            alt="Forth slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className="carousel__content">
        <div className="carousel__content--title">
          Get carried, game and life
        </div>
        <div
          className="d-flex"
          style={{ flexDirection: "column", gap: "16px" }}
        >
          <div className="carousel__content--search">
            <div
              className="d-flex align-items-center"
              style={{ marginTop: "40px", gap: "10px" }}
            >
              <div className="search__input">
                <i className="bx bx-search"></i>
                <input
                  type="text"
                  placeholder="Tìm kiếm games"
                  onChange={handleChange}
                />
              </div>
              <div className="seacrh__item">
                <div className="button__search">
                  <button type="button" className="button-purple">
                    <span>Search</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="seacrch__item"></div>
          </div>
          <div className="carousel__content--list">
            <div className="list__item d-flex align-items-center">
              <div className="list__item--games title--games">
                Trending Services:
              </div>
              <div className="list__item--games">
                <button className="button button--games">
                  <span>League of Legends</span>
                </button>
              </div>
              <div className="list__item--games">
                <button className="button button--games">Minecraft</button>
              </div>
              <div className="list__item--games">
                <button className="button button--games">Among Us</button>
              </div>
              <div className="list__item--games">
                <button className="button button--games">Movie</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CarouselHeader);
