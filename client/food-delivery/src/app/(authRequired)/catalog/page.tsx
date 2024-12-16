import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductsTable from "./ProductsTable";

export default function ShopPage() {
  return (
    <section className="flex items-center justify-center min-h-[calc(100svh-100px)] mx-auto container py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Каталог</CardTitle>
          <CardDescription>
            Выбирайте любой кофе по вашему вкусу
          </CardDescription>
        </CardHeader>
        <ProductsTable />
      </Card>
    </section>
  );
}
