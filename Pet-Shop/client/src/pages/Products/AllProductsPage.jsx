import SmartProductsList from "../../shared/components/SmartProductsList/SmartProductsList";
import useProductsAll from "../../shared/hooks/useProductsAll";

export default function AllProductsPage() {
  const { products, status, error } = useProductsAll();

  return (
    <SmartProductsList
      title="All products"
      breadcrumbs={[
        { to: "/", label: "Main page" },
        { label: "All products" },
      ]}
      products={products}
      status={status}
      error={error}
      showReset={true}
    />
  );
}
