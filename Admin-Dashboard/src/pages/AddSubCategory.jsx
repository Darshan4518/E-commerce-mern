import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import LoadingBar from "react-top-loading-bar";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  UploadCloudIcon,
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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-dropdown-menu";
import { MenuItem, Select } from "@mui/material";
import { CategoryOutlined } from "@mui/icons-material";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TbCategory } from "react-icons/tb";

export function AddSubCategory() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState({
    category: "",
    name: "",
  });
  const [selectCategory, setSelectCategory] = useState("");
  const handleChangeCategory = (event) => {
    setSelectCategory(event.target.value);
    setFormData(() => ({ ...formData, category: event.target.value }));
  };
  const changeInput = (e) => {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
  };

  const addSubCategory = async (e) => {
    setProgress(progress + 10);
    e.preventDefault();

    await axios
      .post("http://localhost:8000/api/subcategory/create", formData)
      .then((res) => {
        if (res.status === 200) {
          setProgress(100);
          toast("Category Addedd Sucessfully");
          navigate(0);
        } else {
          toast("something went wrong");
          navigate(0);
        }
      });
  };

  const [categories, setCategory] = useState([]);
  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/category");
    setCategory(data.categories);
  };
  return (
    <>
      <LoadingBar
        color="#f11946"
        height={4}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
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
                  to="/orders"
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
                  to="/category"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <TbCategory />
                  Category
                </Link>
              </nav>
            </div>
          </div>
        </div>
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
                    to="/category"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <TbCategory className="h-5 w-5" />
                    Category
                  </Link>
                  <Link
                    to="/products"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <TbCategory className="h-5 w-5" />
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
                    <Link to="/category">Categories</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="#">Add Categories</Link>
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
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:text-2xl">
                Category Upload
              </h1>
            </div>
            <div
              className="flex flex-1  rounded-lg border border-dashed shadow-sm"
              x-chunk="dashboard-02-chunk-1"
            >
              <div className=" md:flex flex-1 justify-between w-full">
                <form
                  className="  p-5 flex flex-col gap-y-10  lg:w-[60%] w-[100%]"
                  onSubmit={addSubCategory}
                >
                  <div className="grid  max-w-sm items-center gap-2 lg:w[70%] xl:w-[70%] w-[100%]">
                    <Label htmlFor="email">CATEGORY</Label>
                    <Select
                      value={selectCategory}
                      onChange={handleChangeCategory}
                      className=" lg:w-[70%] xl:w-[100%] w-[100%] "
                    >
                      <MenuItem value="">
                        <em className="">None</em>
                      </MenuItem>
                      {categories?.length !== 0 &&
                        categories?.map((cat, ind) => {
                          return (
                            <MenuItem value={cat._id} key={ind}>
                              {cat.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                  <TextField
                    helperText=""
                    id="demo-helper-text-aligned"
                    label="SubCategory name"
                    className=" lg:w-[70%] w-[80%]"
                    name="name"
                    onChange={changeInput}
                  />
                  <Button
                    variant="outline"
                    className=" lg:w-[70%] w-[80%] bg-blue-500 hover:bg-blue-300 text-white font-bold  flex gap-x-3 items-center cursor-pointer"
                    type="submit"
                    disabled={
                      formData.name == "" ||
                      formData.images == "" ||
                      formData.color == ""
                    }
                  >
                    <UploadCloudIcon />
                    Publish And View
                  </Button>
                </form>
                <div className="  w-[40%] hidden lg:block">
                  <img
                    src="https://virtualitpark.com/wp-content/uploads/2021/11/hero-3-1-copy-9.png"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
