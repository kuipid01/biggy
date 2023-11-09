/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid"; // Import UUID library
import { RenderSaleForm, RenderUpdateForm } from "./RenderUpdateForm";
const Dashboard = () => {
  // Sales State
  const [sales, setSales] = useState([]);
  const [sellerName, setSellerName] = useState("");
  const [subTotal, setSubTotal] = useState();
  const [closedTabs, setClosedTab] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [saleForm, setSaleForm] = useState(false);
  const [productsInTab, setProductsInTab] = useState([]);
  // const [addValueToPaid, setAddValueToPaid] = useState(null)
  const [tabProduct, setTabProduct] = useState({
    amount: "",
    itemName: "",
    id: "",
  });
  // Update State
  const [newPaid, setNewPaid] = useState(0);
  //   const [toBePaid, setToBePaid] = useState(0);
  const [itemToBeUpdated, setItemToBeUpdated] = useState(null);
  const [updateForm, setUpdateForm] = useState(false);
  const [toPay, setToPay] = useState(null || subTotal);
  // Sellers
  const sellers = [
    { id: 1, name: "Amara" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Mercy" },
  ];
  useEffect(() => {
    setSubTotal(
      productsInTab.reduce((acc, item) => acc + Number(item.amount), 0)
    );
  }, [productsInTab]);

  // Handle Add Sale
  const saveTabsToLocalStorage = (tabs) => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  };
  const handleAdd = (e) => {
    e.preventDefault();

    if (!sellerName || !customerName) {
      alert("Please fill in all fields with valid data.");
    } else {
        const currentDateTime = new Date();
      const newSale = {
        name: sellerName,
        totalPrice: subTotal,
        id: uuidv4(),
        paid: 0,
        toBePaid: subTotal,
        customerName: customerName,
        itemsInTab: productsInTab,
        tabOpen: true,
         timestamp: currentDateTime.toString(),
      };

      const updatedSales = [...sales, newSale];
      setSales(updatedSales);
      saveTabsToLocalStorage(updatedSales)
      setSaleForm(false);
    }
    setCustomerName("");
    setSellerName("");
  };
  // Function to load tabs from local storage
const loadTabsFromLocalStorage = () => {
    const tabsJSON = localStorage.getItem('tabs');
    return tabsJSON ? JSON.parse(tabsJSON) : [];
  };
  //Handle Update Sale
  // ...
const handleUpdate = (e) => {
    e.preventDefault();
    const newPaidAsNumber = parseFloat(newPaid); // Convert newPaid to a number
  
    if (newPaidAsNumber <= 0 || newPaidAsNumber > itemToBeUpdated.toBePaid) {
      alert("Please enter a valid amount.");
    } else {
      const updatedItem = {
        ...itemToBeUpdated,
        paid: itemToBeUpdated.paid + newPaidAsNumber, // Update the 'paid' value
        toBePaid: itemToBeUpdated.totalPrice - (itemToBeUpdated.paid + newPaidAsNumber), // Update the 'toBePaid' value
      };
  
      if (updatedItem.toBePaid <= 0) {
        updatedItem.tabOpen = false; // Set tabOpen to false if there's no money to be paid
      } else {
        updatedItem.tabOpen = true; // Set tabOpen to true if there's still money to be paid
      }
  
      // Update the sales array with the updated item
      const updatedSales = sales.map((item) =>
        item.id === itemToBeUpdated.id ? updatedItem : item
      );
  
      setUpdateForm(false); 
      setSales(updatedSales);
    }
  };
  // ...
  
  console.log(sales)  
  //   console.log(tabProduct);
  const handleAddProductTab = () => {
    const newTabProduct = {
      ...tabProduct,

      id: uuidv4(), // Generate a unique UUID and assign it to 'id'
    };

    setProductsInTab([...productsInTab, newTabProduct]); // Add the new productTab to the list
    setTabProduct({ itemName: "", amount: "", id: "" }); // Clear the input fields
  };

  const removeFromTab = (itemIn) => {
    const filterArray = productsInTab.filter(
      (item) => item.id !== itemIn.id || item.itemName !== itemIn.itemName
    );
    setProductsInTab(filterArray);
    console.log(filterArray);
  };

  // Render Update Form

  return (
    <div className="flex h-fit relative flex-col gap-[3rem] text-[#333333] bg-[#8FBC8F] justify-between">
      {saleForm && (
        <RenderSaleForm
          setSaleForm={setSaleForm}
          setSellerName={setSellerName}
          sellerName={sellerName}
          sellers={sellers}
          setCustomerName={setCustomerName}
          setTabProduct={setTabProduct}
          tabProduct={tabProduct}
          removeFromTab={removeFromTab}
          handleAddProductTab={handleAddProductTab}
          handleAdd={handleAdd}
          subTotal={subTotal}
          productsInTab={productsInTab}
        />
      )}
      {updateForm && (
        <RenderUpdateForm
          handleUpdate={handleUpdate}
          setNewPaid={setNewPaid}
          itemToBeUpdated={itemToBeUpdated}
          setUpdateForm={setUpdateForm}
        />
      )}
      <ul className="flex h-fit gap-5 justify-between items-center text-white font-bold w-full px-3 py-2 text-[15px]">
        <li className="pb-2 border-b w-fit bg-#555555] p-1 items-center flex justify-center cursor-pointer">
          Manage sellers
        </li>
        <li className="pb-2 border-b w-fit bg-#555555] p-1 items-center flex justify-center cursor-pointer ">
          Manage Goods
        </li>
        <li className="pb-2 border-b w-fit bg-#555555] p-1 items-center flex justify-center cursor-pointer ">
          Open Tabs
        </li>
        <li className="pb-2 border-b w-fit bg-#555555] p-1 items-center flex justify-center cursor-pointer ">
          Closed Tabs
        </li>
        <li className="pb-2 border-b w-fit bg-#555555] p-1 items-center flex justify-center cursor-pointer ">
          Summary
        </li>
      </ul>
      <button
        onClick={() => setSaleForm(true)}
        className="text-white   py-2 w-3/4 mx-auto uppercase font-bold px-3 rounded bg-[#555555]">
        New Tab
      </button>
      <div className="flex px-2 h-fit min-h-screen flex-col gap-3">
        <div className="flex justify-between">
          {" "}
          <span>Seller</span> <span>Total Amount In Tab</span>{" "}
          <span>Customer</span>
        </div>
        {sales?.map((item) => (
          <div
            key={item.id}
            className="font-bold gap-1 p-1 w-full border border-[#C0C0C0] flex-col flex justify-between">
            <p>7th November 2023</p>
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.totalPrice}</span>
              <span>{item.customerName}</span>
            </div>
            <div className="flex border-t pt-2 gap-3">
              {" "}
              <span>Paid:{item.paid}</span>
              <span>Left:{item.toBePaid}</span>
              {!item?.toBePaid > 0 ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    setItemToBeUpdated(item), setUpdateForm(true);
                  }}
                  className="text-white  py-1 px-3 rounded bg-[#555555]">
                  Update
                </button>
              )}
              {/* <button
                onClick={() => {
                  setItemToBeUpdated(item), setUpdateForm(true);
                }}
                className="text-white  py-1 px-3 rounded bg-[#555555]">
                Update
              </button> */}
              <div className="flex items-center">
                <span>Status:</span>{" "}
                {item?.toBePaid > 0 ? (
                  <span className="text-red-500"> Tab Open</span>
                ) : (
                  <span className="text-green-800"> Tabclosed </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
