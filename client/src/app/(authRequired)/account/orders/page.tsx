import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrdersTable from "./OrdersTable";

export default function Orders() {
  return (
    <section className="flex items-center justify-center min-h-[calc(100svh-100px)] mx-auto container py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Мои заказы</CardTitle>
          <CardDescription>Отслеживайте Ваши заказы здесь</CardDescription>
        </CardHeader>
        <OrdersTable />
      </Card>
    </section>
  );
}
