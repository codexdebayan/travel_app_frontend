import { createContext, useContext, useReducer } from "react";
import { dateReducer } from "../reducer";

const initialState = {
  checkInDate: null,
  checkOutDate: null,
  isSearchModalOpen: false,
  isSearchResultOpen: true,
  destination: "",
  guests: 0,
};

const DateContext = createContext(initialState);

const DateProvider = ({ children }) => {
  const [
    {
      guests,
      destination,
      checkInDate,
      checkOutDate,
      isSearchModalOpen,
      isSearchResultOpen,
    },
    dateDispatch,
  ] = useReducer(dateReducer, initialState);

  return (
    <DateContext.Provider
      value={{
        guests,
        destination,
        checkInDate,
        checkOutDate,
        isSearchModalOpen,
        isSearchResultOpen, 
        dateDispatch,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};

const useDate = () => useContext(DateContext);

export { useDate, DateProvider };
