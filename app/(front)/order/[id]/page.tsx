import { Metadata } from 'next';
import OrderDetails from './OrderDetails';

// ✅ DO NOT use Props or PageProps here — use inline typing
export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  return {
    title: `Order ${params.id}`,
  };
}

// ✅ Props only used here — totally fine
type PageProps = {
  params: {
    id: string;
  };
};

export default function OrderDetailsPage({ params }: PageProps) {
  return <OrderDetails orderId={params.id} />;
}
