import AdminLayout from '@/components/admin/AdminLayout';

import Form from './Form';

// Ensure params are awaited properly here in the metadata function
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params; // Await params for correct handling
  return {
    title: `Edit Product ${id}`,
  };
}

export default async function ProductEditPage({ params }: { params: { id: string } }) {
  const { id } = await params; // Await params before accessing id
  return (
    <AdminLayout activeItem='products'>
      <Form productId={id} />
    </AdminLayout>
  );
}
