import { Metadata } from 'next';
import OrderDetails from '@/components/order/OrderDetails';

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: `Order ${params.id}`,
  };
}

export default function OrderDetailsPage({ params }: PageProps) {
  return <OrderDetails orderId={params.id} />;
}
