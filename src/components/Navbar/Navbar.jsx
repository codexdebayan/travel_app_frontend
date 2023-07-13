import "./Navbar.css";
import { useDate } from "../../context";

export const Navbar = () => {
  const { dateDispatch, destination, checkInDate, checkOutDate, guests } = useDate();

  const handleSearchClick = () => {
    dateDispatch({
      type: "OPEN_SEARCH_MODAL",
    });
  };

  return (
    <header className="heading d-flex  align-center">
      {/* <div class="heading-title-icon d-flex grow-shrink-basis align-center">
            <img class="icon mr-1" src="https://drive.google.com/uc?export=download&id=1ldwCY5t8WIdJ4JGqJrrf3mz8_jOXRCMm" alt="nivas"></img>
                <h1 className="heading-1">
                    <a className="link" href="/">Nivas</a>
                </h1>
            </div> */}

      <h1 className="heading-1">
        <img
          className="icon mr-1 "
          src="https://drive.google.com/uc?export=download&id=1ldwCY5t8WIdJ4JGqJrrf3mz8_jOXRCMm"
          alt="nivas"
          draggable="false"
        ></img>
        <a className="link" href="/">
          Nivas
        </a>
      </h1>

      <div
        className="form-container d-flex align center cursor-pointer shadow"
        onClick={handleSearchClick}
      >
        <span className="form-option">{destination || "Any Where"}</span>
        <span className="border-right-1px"></span>
        <span className="form-option">
          {checkInDate && checkOutDate
            ? `${checkInDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })} - ${checkOutDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}`
            : "Any Week "}
        </span>
        <span className="border-right-1px"></span>
        <span className="form-option">
          {guests > 0 ? `${guests} guests` : "Add Guest"}
        </span>
        <span className="search material-icons-outlined">search</span>
      </div>
      <nav className="d-flex align-center gap-large">
        <div className="nav d-flex align-center cursor-pointer">
          <span className="material-icons-outlined profile-option menu">
            menu
          </span>
          <span className="material-icons-outlined profile-option person">
            person_2
          </span>
        </div>
      </nav>
    </header>
  );
};
