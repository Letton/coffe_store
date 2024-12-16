"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCart } from "@/context/cartContext";
// import { useUserContext } from "@/context/userContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const formSchema = z.object({
  address: z.string(),
});

type MakeOrderSchema = z.infer<typeof formSchema>;

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  // const { } = useUserContext();

  const cartTotal = cart.reduce(
    (total, product) => total + product.price * product.count,
    0
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MakeOrderSchema>({ resolver: zodResolver(formSchema) });

  const makeOrder = async (data: MakeOrderSchema) => {};

  const onSubmit = (data: MakeOrderSchema) => {
    makeOrder({
      address: data.address,
    });
  };

  return (
    <section className="flex items-center justify-center min-h-[calc(100svh-100px)] mx-auto container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Корзина</CardTitle>
          <CardDescription>
            Чтобы оформить заказ, запоните нужные данные и нажмите кнопку
            оформить заказ.
          </CardDescription>
        </CardHeader>
        {cart.length > 0 ? (
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Позиция</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Сумма</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart?.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name} x {product.count}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.type}</Badge>
                    </TableCell>
                    <TableCell className="table-cell">
                      <div className="flex justify-center gap-2">
                        <Button onClick={() => increaseQuantity(product.id)}>
                          +
                        </Button>
                        <Button
                          variant={"outline"}
                          onClick={() => decreaseQuantity(product.id)}
                        >
                          -
                        </Button>
                        <Button
                          variant={"destructive"}
                          onClick={() => removeFromCart(product.id)}
                        >
                          x
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {(product.price * (product.count as number)).toFixed(2)}₽
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator className="my-4" />
            <div className="flex items-center justify-between px-4">
              <span>Итого:</span>
              <span>{cartTotal.toFixed(2)}₽</span>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between px-4">
              <span>Оплата:</span>
              <span>Картой курьеру или наличными</span>
            </div>
            <Separator className="my-4" />
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex w-full flex-col gap-4">
                  <Input
                    type="text"
                    placeholder="Адресс доставки"
                    {...register("address")}
                  />
                  <Button type="submit">Создать заказ</Button>
                </div>
              </form>
            </div>
          </CardContent>
        ) : (
          <CardContent>
            <p>Ваша корзина пуста</p>
          </CardContent>
        )}
      </Card>
    </section>
  );
}
