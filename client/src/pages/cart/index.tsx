export default function Cart() {
  return (
    <>
      <section className="pt-24 bg-gray-100 font-poppins ">
        <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
          <div>
            <h2 className="mb-8 text-4xl font-bold ">Your Cart</h2>
            {/* Start cart */}
            <div className="p-6 mb-8 border bg-gray-50 ">
              <div className=" w-fit mb-4 bg-slate-100 rounded p-2">
                <div className="flex items-center no-underline hover:underline text-black ">
                  <label htmlFor="" className="flex items-center ">
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                  </label>
                  {/* img size 32x32 */}
                  <img
                    alt="Placeholder"
                    className="block rounded-full h-8 w-8"
                    src={require("../../app/assets/images/coverPage5.jpg")}
                  />
                  <a href="" className="ml-2 text-sm font-bold">
                    Shop name
                  </a>
                </div>
              </div>
              <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:justify-between md:mb-8 ">
                <div className=" md:flex-row md:flex-initial w-full px-4 mb-6 md:w-1/3  md:mb-0 text-center">
                  <h2 className="font-bold text-gray-500 mr-12 ">Product</h2>
                </div>
                <div className="md:flex-row md:flex-initial hidden px-4 lg:block lg:w-2/12">
                  <h2 className="font-bold text-gray-500 ml-3">
                    License plates
                  </h2>
                </div>

                <div className="md:flex-row md:flex-initial w-auto px-4 md:w-1/6 lg:w-2/12 ">
                  <h2 className="font-bold text-gray-500 ml-5 ">Price</h2>
                </div>
              </div>

              <div className=" py-4 mb-8 border-t border-b border-gray-200 scrollbar overflow-y-auto overflow-x-hidden max-h-[100vw] md:max-h-[21vw] ">
                {/* Item start */}
                {/* <div className="flex flex-wrap w-full  items-center justify-between ">
                  <div className=" md:flex-row md:flex-initial md:pl-4 w-1/12 h-full md:w-12 pl-">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  <div className="flex flex-col md:flex-row md:justify-between flex-wrap items-center pt-3 w-11/12 border rounded-sm md:pl-4 ">
                    <div className="w-full px-4 mb-6 md:w-1/2 lg:w-2/5 md:mb-0 md:flex-initial">
                      <div className="flex flex-col md:flex-row   items-center -mx-4 md:w-2/3 ">
                        <div className="w-full mb-3 md:w-fit ">
                          <div className="w-2/3 h-2/3 md:h-24 md:w-24 mx-auto">
                            <img
                              src="https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full mx-auto text-center ">
                          <h2 className="mb-2 text-xl font-bold ml-2">
                            Wave rsx 110
                          </h2>
                          <p className="text-gray-500">Honda</p>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 lg:block lg:w-2/12  md:flex-initial ">
                      <p className="text-lg font-bold text-black text-center">
                        65L1-24084
                      </p>
                    </div>

                    <div className=" w-auto px-4 text-center md:w-1/6 lg:w-2/12  md:flex-initial ">
                      <p className="text-lg font-bold text-blue-500 ">$99.00</p>
                    </div>
                  </div>
                </div> */}
                {/* Item End */}
                {/* Item start */}
                <div className="flex flex-wrap w-full  items-center justify-center mb-2 ">
                  <div className=" md:pl-4 w-1/12 h-full md:w-12 pl-">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  <div className="flex flex-col md:flex-row flex-wrap items-center pt-3 w-11/12 border rounded-sm md:pl-4 ">
                    <div className="w-full px-4 mb-6 md:w-1/2 lg:w-2/5 md:mb-0">
                      <div className="flex flex-col md:flex-row items-center -mx-4 md:w-2/3">
                        <div className="w-full mb-3 md:w-fit">
                          <div className="w-2/3 h-2/3 md:h-24 md:w-24 mx-auto">
                            <img
                              src="https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full mx-auto text-center">
                          <h2 className="mb-2 text-xl font-bold ml-2">
                            Wave rsx 110
                          </h2>
                          <p className="text-gray-500">Honda</p>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-black text-center">
                        65L1-24084
                      </p>
                    </div>

                    <div className=" w-auto px-4 text-center md:w-1/6 lg:w-2/12 ">
                      <p className="text-lg font-bold text-blue-500 ">$99.00</p>
                    </div>
                  </div>
                </div>
                {/* Item End */}
                {/* Item start */}
                <div className="flex flex-wrap w-full  items-center justify-center mb-2 ">
                  <div className=" md:pl-4 w-1/12 h-full md:w-12 pl-">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  <div className="flex flex-col md:flex-row flex-wrap items-center pt-3 w-11/12 border rounded-sm md:pl-4 ">
                    <div className="w-full px-4 mb-6 md:w-1/2 lg:w-2/5 md:mb-0">
                      <div className="flex flex-col md:flex-row items-center -mx-4 md:w-2/3">
                        <div className="w-full mb-3 md:w-fit">
                          <div className="w-2/3 h-2/3 md:h-24 md:w-24 mx-auto">
                            <img
                              src="https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full mx-auto text-center">
                          <h2 className="mb-2 text-xl font-bold ml-2">
                            Wave rsx 110
                          </h2>
                          <p className="text-gray-500">Honda</p>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-black text-center">
                        65L1-24084
                      </p>
                    </div>

                    <div className=" w-auto px-4 text-center md:w-1/6 lg:w-2/12 ">
                      <p className="text-lg font-bold text-blue-500 ">$99.00</p>
                    </div>
                  </div>
                </div>
                {/* Item End */}
                {/* Item start */}
                <div className="flex flex-wrap w-full  items-center justify-center mb-2 ">
                  <div className=" md:pl-4 w-1/12 h-full md:w-12 pl-">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  <div className="flex flex-col md:flex-row flex-wrap items-center pt-3 w-11/12 border rounded-sm md:pl-4 ">
                    <div className="w-full px-4 mb-6 md:w-1/2 lg:w-2/5 md:mb-0">
                      <div className="flex flex-col md:flex-row items-center -mx-4 md:w-2/3">
                        <div className="w-full mb-3 md:w-fit">
                          <div className="w-2/3 h-2/3 md:h-24 md:w-24 mx-auto">
                            <img
                              src="https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full mx-auto text-center">
                          <h2 className="mb-2 text-xl font-bold ml-2">
                            Wave rsx 110
                          </h2>
                          <p className="text-gray-500">Honda</p>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-black text-center">
                        65L1-24084
                      </p>
                    </div>

                    <div className=" w-auto px-4 text-center md:w-1/6 lg:w-2/12 ">
                      <p className="text-lg font-bold text-blue-500 ">$99.00</p>
                    </div>
                  </div>
                </div>
                {/* Item End */}
                {/* Item start */}
                <div className="flex flex-wrap w-full  items-center justify-center mb-2 ">
                  <div className=" md:pl-4 w-1/12 h-full md:w-12 pl-">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  <div className="flex flex-col md:flex-row flex-wrap items-center pt-3 w-11/12 border rounded-sm md:pl-4 ">
                    <div className="w-full px-4 mb-6 md:w-1/2 lg:w-2/5 md:mb-0">
                      <div className="flex flex-col md:flex-row items-center -mx-4 md:w-2/3">
                        <div className="w-full mb-3 md:w-fit">
                          <div className="w-2/3 h-2/3 md:h-24 md:w-24 mx-auto">
                            <img
                              src="https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full mx-auto text-center">
                          <h2 className="mb-2 text-xl font-bold ml-2">
                            Wave rsx 110
                          </h2>
                          <p className="text-gray-500">Honda</p>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-black text-center">
                        65L1-24084
                      </p>
                    </div>

                    <div className=" w-auto px-4 text-center md:w-1/6 lg:w-2/12 ">
                      <p className="text-lg font-bold text-blue-500 ">$99.00</p>
                    </div>
                  </div>
                </div>
                {/* Item End */}
                {/* Item start */}
                <div className="flex flex-wrap w-full  items-center justify-center mb-2 ">
                  <div className=" md:pl-4 w-1/12 h-full md:w-12 pl-">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  <div className="flex flex-col md:flex-row flex-wrap items-center pt-3 w-11/12 border rounded-sm md:pl-4 ">
                    <div className="w-full px-4 mb-6 md:w-1/2 lg:w-2/5 md:mb-0">
                      <div className="flex flex-col md:flex-row items-center -mx-4 md:w-2/3">
                        <div className="w-full mb-3 md:w-fit">
                          <div className="w-2/3 h-2/3 md:h-24 md:w-24 mx-auto">
                            <img
                              src="https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full mx-auto text-center">
                          <h2 className="mb-2 text-xl font-bold ml-2">
                            Wave rsx 110
                          </h2>
                          <p className="text-gray-500">Honda</p>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-black text-center">
                        65L1-24084
                      </p>
                    </div>

                    <div className=" w-auto px-4 text-center md:w-1/6 lg:w-2/12 ">
                      <p className="text-lg font-bold text-blue-500 ">$99.00</p>
                    </div>
                  </div>
                </div>
                {/* Item End */}
                {/* Item start */}
                <div className="flex flex-wrap w-full  items-center justify-center mb-2 ">
                  <div className=" md:pl-4 w-1/12 h-full md:w-12 pl-">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  <div className="flex flex-col md:flex-row flex-wrap items-center pt-3 w-11/12 border rounded-sm md:pl-4 ">
                    <div className="w-full px-4 mb-6 md:w-1/2 lg:w-2/5 md:mb-0">
                      <div className="flex flex-col md:flex-row items-center -mx-4 md:w-2/3">
                        <div className="w-full mb-3 md:w-fit">
                          <div className="w-2/3 h-2/3 md:h-24 md:w-24 mx-auto">
                            <img
                              src="https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full mx-auto text-center">
                          <h2 className="mb-2 text-xl font-bold ml-2">
                            Wave rsx 110
                          </h2>
                          <p className="text-gray-500">Honda</p>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-black text-center">
                        65L1-24084
                      </p>
                    </div>

                    <div className=" w-auto px-4 text-center md:w-1/6 lg:w-2/12 ">
                      <p className="text-lg font-bold text-blue-500 ">$99.00</p>
                    </div>
                  </div>
                </div>
                {/* Item End */}
              </div>
              <div className="flex justify-end">
                <p className="mr-2 font-bold text-black text-2xl"> Total: </p>
                <p className="font-bold text-blue-500 text-2xl"> 1000 </p>
              </div>
            </div>
            {/* End cart */}
            {/* Start cart */}
            <div className="p-6 mb-8 border bg-gray-50 ">
              <div className=" w-fit mb-4 bg-slate-100 rounded p-2">
                <div className="flex items-center no-underline hover:underline text-black ">
                  <label htmlFor="" className="flex items-center ">
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                  </label>
                  {/* img size 32x32 */}
                  <img
                    alt="Placeholder"
                    className="block rounded-full h-8 w-8"
                    src={require("../../app/assets/images/coverPage5.jpg")}
                  />
                  <a href="" className="ml-2 text-sm font-bold">
                    Shop name
                  </a>
                </div>
              </div>
              <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:justify-between md:mb-8 ">
                <div className=" md:flex-row md:flex-initial w-full px-4 mb-6 md:w-1/3  md:mb-0 text-center">
                  <h2 className="font-bold text-gray-500 mr-12 ">Product</h2>
                </div>
                <div className="md:flex-row md:flex-initial hidden px-4 lg:block lg:w-2/12">
                  <h2 className="font-bold text-gray-500 ml-3">
                    License plates
                  </h2>
                </div>

                <div className="md:flex-row md:flex-initial w-auto px-4 md:w-1/6 lg:w-2/12 ">
                  <h2 className="font-bold text-gray-500 ml-5 ">Price</h2>
                </div>
              </div>

              <div className=" py-4 mb-8 border-t border-b border-gray-200 scrollbar overflow-y-auto overflow-x-hidden max-h-[100vw] md:max-h-[21vw] ">
                {/* Item start */}
                <div className="flex flex-wrap w-full  items-center justify-center mb-2 ">
                  <div className=" md:pl-4 w-1/12 h-full md:w-12 pl-">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  <div className="flex flex-col md:flex-row flex-wrap items-center pt-3 w-11/12 border rounded-sm md:pl-4 ">
                    <div className="w-full px-4 mb-6 md:w-1/2 lg:w-2/5 md:mb-0">
                      <div className="flex flex-col md:flex-row items-center -mx-4 md:w-2/3">
                        <div className="w-full mb-3 md:w-fit">
                          <div className="w-2/3 h-2/3 md:h-24 md:w-24 mx-auto">
                            <img
                              src="https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full mx-auto text-center">
                          <h2 className="mb-2 text-xl font-bold ml-2">
                            Wave rsx 110
                          </h2>
                          <p className="text-gray-500">Honda</p>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-black text-center">
                        65L1-24084
                      </p>
                    </div>

                    <div className=" w-auto px-4 text-center md:w-1/6 lg:w-2/12 ">
                      <p className="text-lg font-bold text-blue-500 ">$99.00</p>
                    </div>
                  </div>
                </div>
                {/* Item End */}
                {/* Item start */}
                <div className="flex flex-wrap w-full  items-center justify-center mb-2 ">
                  <div className=" md:pl-4 w-1/12 h-full md:w-12 pl-">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  <div className="flex flex-col md:flex-row flex-wrap items-center pt-3 w-11/12 border rounded-sm md:pl-4 ">
                    <div className="w-full px-4 mb-6 md:w-1/2 lg:w-2/5 md:mb-0">
                      <div className="flex flex-col md:flex-row items-center -mx-4 md:w-2/3">
                        <div className="w-full mb-3 md:w-fit">
                          <div className="w-2/3 h-2/3 md:h-24 md:w-24 mx-auto">
                            <img
                              src="https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full mx-auto text-center">
                          <h2 className="mb-2 text-xl font-bold ml-2">
                            Wave rsx 110
                          </h2>
                          <p className="text-gray-500">Honda</p>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-black text-center">
                        65L1-24084
                      </p>
                    </div>

                    <div className=" w-auto px-4 text-center md:w-1/6 lg:w-2/12 ">
                      <p className="text-lg font-bold text-blue-500 ">$99.00</p>
                    </div>
                  </div>
                </div>
                {/* Item End */}
              </div>
              <div className="flex justify-end">
                <p className="mr-2 font-bold text-black text-2xl"> Total: </p>
                <p className="font-bold text-blue-500 text-2xl"> 1000 </p>
              </div>
            </div>
            {/* End cart */}
            {/* Start cart */}
            <div className="p-6 mb-8 border bg-gray-50 ">
              <div className=" w-fit mb-4 bg-slate-100 rounded p-2">
                <div className="flex items-center no-underline hover:underline text-black ">
                  <label htmlFor="" className="flex items-center ">
                    <input type="checkbox" className="w-4 h-4 mr-2" />
                  </label>
                  {/* img size 32x32 */}
                  <img
                    alt="Placeholder"
                    className="block rounded-full h-8 w-8"
                    src={require("../../app/assets/images/coverPage5.jpg")}
                  />
                  <a href="" className="ml-2 text-sm font-bold">
                    Shop name
                  </a>
                </div>
              </div>
              <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:justify-between md:mb-8 ">
                <div className=" md:flex-row md:flex-initial w-full px-4 mb-6 md:w-1/3  md:mb-0 text-center">
                  <h2 className="font-bold text-gray-500 mr-12 ">Product</h2>
                </div>
                <div className="md:flex-row md:flex-initial hidden px-4 lg:block lg:w-2/12">
                  <h2 className="font-bold text-gray-500 ml-3">
                    License plates
                  </h2>
                </div>

                <div className="md:flex-row md:flex-initial w-auto px-4 md:w-1/6 lg:w-2/12 ">
                  <h2 className="font-bold text-gray-500 ml-5 ">Price</h2>
                </div>
              </div>

              <div className=" py-4 mb-8 border-t border-b border-gray-200 scrollbar overflow-y-auto overflow-x-hidden max-h-[100vw] md:max-h-[21vw] ">
                {/* Item start */}
                <div className="flex flex-wrap w-full  items-center justify-center mb-2 ">
                  <div className=" md:pl-4 w-1/12 h-full md:w-12 pl-">
                    <input type="checkbox" className="mr-2" />
                  </div>

                  <div className="flex flex-col md:flex-row flex-wrap items-center pt-3 w-11/12 border rounded-sm md:pl-4 ">
                    <div className="w-full px-4 mb-6 md:w-1/2 lg:w-2/5 md:mb-0">
                      <div className="flex flex-col md:flex-row items-center -mx-4 md:w-2/3">
                        <div className="w-full mb-3 md:w-fit">
                          <div className="w-2/3 h-2/3 md:h-24 md:w-24 mx-auto">
                            <img
                              src="https://i.postimg.cc/CLWkvq6f/pexels-markus-spiske-1002638.jpg"
                              alt=""
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full mx-auto text-center">
                          <h2 className="mb-2 text-xl font-bold ml-2">
                            Wave rsx 110
                          </h2>
                          <p className="text-gray-500">Honda</p>
                        </div>
                      </div>
                    </div>
                    <div className=" px-4 lg:block lg:w-2/12">
                      <p className="text-lg font-bold text-black text-center">
                        65L1-24084
                      </p>
                    </div>

                    <div className=" w-auto px-4 text-center md:w-1/6 lg:w-2/12 ">
                      <p className="text-lg font-bold text-blue-500 ">$99.00</p>
                    </div>
                  </div>
                </div>
                {/* Item End */}
              </div>
              <div className="flex justify-end">
                <p className="mr-2 font-bold text-black text-2xl"> Total: </p>
                <p className="font-bold text-blue-500 text-2xl"> 1000 </p>
              </div>
            </div>
            {/* End cart */}
          </div>
        </div>
        <div className="sticky bottom-0 flex flex-col items-center justify-center ">
          <div className="bg-gray-200 flex flex-col items-center justify-center mt-5 p-3">
            <div className="flex justify-end">
              <p className="mr-2 font-bold text-black text-2xl">
                Total payment:
              </p>
              <p className="font-bold text-blue-500 text-2xl mr-2">10000000</p>
            </div>
            <div className="mt-3 flex justify-center">
              <a
                href="/check-out/1"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500"
              >
                Checkout
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
