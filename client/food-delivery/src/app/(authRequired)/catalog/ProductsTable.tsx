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
import { GET_PRODUCTS } from "@/graphql/actions/getProducts";
import { useQuery } from "@apollo/client";
import AddToCart from "./AddToCart";

interface IProduct {
  id: string;
  name: string;
  type: string;
  netWeight: number;
  price: number;
  imageUrl: string;
}

export default function ProductsTable() {
  const { data, loading } = useQuery<{ products: IProduct[] }>(GET_PRODUCTS);

  return (
    <CardContent>
      {!loading ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Масса нетто</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead className="hidden md:table-cell">Цена</TableHead>
              <TableHead>
                <span className="sr-only">Действия</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="hidden sm:table-cell pr-4">
                  <img
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    src={product.imageUrl}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="font-medium">
                  {product.netWeight} г.
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{product.type}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.price}₽
                </TableCell>
                <TableCell className="table-cell">
                  <div className="flex justify-center">
                    <AddToCart product={product} />
                  </div>
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
