'use client';

import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';

import { useCurrency } from '@/components/header/CurrencyProvider'; 
import { Order } from '@/lib/models/OrderModel';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const MyOrders = () => {
  const { data: orders, error } = useSWR<Order[]>('/api/orders/mine', fetcher);
  const { currency, convertPrice } = useCurrency();

  const isLoading = !orders && !error;

  if (error) return <>An error has occurred</>;
  if (isLoading) return <>Loading...</>;
  if (!orders || orders.length === 0) return <>No orders...</>;

  console.log('Orders:', orders);

  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: Order) => (
            <tr key={order._id}>
              <td>{order._id.substring(20, 24)}</td>
              <td className='whitespace-nowrap'>{order.createdAt.substring(0, 10)}</td>
              <td>
                {currency} {convertPrice(order.totalPrice).toFixed(2)}
              </td>
              <td>
                {order.isPaid && order.paidAt ? order.paidAt.substring(0, 10) : 'not paid'}
              </td>
              <td>
                {order.isDelivered && order.deliveredAt
                  ? order.deliveredAt.substring(0, 10)
                  : 'not delivered'}
              </td>
              <td>
                <Link href={`/order/${order._id}`} passHref>
                  Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
