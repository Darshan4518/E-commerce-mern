import { Link, useNavigate } from "react-router-dom";
import {
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
} from "lucide-react";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Dialog from "@mui/material/Dialog";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { MenuItem, Select } from "@mui/material";
import { TbCategory } from "react-icons/tb";

export function SubCategory() {
  const navigate = useNavigate();
  const [subCat_id, setSubCat_id] = useState("");
  const [subcat_del_id, setSubCat_del_id] = useState("");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openUpdateModal2, setOpenUpdateModal2] = useState(false);
  const [SubCategories, setSubCategory] = useState([]);
  const [selectCategory, setSelectCategory] = useState("");

  const [category, setCategory] = useState([]);

  const [formData, setFormData] = useState({
    category: "",
    name: "",
  });

  useEffect(() => {
    getSubCategoryData();
    getCategoryData();
  }, []);
  const getCategoryData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/category");
    setCategory(data.categories);
  };

  const getSubCategoryData = async () => {
    const { data } = await axios.get("http://localhost:8000/api/subcategory");
    setSubCategory(data.subCategory);
  };

  const editCategoryData = async (id) => {
    setSubCat_id(id);
    setOpenUpdateModal(true);
    await axios
      .get(`http://localhost:8000/api/subcategory/${id}`)
      .then((res) => {
        setFormData({
          category: res.data.category,
          name: res.data.name,
        });
      });
  };

  const changeInput = (e) => {
    setFormData(() => ({ ...formData, [e.target.name]: e.target.value }));
  };

  const updateCategory = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:8000/api/subcategory/${subCat_id}`, formData)
      .then((res) => {
        if (res.status == 200) {
          toast("SubCategory Updated Successfully!");
          navigate(0);
        }
      });
  };

  const deleteCategory = async () => {
    await axios
      .delete(`http://localhost:8000/api/subcategory/${subcat_del_id}`)
      .then((res) => {
        if (res.status == 200) {
          setOpenUpdateModal2(false);
          toast("Category Deleted Successfully!");
          navigate(0);
        }
      });
  };
  const handleChangeCategory = (event) => {
    setSelectCategory(event.target.value);
    setFormData(() => ({ ...formData, category: event.target.value }));
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
                  to="/products"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/category"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <TbCategory className="h-5 w-5" />
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
                  to="/products"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <TbCategory className="h-5 w-5" />
                  category
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
                  <Link to="/category">categories</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="#">SubCategories</Link>
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
        {SubCategories.length !== 0 ? (
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

                  <Link to="/category/add">
                    <Button size="sm" className="h-8 gap-1">
                      <PlusCircle className="h-3.5 w-3.8" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Add Category
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>SubCategory</CardTitle>
                    <CardDescription>Manage your SubCategory .</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className=" md:w-[200px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead className="md:w-[300px]">Name</TableHead>
                          <TableHead className="md:w-[300px]">
                            Sub Category
                          </TableHead>

                          <TableHead className="md:w-[300px]">Action</TableHead>

                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {SubCategories.length !== 0
                          ? SubCategories?.map((cat, ind) => {
                              return (
                                <TableRow key={ind}>
                                  <TableCell className="  sm:table-cell">
                                    <img
                                      alt="Product image"
                                      className="aspect-square rounded-md object-cover"
                                      height="64"
                                      src={cat.category.images[0]}
                                      width="64"
                                    />
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {cat.category.name}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {cat.name}
                                  </TableCell>

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
                                            editCategoryData(cat._id)
                                          }
                                        >
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                          onClick={() => {
                                            setOpenUpdateModal2(true);
                                            setSubCat_del_id(cat._id);
                                          }}
                                        >
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          : null}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>{SubCategories.length} </strong> of
                      <strong> {SubCategories.length} </strong>
                      products
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
                  You have no Category
                </h3>
                <p className="text-sm text-muted-foreground">
                  start selling as soon as you add a Category.
                </p>
                <Link to="/category/add">
                  <Button className="mt-4">Add Category</Button>
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
      >
        <div className=" p-5 md:w-[600px] relative ">
          <h3
            className=" absolute top-0 right-0 p-3 text-red-500 font-bold cursor-pointer"
            onClick={() => {
              setOpenUpdateModal(false);
            }}
          >
            <CloseIcon />
          </h3>
          <h3 className="text-lg font-semibold md:text-2xl text-center">
            Category Update
          </h3>
          <form
            className="  p-5 flex flex-col gap-y-10  "
            onSubmit={updateCategory}
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
                {category?.length !== 0 &&
                  category?.map((cat, ind) => {
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
              label="Category name"
              className="  "
              name="name"
              value={formData.name}
              onChange={changeInput}
            />

            <Button
              variant="outline"
              className="  bg-blue-500 hover:bg-blue-300 text-white font-bold  flex gap-x-3 items-center"
              type="submit"
            >
              <UploadCloudIcon />
              Update Category
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
              deleteCategory();
            }}
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
