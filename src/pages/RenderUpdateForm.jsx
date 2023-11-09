/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai";

export const RenderUpdateForm = ({
  itemToBeUpdated,
  handleUpdate,
  setNewPaid,
  setUpdateForm,
}) => {
  return (
    <div className="fixed top-0 flex justify-center items-center h-screen w-full left-0 bg-white">
      <AiOutlineClose
        onClick={() => setUpdateForm(false)}
        className="text-3xl text-red absolute right-5 top-5 cursor-pointer"
      />
      <form className="w-5/6 h-fit py-4 flex flex-col gap-3">
        <div className="flex flex-col gap-5">
          <div className="flex gap-1">
            <span>Close This Tab (Means Customer has paid)</span>
            <div className="w-[50px] cursor-pointer h-[50px] border-2 border-green-600 bg-transparent flex items-center justify-center">
              <div className="w-[30px] h-[30px] bg-green-500"></div>
            </div>
          </div>
        </div>
        <span className="bg-gray-600 p-3 text-white">
          Items Price: {itemToBeUpdated?.price}
        </span>
        <span className="bg-gray-600 p-3 text-white">
          Amount Now Paid: {itemToBeUpdated?.paid}
        </span>
        <span className="bg-gray-600 p-3 text-white">
          Amount Left to be paid:{" "}
          {itemToBeUpdated?.totalPrice - itemToBeUpdated?.paid}
        </span>
        <p>Items Bought</p>
        {itemToBeUpdated?.itemsInTab?.map((item) => (
          <p key={item.id} className="flex bg-gray-600 p-3 text-white  gap-3">
            {item.itemName} : {item.amount}
          </p>
        ))}
        <h1 className="text-2xl mb-2">Update Price</h1>
        <label htmlFor="paid">How Much Customer is Paying Paid</label>
        <input
          onChange={(e) => setNewPaid(e.target.value)}
          type="number"
          placeholder="Enter Price"
          className="w-full border-[#555555] p-2 border outline-none"
        />
        {/* Left input field if needed */}
        {/* <label htmlFor="toBePaid">Left</label>
             <input
               onChange={(e) => setToBePaid(parseInt(e.target.value))}
               type="number"
               placeholder="Enter Price"
               className="w-full border-[#555555] p-2 border outline-none"
             /> */}
        <button
          onClick={(e) => handleUpdate(e)}
          className="text-white py-2 w-3/4 mx-auto uppercase font-bold px-3 rounded bg-[#555555]">
          Update Sale
        </button>
      </form>
    </div>
  );
};
export const RenderSaleForm = ({
  setSaleForm,
  productsInTab,
  subTotal,
  handleAdd,
  handleAddProductTab,
  removeFromTab,
  tabProduct,
  setTabProduct,
  sellers,
  setCustomerName,
  sellerName,
  setSellerName,
}) => {
  return (
    <div className="absolute top-0 z-[999999] bg-white flex justify-center items-center h-full w-full left-0 ">
      <AiOutlineClose
        onClick={() => setSaleForm(false)}
        className="text-3xl text-red absolute right-5 top-5 cursor-pointer"
      />
      <div className="w-5/6 h-fit py-4 flex flex-col gap-3">
        <h1 className="text-2xl mb-2">New Tab</h1>
        <label htmlFor="customer">Customer Name</label>
        <input
          onChange={(e) => setCustomerName(e.target.value)}
          type="text"
          className="w-full p-2 border border-[#555555] outline-none"
          placeholder="Customer Name"
        />
        <label htmlFor="seller">Seller Name</label>
        <select
          value={sellerName}
          onChange={(e) => setSellerName(e.target.value)}
          className="p-2 border-[#555555] bg-white border mb-2"
          name="seller"
          id="seller">
          <option value="">Choose seller</option>
          {sellers.map((seller) => (
            <option key={seller.id} value={seller.name}>
              {seller.name}
            </option>
          ))}
        </select>

     
        <span>Add Product Sold and their Price</span>
        <div className="flex bg-[#555555] p-2 w-full gap-2 flex-wrap">
          <input
            className="flex-1 border-[#555555] p-2 border outline-none"
            type="text"
            onChange={(e) =>
              setTabProduct({ ...tabProduct, itemName: e.target.value })
            }
            value={tabProduct.itemName}
            placeholder="Product Name"
          />
          <input
            onChange={(e) => {
              e.preventDefault();
              setTabProduct({ ...tabProduct, amount: e.target.value });
            }}
            value={tabProduct.amount}
            type="number"
            placeholder="Product Price"
            className="flex-1 border-[#555555] p-2 border outline-none"
          />
            <div
          className="text-[#555555] cursor-pointer py-2 px-[10px] mx-auto uppercase font-bold  rounded bg-white"
          onClick={handleAddProductTab}>
          Add This Product
        </div>
        </div>
        {productsInTab?.map((item) => (
          <div
            key={item.id}
            className="w-full  bg-gray-600 p-x relative h-full ">
            <p className=" mb-3 p-2 rounded text-white ">
              {" "}
              {item.itemName} : {item.amount}{" "}
            </p>
            <AiOutlineClose
              onClick={() => removeFromTab(item)}
              className="absolute right-2 top-1/2 transform  text-xl text-red-400 cursor-pointer -translate-y-1/2"
            />
          </div>
        ))}
        <p>Total Price : {subTotal} </p>
      

        <button
          onClick={(e) => handleAdd(e)}
          className="text-white py-2 w-full mx-auto uppercase font-bold px-3 rounded bg-[#555555]">
          Register Tab
        </button>
      </div>
    </div>
  );
};
