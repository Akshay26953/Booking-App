import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { faLocationDot, faCircleXmark, faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./Hotel.css";
import MaiList from "../../components/MaiList/MaiList";
import Footer from "../../components/Footer/Footer";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

function Hotel() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNum, setSlideNum] = useState(0);
  const [open, setOpen] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];

  const { dates, options } = useContext(SearchContext);

  const millSec_per_day= 1000 * 60 * 60 * 24;
  function dayDif(date1, date2) {
    const timeDif = Math.abs(date2.getTime() - date1.getTime());
    const difDays = Math.ceil(timeDif / millSec_per_day);
    return difDays;
  }

  const days = dayDif(dates[0].endDate, dates[0].startDate)

  const handleOpen = (index) => {
    setSlideNum(index);
    setOpen(true);
  };
  const handleMove = (direction) => {
    let newslideNum;

    if (direction === "l") {
      newslideNum = slideNum === 0 ? 5 : slideNum - 1;
    } else {
      newslideNum = slideNum === 5 ? 0 : slideNum + 1;
    }

    setSlideNum(newslideNum);
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading please wait..."
      ) : (
        <>
          <div className="hotelContainer">
            {open && (
              <div className="slider">
                <FontAwesomeIcon icon={faCircleXmark} className="sliderCancel sliderBtn" onClick={() => setOpen(false)} />
                <FontAwesomeIcon icon={faCircleArrowLeft} className="sliderLeft sliderBtn" onClick={() => handleMove("l")} />
                <div className="sliderWrapper">
                  <img src={photos[slideNum].src} alt="" className="sliderImg" />
                </div>
                <FontAwesomeIcon icon={faCircleArrowRight} className="sliderRight sliderBtn" onClick={() => handleMove("r")} />
              </div>
            )}
            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDist">Excellent location - {data.distance} from center</span>
              <span className="hotelPrice">Book a stay over ${data.cheapestPrice} this property and get a free airport taxi</span>
              <div className="hotelImages">
                {data.photos?.map((item, index) => {
                  return (
                    <div key={index} className="hotelImgWrapper">
                      <img onClick={() => handleOpen(index)} src={item.src} alt="" />
                    </div>
                  );
                })}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsText">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">{data.desc}</p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>Located in the real heart of Krakow, this property has an excellent location score of 9.8!</span>
                  <h2>
                    <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                  </h2>
                  <button>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
          </div>
          <MaiList />
          <Footer />
        </>
      )}
    </div>
  );
}

export default Hotel;
