import React, { useEffect } from "react";

import HomeSlider from "./HomeSlider";
import BestSeller from "./BestSeller";
import NewProductsItem from "./NewProductsItem";
import NewsLetter from "./NewsLetter";
import FeaturedCategory from "./FeaturedCategory";

const Home = () => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <main>
      <HomeSlider />
      <FeaturedCategory />
      <BestSeller />
      <NewProductsItem />
      <NewsLetter />
    </main>
  );
};

export default Home;
