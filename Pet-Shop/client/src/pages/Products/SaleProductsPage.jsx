import { useMemo } from "react";
import SmartProductsList from "../../shared/components/SmartProductsList/SmartProductsList";
import useProductsAll from "../../shared/hooks/useProductsAll";

export default function SaleProductsPage() {
  const { products, status, error } = useProductsAll();

  const saleProducts = useMemo(
    () => products.filter((p) => Number(p?.discont_price) > 0),
    [products]
  );

  return (
    <SmartProductsList
      title="Sale"
      breadcrumbs={[
        { to: "/", label: "Main page" },
        { label: "Sale" },
      ]}
      products={saleProducts}
      status={status}
      error={error}
      showReset={true}
    />
  );
}