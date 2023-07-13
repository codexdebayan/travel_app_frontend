import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { HotelImages, Navbar, HotelDetails, FinalPrice } from "../../components";
import "./SingleHotel.css";

export const SingleHotel = () => {
  const { id } = useParams();
  const [singleHotel, setSingleHotel] = useState({});

  console.log(id);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://nivas.cyclic.app/api/hotels/${id}`
        );
        setSingleHotel(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  const { name, state, country } = singleHotel;
  return (
    <Fragment>
      <Navbar />
      <main className="single-hotel-page">
        <p className="hotel-name-add fs-bold">{name}</p>
        <p className="hotel-name-add">
          <span class="material-icons-outlined">room</span> {state} , {country}
        </p>
        <HotelImages singleHotel={singleHotel} />
        <div className="d-flex ">
          <HotelDetails singleHotel={singleHotel}/>
          <FinalPrice singleHotel={singleHotel} />
        </div>
      </main>
    </Fragment>
  );
};
