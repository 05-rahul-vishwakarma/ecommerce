'use client'
import MenuFour from "@/components/Header/MenuFour";
import BreadCrumbPart from "@/components/Shop/BreadCrumbPart";
import React, { useState, useEffect } from "react";
import DefaultOrder from "@/components/Orders/DefaultOrder";
import { getPurchasedProduct } from "@/api/purchaseApis/purchasePost";
import { getProductListBySKData } from "@/api/productApis/getPostApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    async function fetchOrdersAndProducts() {
      setLoading(true);
      try {
        const ordersResponse = await getPurchasedProduct();
        setOrders(ordersResponse || []); 
        const updatedOrders = await Promise.all(
          ordersResponse.map(async (order) => {
            const product = await getProductListBySKData(order?.productSK);
            const data = product?.data?.items
            return { ...order, data };
          })
        );
        setOrders(updatedOrders); // Set merged data
      } catch (error) {
        console.error("Error fetching orders or products:", error);
        setOrders([]); // Fallback in case of error
      } finally {
        setLoading(false); // Stop the loader
      }
    }

    fetchOrdersAndProducts();
  }, []);

  return (
    <>
      <div id="header" className="relative w-full">
        <MenuFour props="bg-transparent" />
      </div>
      <BreadCrumbPart pageName={"Orders"} />

      <div className="container mx-auto p-4">
        <h1 className="text-center text-4xl font-bold mb-10">Your Order History</h1>
        {loading ? (
          <p className="text-gray-500 text-center">Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-center">You have no orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order,i) => (
              <DefaultOrder key={i} order={order} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
