import { useEffect, useState } from "react";
import { useDate, useCategory } from "../../context";
import { useNavigate } from "react-router-dom";
import { DateSelector } from "../DateSelector/DateSelector";
import "./SearchStayWithDate.css";
import axios from "axios";


export const SearchStayWithDate = () => {
  const [hotels, setHotels] = useState([]);
  const { destination, guests, isSearchResultOpen, dateDispatch } = useDate();
  const { hotelCategory } = useCategory();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://nivas.cyclic.app/api/hotels?category=${hotelCategory}`
        );

        setHotels(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [hotelCategory]);

  const handleDestinationChange = (event) => {
    dateDispatch({
      type: "DESTINATION",
      payload: event.target.value,
    });
  };

  const handleGuestChange = (event) => {
    dateDispatch({
      type: "GUESTS",
      payload: event.target.value,
    });
  };
  const destinationOptions = hotels.filter(
    ({ address, city, state, country }) =>
      address.toLowerCase().includes(destination.toLowerCase()) ||
      city.toLowerCase().includes(destination.toLowerCase()) ||
      state.toLowerCase().includes(destination.toLowerCase()) ||
      country.toLowerCase().includes(destination.toLowerCase())
  );

  const handleSearchresultClick = (address) => {
    dateDispatch({
      type: "DESTINATION",
      payload: address,
    });
  };

  const handleDestinationFocus = ()=>{
    dateDispatch({
        type:"SHOW_SEARCH_RESULT"
    })
  }

  const handleSearchButttonClick = () =>{
    dateDispatch({
      type:"CLOSE_SEARCH_MODAL"
    });
    navigate(`/hotels/${destination}`)
  }

  return (
    <div className="destination-container">
      <div className="destination-options d-flex align-center absolute">
        <div className="location-container ">
          <label className="label">Where</label>
          <input
            value={destination}
            onCanPlay={handleDestinationChange}
            onFocus={handleDestinationFocus}
            placeholder="Search Destination"
            className="input search-dest"
            autoFocus
          />
        </div>
        <div className="location-container ">
          <label className="label">Check In</label>
          <DateSelector checkInType="in" />
        </div>
        <div className="location-container">
          <label className="label">Check Out</label>
          <DateSelector checkInType="out" />
        </div>
        <div className="location-container">
          <label className="label">Number of guests</label>
          <input
            value={guests}
            placeholder="Add guests"
            className="input search-dest"
            onChange={handleGuestChange}
          />
        </div>
        <div className="search-container d-flex align-center cursor" onClick={handleSearchButttonClick}>
          <span className="search material-icons-outlined">search</span>
          <span>Search</span>
        </div>
      </div>
      {isSearchResultOpen && (
        <div className="search-result-container absolute">
          {destinationOptions &&
            destinationOptions.map(({ address, city }) => (
              <p
                className="p cursor-pointer"
                onClick={() => handleSearchresultClick(address)}
              >
                {address},{city}
              </p>
            ))}
        </div>
      )}
    </div>
  );
};
