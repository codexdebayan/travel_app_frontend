import axios from "axios";
import { useEffect, useState } from "react";
import "./Categories.css";
import { useCategory, useFilter} from "../../context";

export const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [numberOfcategoriesToShow, setNumberOfcategoriesToShow] = useState(0);

  const { hotelCategory, setHotelCategory } = useCategory();

  const {filterDispatch} = useFilter();

  const handleShowMoreRightClick = () => {
    setNumberOfcategoriesToShow((prev) => prev + 10);
  };

  const handleShowMoreLeftClick = () => {
    setNumberOfcategoriesToShow((prev) => prev - 10);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://nivas.cyclic.app/api/category"
        );
        const categoriesToShow = data.slice(
          numberOfcategoriesToShow + 10 > data.length
            ? data.length - 10
            : numberOfcategoriesToShow,
          numberOfcategoriesToShow + 10
        );
        setCategories(categoriesToShow);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [numberOfcategoriesToShow]);

  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };
  // console.log({"Hotel category":hotelCategory});

  const handleFilterClick = () =>{
    filterDispatch({
      type: "SHOW_FILTER_MODAL"
    })
  };

  return (
    <section className="categories d-flex align-center gap-large cursor-pointer">
      {numberOfcategoriesToShow >= 10 && (
        <button
          className="button btn-category btn-left fixed cursor-pointer"
          onClick={handleShowMoreLeftClick}
        >
          <span class="material-icons-outlined">chevron_left</span>
        </button>
      )}

      {categories &&
        categories.map(({ _id, category }) => (
          <span
            className={`${category === hotelCategory ? "border-bottom" : ""} `}
            key={_id}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}

      {numberOfcategoriesToShow - 10 < categories.length && (
        <button
          className="button btn-category btn-right fixed cursor-pointer"
          onClick={handleShowMoreRightClick}
        >
          <span class="material-icons-outlined">chevron_right</span>
        </button>
      )}
      <button className="d-flex align-center gap-small cursor-pointer button btn-filter fixed" onClick={handleFilterClick}>
        <span class="material-icons-outlined">filter_alt</span>
        <span>Filter</span>
      </button>
    </section>
  );
};
