"use client";

import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GET_ORDERS } from "@/graphql/actions/getOrders.action";
import { useQuery } from "@apollo/client";
import moment from "moment";

interface IOrder {
  id: string;
  shippingAddress: string;
  totalAmount: string;
  status: string;
  createdAt: Date;
}

export default function OrdersTable() {
  const { data, loading } = useQuery<{ userOrders: IOrder[] }>(GET_ORDERS);

  return (
    <CardContent>
      {!loading ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Заказа</TableHead>
              <TableHead>Адресс доставки</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Сумма заказа</TableHead>
              <TableHead>Дата заказа</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.userOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell className="hidden md:table-cell text-xs">
                  {order.shippingAddress}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="w-max">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {order.totalAmount}₽
                </TableCell>
                <TableCell className="table-cell">
                  {moment(order.createdAt).format("MM.DD.YYYY HH:mm")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        "Loading..."
      )}
    </CardContent>
  );
}
