import { Link, useNavigate } from "react-router-dom";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  UploadCloudIcon,
  Users2,
} from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CloseIcon from "@mui/icons-material/Close";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, MenuItem, Rating, Select, TextField } from "@mui/material";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";

import { Textarea } from "@/components/ui/textarea";

export function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [product_id, setProduct_id] = useState("");
  const [prod_del_id, setProd_del_id] = useState("");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openUpdateModal2, setOpenUpdateModal2] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSubSelectCategory] = useState("");

  const [isFeature, setIsFeature] = useState(false);
  const [ratingValue, setRatingValue] = useState(2);
  const [categories, setCategory] = useState([]);
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
    subcategory: "",
    countInStock: 0,
    rating: 0,
    discount: "",
    isFeatured: false,
  });
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    getProductsData();
    getCategoryData();
    getSubCategoryData();
  }, []);

  const getProductsData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/products");
    setProducts(data.products);
  };

  const getSingleProductData = async (id) => {
    setProduct_id(id);
    setOpenUpdateModal(true);
    await axios.get(`http://localhost:8000/api/products/${id}`).then((res) => {
      setFormData({
        name: res.data?.product?.name,
        description: res.data?.product?.description,
        catName: res.data?.product?.catName,
        subCatName: res.data?.product?.subCatName,
        brand: res.data?.product?.brand,
        price: res.data?.product?.price,
        oldPrice: res.data?.product?.oldPrice,
        category: res.data?.product?.category,
        subcategory: res.data?.product?.subcategory,
        countInStock: res.data?.product?.countInStock,
        rating: res.data?.product?.rating,
        discount: res.data?.product?.discount,
        isFeatured: res.data?.product?.isFeatured,
      });
      setRatingValue(res.data?.product?.rating);
      setIsFeature(res.data?.product?.isFeatured);
    });
  };

  const deleteProductData = async () => {
    await axios
      .delete(`http://localhost:8000/api/products/${prod_del_id}`)
      .then((res) => {
        if (res.status == 200) {
          setOpenUpdateModal2(false);
          toast("product Deleted Successfully!");
          navigate(0);
        }
      });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:8000/api/products/${product_id}`, formData)
      .then((res) => {
        if (res.status === 200) {
          toast("Product updated Sucessfully");
          navigate(0);
          console.log(formData);
        } else {
          toast("something went wrong");
          navigate(0);
        }
      });
  };

  const changeInput = (e) => {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
  };

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

    setFormData(() => ({ ...formData, subcategory: event.target.value }));
  };
  const handleChangeIsFeature = (event) => {
    setIsFeature(event.target.value);
    setFormData(() => ({ ...formData, isFeatured: event.target.value }));
  };
  const handleChangeRating = (val) => {
    setRatingValue(val);
    setFormData(() => ({ ...formData, rating: val }));
  };
  const selectedCatName = (cat) => {
    formData.catName = cat;
  };
  const selectedSubCatName = (subcat) => {
    formData.subCatName = subcat;
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            to="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/orders"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/category"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Category</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Category</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/settings"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  to="/products"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  to="/category"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Category
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="#">Products</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="/placeholder-user.jpg"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
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
        {products?.length !== 0 && products ? (
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Archived
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                    </span>
                  </Button>
                  <Link to="/products/add">
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Product
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className=" w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead className="xl:w-[16%] ">Name</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>sub Category</TableHead>
                          <TableHead>Brand</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="hidden md:table-cell xl:w-[12%]">
                            Ratings
                          </TableHead>
                          <TableHead>Stock</TableHead>
                          <TableHead>discount</TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {products?.length !== 0 &&
                          products?.map((product, ind) => {
                            return (
                              <TableRow key={ind}>
                                <TableCell className=" sm:table-cell">
                                  <img
                                    alt="Product image"
                                    className="aspect-square rounded-md object-fill"
                                    height="64"
                                    src={product.images[0]}
                                    width="64"
                                  />
                                </TableCell>
                                <TableCell className="font-medium ">
                                  {product.name}
                                </TableCell>
                                <TableCell>
                                  {product?.category?.name || "no category"}
                                </TableCell>
                                <TableCell>
                                  {product?.subCategory?.name ||
                                    "no sub category"}
                                </TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                  <Rating
                                    name="simple-controlled "
                                    value={product.rating}
                                    precision={0.5}
                                    readOnly
                                  />
                                </TableCell>
                                <TableCell>{product.countInStock}</TableCell>
                                <TableCell>{product?.discount || 0}%</TableCell>
                                <TableCell>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                      >
                                        <MoreHorizontal className="h-4 w-4" />
                                        <span className="sr-only">
                                          Toggle menu
                                        </span>
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>
                                      <DropdownMenuItem
                                        onClick={() =>
                                          getSingleProductData(product._id)
                                        }
                                      >
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          setOpenUpdateModal2(true);
                                          setProd_del_id(product._id);
                                        }}
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>{products.length} </strong> of
                      <strong> {products.length}</strong> products
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        ) : (
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 w-full h-full ">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
            </div>
            <div
              className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm py-10"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className="flex flex-col items-center gap-3 text-center py-40">
                <h3 className="text-2xl font-bold tracking-tight">
                  You have no Products
                </h3>
                <p className="text-sm text-muted-foreground">
                  start selling as soon as you add a Products.
                </p>
                <Link to="/products/add">
                  <Button className="mt-4">Add Products</Button>
                </Link>
              </div>
            </div>
          </main>
        )}
      </div>

      <Dialog
        open={openUpdateModal}
        onClose={() => {
          setOpenUpdateModal(false);
        }}
        className=" min-w-[800px]"
      >
        <div className=" p-5 w-[500px] relative ">
          <h3
            className=" absolute top-0 right-0 p-3 text-red-500 font-bold cursor-pointer"
            onClick={() => {
              setOpenUpdateModal(false);
            }}
          >
            <CloseIcon />
          </h3>
          <h3 className="text-lg font-semibold md:text-2xl text-center">
            Product Update
          </h3>
          <form
            className=" p-5 flex flex-col gap-y-10  w-full"
            onSubmit={updateProduct}
          >
            <TextField
              helperText=""
              id="demo-helper-text-aligned"
              label="product name"
              className="  w-[100%] "
              value={formData.name}
              name="name"
              onChange={changeInput}
            />
            <div className="grid w-[100%] max-w-sm items-center gap-2 ">
              <Label htmlFor="email" className="uppercase">
                description
              </Label>
              <Textarea
                placeholder="Type Description here."
                className=" w-[100%] h-40 resize-none"
                name="description"
                value={formData.description}
                onChange={changeInput}
              />
            </div>

            <div className=" lg:flex gap-3 w-[100%] space-y-5 items-baseline">
              <div className="grid w-[50%] max-w-sm items-center gap-2 ">
                <Label htmlFor="email">CATEGORY</Label>
                <Select
                  value={selectCategory}
                  onChange={handleChangeCategory}
                  className=" w-[100%]"
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
                          onClick={() => selectedCatName(cat.name)}
                        >
                          {cat.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
              <div className="grid w-[50%] max-w-sm items-center gap-2 ">
                <Label htmlFor="email" className=" uppercase">
                  Brand
                </Label>
                <TextField
                  helperText=""
                  id="demo-helper-text-aligned"
                  className=" w-[100%]  "
                  name="brand"
                  value={formData.brand}
                  onChange={changeInput}
                />
              </div>
            </div>
            <div className=" lg:flex gap-3 w-[100%] space-y-5  items-baseline">
              <div className="grid w-[50%] max-w-sm items-center gap-2">
                <Label htmlFor="email" className=" uppercase">
                  Price
                </Label>
                <TextField
                  helperText=""
                  id="demo-helper-text-aligned"
                  className=" w-[100%]  "
                  name="price"
                  value={formData.price}
                  onChange={changeInput}
                />
              </div>
              <div className="grid w-[50%] max-w-sm items-center gap-2">
                <Label htmlFor="email" className=" uppercase">
                  old Price
                </Label>
                <TextField
                  helperText=""
                  id="demo-helper-text-aligned"
                  className=" w-[100%]  "
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={changeInput}
                />
              </div>
            </div>
            <div className=" lg:flex gap-3 w-[100%] space-y-5  items-baseline">
              <div className="grid lg:w-[50%] max-w-sm items-center gap-2">
                <Label htmlFor="email" className=" uppercase">
                  isFeature
                </Label>
                <Select
                  value={isFeature}
                  onChange={handleChangeIsFeature}
                  className=" w-[100%]"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </div>
              <div className="grid w-[50%] max-w-sm items-center gap-2 ">
                <Label htmlFor="email" className=" uppercase">
                  Stock
                </Label>
                <TextField
                  helperText=""
                  id="demo-helper-text-aligned"
                  className="w-[100%]  "
                  name="countInStock"
                  onChange={changeInput}
                  value={formData.countInStock}
                />
              </div>
            </div>
            <div className="lg:flex gap-3 w-[90%] space-y-5  items-baseline">
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
                  {subCategory?.length !== 0 &&
                    subCategory?.map((cat, ind) => {
                      return (
                        <MenuItem
                          value={cat._id}
                          key={ind}
                          onClick={() => selectedSubCatName(cat.name)}
                        >
                          {cat.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </div>
            </div>
            <Button
              variant="outline"
              className=" w-[100%] bg-blue-500 hover:bg-blue-300 text-white font-bold  flex gap-x-3 items-center cursor-pointer"
              type="submit"
            >
              <UploadCloudIcon />
              Publish And View Products
            </Button>
          </form>
        </div>
      </Dialog>
      <Dialog open={openUpdateModal2} className="">
        <h2 className=" p-5">Are yore sure to Delete ? </h2>
        <div className=" p-5 flex gap-x-7 items-center">
          <Button
            className=" bg-green-500 text-white font-bold"
            onClick={() => {
              setOpenUpdateModal2(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className=" bg-red-600 text-white font-bold"
            onClick={() => {
              deleteProductData();
            }}
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
