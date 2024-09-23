import { Button } from "@/components/ui/button";
import { Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./table.css";

const ProductReviews = ({ product }) => {
  const [activeTabs, setActiveTabs] = useState(0);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="bg-white w-[100%] m-auto p-10  my-5">
      <div className="">
        <ul className=" flex gap-x-4 items-center mb-5">
          <Button
            variant="outline"
            className={`${
              activeTabs === 0 && " bg-green-300 text-white"
            } rounded-3xl`}
            onClick={() => {
              setActiveTabs(0);
            }}
          >
            Description
          </Button>

          <Button
            variant="outline"
            className={`${
              activeTabs === 1 && " bg-green-300 text-white"
            } rounded-3xl`}
            onClick={() => {
              setActiveTabs(1);
            }}
          >
            Additional info
          </Button>

          <Button
            variant="outline"
            className={`${
              activeTabs === 2 && " bg-green-300 text-white"
            } rounded-3xl`}
            onClick={() => {
              setActiveTabs(2);
            }}
          >
            Reviews (3)
          </Button>
        </ul>

        {activeTabs === 0 && <div>{product?.description}</div>}

        {activeTabs === 1 && (
          <div className=" border flex ">
            <div className=" w-full">
              <table className=" w-full ">
                <tbody>
                  <tr class="">
                    <th>Stand Up</th>
                    <td>
                      <p>35″L x 24″W x 37-45″H(front to back wheel)</p>
                    </td>
                  </tr>
                  <tr class="folded-wo-wheels">
                    <th>Folded (w/o wheels)</th>
                    <td>
                      <p>32.5″L x 18.5″W x 16.5″H</p>
                    </td>
                  </tr>
                  <tr class="folded-w-wheels">
                    <th>Folded (w/ wheels)</th>
                    <td>
                      <p>32.5″L x 24″W x 18.5″H</p>
                    </td>
                  </tr>
                  <tr class="door-pass-through">
                    <th>Door Pass Through</th>
                    <td>
                      <p>24</p>
                    </td>
                  </tr>
                  <tr class="frame">
                    <th>Frame</th>
                    <td>
                      <p>Aluminum</p>
                    </td>
                  </tr>
                  <tr class="weight-wo-wheels">
                    <th>Weight (w/o wheels)</th>
                    <td>
                      <p>20 LBS</p>
                    </td>
                  </tr>
                  <tr class="weight-capacity">
                    <th>Weight Capacity</th>
                    <td>
                      <p>60 LBS</p>
                    </td>
                  </tr>
                  <tr class="width">
                    <th>Width</th>
                    <td>
                      <p>24″</p>
                    </td>
                  </tr>
                  <tr class="handle-height-ground-to-handle">
                    <th>Handle height (ground to handle)</th>
                    <td>
                      <p>37-45″</p>
                    </td>
                  </tr>
                  <tr class="wheels">
                    <th>Wheels</th>
                    <td>
                      <p>12″ air / wide track slick tread</p>
                    </td>
                  </tr>
                  <tr class="seat-back-height">
                    <th>Seat back height</th>
                    <td>
                      <p>21.5″</p>
                    </td>
                  </tr>
                  <tr class="head-room-inside-canopy">
                    <th>Head room (inside canopy)</th>
                    <td>
                      <p>25″</p>
                    </td>
                  </tr>
                  <tr class="pa_color">
                    <th>Color</th>
                    <td>
                      <p>Black, Blue, Red, White</p>
                    </td>
                  </tr>
                  <tr class="pa_size">
                    <th>Size</th>
                    <td>
                      <p>M, S</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTabs === 2 && (
          <div className="">
            <div className="">
              <div className="">
                <h3 className=" font-semibold my-5">
                  Customer questions & answers
                </h3>

                <div className=" flex gap-x-8">
                  <div className=" flex border border-gray-400 p-8 w-[700px]">
                    <div className=" flex flex-col items-center gap-2">
                      <div className="rounded-circle">
                        <img
                          src="https://wp.alithemes.com/html/nest/demo/assets/imgs/blog/author-2.png"
                          className=" w-[200px]"
                        />
                      </div>
                      <span className=" font-bold ">Vani</span>
                    </div>

                    <div className=" pl-5">
                      <div className="flex align-items-center w-100">
                        <h5 className="text-light">12/5/2024</h5>
                        <div className="ml-auto">
                          <Rating
                            name="half-rating-read"
                            value={4.5}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                      </div>

                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Vel deserunt nulla, placeat odit tenetur ducimus autem
                        quia doloribus consequatur eligendi corrupti deleniti,
                        recusandae ab laboriosam beatae sint commodi, ipsa vero.
                      </p>
                    </div>
                  </div>
                  <div className=" pl-8 ">
                    <h4>Customer reviews</h4>

                    <div className="flex  items-center mt-2">
                      <Rating
                        name="half-rating-read"
                        defaultValue={4.5}
                        precision={0.5}
                        readOnly
                      />
                      <strong className="ml-3">4.8 out of 5</strong>
                    </div>

                    <br />
                  </div>
                </div>

                <form className="reviewForm">
                  <h4 className=" my-8 text-[25px]">Add a review</h4>
                  <div className="form-group">
                    <textarea
                      placeholder="Write a Review"
                      name="review"
                      className=" border p-5 rounded-lg resize-none"
                      cols={70}
                      rows={9}
                    ></textarea>
                  </div>
                  <div className=" flex gap-x-4 items-center my-8">
                    <div className="">
                      <input
                        type="text"
                        className=" border py-2 px-8"
                        placeholder="Name"
                        name="userName"
                      />
                    </div>

                    <div className="">
                      <div className="">
                        <Rating name="rating" value={4.3} precision={0.5} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <Button
                      type="submit"
                      variant="outline"
                      className=" bg-green-400 text-white hover:bg-green-300"
                    >
                      Submit Review
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
