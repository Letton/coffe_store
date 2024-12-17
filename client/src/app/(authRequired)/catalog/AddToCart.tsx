"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cartContext";
import { HTMLAttributes } from "react";

interface IAddToCart extends HTMLAttributes<HTMLButtonElement> {
  product: {
    id: string;
    name: string;
    type: string;
    netWeight: number;
    price: number;
    imageUrl: string;
  };
}

export default function AddToCart({ product, ...props }: IAddToCart) {
  const { addToCart } = useCart();

  const addToCartHandler = () => {
    addToCart({ ...product, count: 1 });
  };

  return (
    <Button onClick={addToCartHandler} {...props}>
      Купить
    </Button>
  );
}
