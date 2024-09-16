import ProductCard from "../ProductCard/ProductCard";

export default function ProductGrid({
  data,
  urlPre,
  type,
  product,
  title,
}: any) {
  return (
    <div className="py-10">
      <h6 className="text-[#0DA1DB] text-2xl font-semibold pb-6">
        {title || "สินค้า"}
      </h6>
      <div className="grid grid-cols-12 gap-4">
        {data?.map((item: any, key: any) => (
          <ProductCard
            item={item}
            key={key}
            type={type}
            product={product}
            urlPre={urlPre}
          />
        ))}
      </div>
    </div>
  );
}
