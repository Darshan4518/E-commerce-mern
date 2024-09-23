import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { AddProducts } from "./pages/AddProducts";
import { Settings } from "./pages/Setting";

import { Orders } from "./pages/Orders";
import { AddCategory } from "./pages/AddCategory";
import { Category } from "./pages/Category";
import { Products } from "./pages/Products";
import { AddSubCategory } from "./pages/AddSubCategory";
import { SubCategory } from "./pages/SubCategory";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact={true} element={<Dashboard />} />
          <Route path="/products/add" element={<AddProducts />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/category" element={<Category />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/subcategory" element={<SubCategory />} />
          <Route
            path="/category/subcategory/add"
            element={<AddSubCategory />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
