import { Metadata } from 'next';
import OrderDetails from './OrderDetails';

// ✅ Inline typing for metadata
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  return {
    title: `Order ${params.id}`,
  };
}

// ✅ Props type for the page
type PageProps = {
  params: {
    id: string;
  };
};

export default function OrderDetailsPage({ params }: PageProps) {
  return (
    <OrderDetails orderId={params.id} />
  );
}
