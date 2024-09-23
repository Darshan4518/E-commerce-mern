import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  UploadCloudIcon,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";

import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { useRef } from "react";
import { toast } from "sonner";
import axios from "axios";

export function AddProducts() {
  const navigate = useNavigate();
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSubSelectCategory] = useState("");
  const [productImages, setProductImges] = useState([]);
  const [isFeature, setIsFeature] = useState(false);
  const [ratingValue, setRatingValue] = useState(2);

  const [categories, setCategory] = useState([]);
  const [subcategories, setSubCategory] = useState([]);

  useEffect(() => {
    getCategoryData();
    getSubCategoryData();
  }, []);

  const getCategoryData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/category");
    setCategory(data.categories);
  };
  const getSubCategoryData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/subcategory");
    setSubCategory(data.subCategory);
  };
  const handleChangeCategory = (event) => {
    setSelectCategory(event.target.value);
    setFormData(() => ({ ...formData, category: event.target.value }));
  };

  const handleChangeSubCategory = (event) => {
    setSubSelectCategory(event.target.value);
    setFormData(() => ({ ...formData, subCategory: event.target.value }));
  };

  const handleChangeIsFeature = (event) => {
    setIsFeature(event.target.value);
    setFormData(() => ({ ...formData, isFeatured: event.target.value }));
  };
  const handleChangeRating = (val) => {
    setRatingValue(val);
    setFormData(() => ({ ...formData, rating: val }));
  };

  const productImgUrl = useRef();

  const addImage = () => {
    setFormData(() => ({
      ...formData,
      images: [...productImages, productImgUrl.current.value],
    }));
  };

  const clearUrl = () => {
    productImgUrl.current.value = "";
  };
  let productImgArr = [];

  const addProductImages = () => {
    if (productImgUrl.current.value !== "") {
      productImgArr.push(productImgUrl.current.value);
      setProductImges([...productImages, productImgUrl.current.value]);
      addImage();
    } else {
      toast("Add Image Url!");
    }
  };
  const selectedCatName = (catname) => {
    setFormData(() => ({ ...formData, catName: catname }));
  };
  const selectedSubCatName = (subcatname) => {
    setFormData(() => ({ ...formData, subCatName: subcatname }));
  };
  const addProduct = async (e) => {
    console.log(formData);

    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/products/create", formData)
      .then((res) => {
        if (res.status === 200) {
          toast("Category Addedd Sucessfully");
          // navigate("/products");
          navigate(0);
          setFormData({
            name: "",
            description: "",
            images: [],
            catName: "",
            subCatName: "",
            brand: "",
            price: 0,
            oldPrice: "",
            category: "",
            subCategory: "",
            countInStock: 0,
            rating: 0,
            discount: "",
            isFeatured: false,
          });
        } else {
          toast("something went wrong");
          navigate(0);
        }
      });
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: [],
    catName: "",
    subCatName: "",
    brand: "",
    price: 0,
    oldPrice: "",
    category: "",
    subCategory: "",
    countInStock: 0,
    rating: 0,
    discount: "",
    isFeatured: false,
  });
  const changeInput = (e) => {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Acme Inc</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                to="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
              >
                <Package className="h-4 w-4" />
                Products
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Users className="h-4 w-4" />
                Customers
              </Link>
              <Link
                to="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Category
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  to="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  to="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">
              Product Upload
            </h1>
          </div>
          <div
            className="flex flex-1  rounded-lg border border-dashed shadow-sm "
            x-chunk="dashboard-02-chunk-1"
          >
            <div className=" w-full lg:flex ">
              <form
                className=" p-5 flex flex-col gap-y-10 xl:w-[70%] w-full"
                onSubmit={addProduct}
              >
                <TextField
                  helperText=""
                  id="demo-helper-text-aligned"
                  label="product name"
                  className=" lg:w-[90%] w-[100%] sm:w-[70%]"
                  name="name"
                  onChange={changeInput}
                />
                <div className="grid lg:w-[100%] max-w-sm items-center gap-2 ">
                  <Label htmlFor="email" className="uppercase">
                    description
                  </Label>
                  <Textarea
                    placeholder="Type Description here."
                    className=" lg:w-[165%] xl:w-[160%] h-40 resize-none"
                    name="description"
                    onChange={changeInput}
                  />
                </div>

                <div className=" lg:flex gap-3 w-[90%] space-y-5 items-baseline">
                  <div className="grid lg:w-[50%] max-w-sm items-center gap-2 ">
                    <Label htmlFor="email">CATEGORY</Label>
                    <Select
                      value={selectCategory}
                      onChange={handleChangeCategory}
                      className=" lg:w-[100%]"
                    >
                      <MenuItem value="">
                        <em className="">None</em>
                      </MenuItem>
                      {categories?.length !== 0 &&
                        categories?.map((cat, ind) => {
                          return (
                            <MenuItem
                              value={cat._id}
                              key={ind}
                              onClick={() => {
                                selectedCatName(cat.name);
                              }}
                            >
                              {cat.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                  <div className="grid lg:w-[50%] max-w-sm items-center gap-2 ">
                    <Label htmlFor="email" className=" uppercase">
                      Brand
                    </Label>
                    <TextField
                      helperText=""
                      id="demo-helper-text-aligned"
                      className=" lg:w-[100%]  "
                      name="brand"
                      onChange={changeInput}
                    />
                  </div>
                </div>
                <div className=" lg:flex gap-3 w-[90%] space-y-5  items-baseline">
                  <div className="grid lg:w-[50%] max-w-sm items-center gap-2">
                    <Label htmlFor="email" className=" uppercase">
                      Price
                    </Label>
                    <TextField
                      helperText=""
                      id="demo-helper-text-aligned"
                      className=" lg:w-[100%]  "
                      name="price"
                      onChange={changeInput}
                    />
                  </div>
                  <div className="grid lg:w-[50%] max-w-sm items-center gap-2">
                    <Label htmlFor="email" className=" uppercase">
                      old Price
                    </Label>
                    <TextField
                      helperText=""
                      id="demo-helper-text-aligned"
                      className=" lg:w-[100%]  "
                      name="oldPrice"
                      onChange={changeInput}
                    />
                  </div>
                </div>
                <div className=" lg:flex gap-3 w-[90%] space-y-5  items-baseline">
                  <div className="grid lg:w-[50%] max-w-sm items-center gap-2">
                    <Label htmlFor="email" className=" uppercase">
                      isFeature
                    </Label>
                    <Select
                      value={isFeature}
                      onChange={handleChangeIsFeature}
                      className=" lg:w-[100%]"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={true}>True</MenuItem>
                      <MenuItem value={false}>False</MenuItem>
                    </Select>
                  </div>
                  <div className="grid lg:w-[50%] max-w-sm items-center gap-2 ">
                    <Label htmlFor="email" className=" uppercase">
                      Stock
                    </Label>
                    <TextField
                      helperText=""
                      id="demo-helper-text-aligned"
                      className=" lg:w-[100%]  "
                      name="countInStock"
                      onChange={changeInput}
                    />
                  </div>
                </div>
                <div className="lg:flex gap-3 w-[90%] space-y-5  items-baseline">
                  <div className="grid lg:w-[50%] max-w-sm items-center gap-2 ">
                    <Label htmlFor="email" className=" uppercase">
                      Discount
                    </Label>
                    <TextField
                      helperText=""
                      id="demo-helper-text-aligned"
                      className=" lg:w-[100%]  "
                      name="discount"
                      onChange={changeInput}
                    />
                  </div>
                  <div className="grid lg:w-[50%] max-w-sm items-center gap-2 ">
                    <Label htmlFor="email">Sub Category</Label>
                    <Select
                      value={selectSubCategory}
                      onChange={handleChangeSubCategory}
                      className=" lg:w-[100%]"
                    >
                      <MenuItem value="">
                        <em className="">None</em>
                      </MenuItem>
                      {subcategories?.length !== 0 &&
                        subcategories?.map((cat, ind) => {
                          return (
                            <MenuItem
                              key={ind}
                              value={cat._id}
                              onClick={() => selectedSubCatName(cat.name)}
                            >
                              {cat.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                </div>
                <div className=" w-full grid lg:w-[50%] max-w-sm items-center gap-2">
                  <Label htmlFor="email" className=" uppercase">
                    Ratings
                  </Label>
                  <Rating
                    name="simple-controlled"
                    value={ratingValue}
                    precision={0.5}
                    onChange={(event, newValue) => {
                      handleChangeRating(newValue);
                    }}
                  />
                </div>
                <div className="grid w-full max-w-sm  gap-2 ">
                  <Label htmlFor="email" className=" uppercase">
                    Image Url
                  </Label>
                  <div className=" flex gap-x-2 lg:w-[165%] items-baseline">
                    <input
                      type="text"
                      className=" lg:w-[160%] flex h-[7vh]  rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white "
                      name="images"
                      ref={productImgUrl}
                    />
                    <Button
                      variant="outline"
                      type="button"
                      className=" lg:w-[20%] h-full"
                      onClick={clearUrl}
                    >
                      clear
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      className=" lg:w-[20%] h-full"
                      onClick={addProductImages}
                    >
                      ADD IMG
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className=" xl:w-[80%] w-[60%] bg-blue-500 hover:bg-blue-300 text-white font-bold  flex gap-x-3 items-center cursor-pointer"
                  type="submit"
                >
                  <UploadCloudIcon />
                  Publish And View Products
                </Button>
              </form>
              <div className=" hidden xl:block xl:w-[30%] p-3 ">
                <h2 className=" font-bold pb-3 text-[23px] xl:text-center">
                  Product Images
                </h2>
                <div className="   xl:flex flex-wrap gap-4  xl:justify-center">
                  {productImages.length !== 0 &&
                    productImages.map((image, ind) => {
                      return (
                        <img
                          key={ind}
                          src={image}
                          alt="product img"
                          className=" w-[130px] h-[130px] object-fill border p-2"
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
