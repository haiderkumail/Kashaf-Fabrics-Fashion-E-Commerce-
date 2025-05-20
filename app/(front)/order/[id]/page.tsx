// // app/(front)/order/[id]/page.tsx

// import OrderDetails from '@/components/order/OrderDetails';

// interface PageProps {
//   params: {
//     id: string;
//   };
// }

// // Optional: async metadata generator
// export async function generateMetadata({ params }: PageProps) {
//   return {
//     title: `Order ${params.id}`,
//   };
// }

// // Page component — can be async if you fetch data here, or sync if you don't
// export default async function OrderPage({ params }: PageProps) {
//   const { id } = params;

//   // You can do server-side fetch here if needed, e.g.
//   // const orderData = await fetchOrder(id);

//   return <OrderDetails orderId={id} />;
// }
