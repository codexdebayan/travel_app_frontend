import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateSelector.css";
import { useDate } from "../../context";
import { useState } from "react";

export const DateSelector = ({placeholder, checkInType}) => {

  const {checkInDate, checkOutDate, dateDispatch} = useDate();

  const handleDateChange = (date) =>{
    dateDispatch({
      type: checkInType === "in"? "CHECK_IN" : "CHECK_OUT",
      payload: date,
    });
  };

  const handleDateFocus = () =>{
    dateDispatch({
      type:"DATE_FOCUS",

    });
  };


  return (
    <DatePicker
      selected={checkInType === "in" ? checkInDate : checkOutDate}
      onChange={(date)=>handleDateChange(date)}
      onFocus={handleDateFocus}
      className="search-dest input"
      dateFormat="dd/mm/yyyy"
      placeholderText="Add Dates"
      closeOnScroll={true}
     
    />
  );
};

