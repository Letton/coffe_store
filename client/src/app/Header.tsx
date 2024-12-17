"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/cartContext";
import { useUserContext } from "@/context/userContext";
import Link from "next/link";

const navItems = [
  { label: "Главная", link: "/" },
  { label: "Каталог", link: "/catalog" },
  { label: "FAQ", link: "/faq" },
];

export default function Header() {
  const { user, logout } = useUserContext();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="container mx-auto px-4 py-8">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-16">
          <Link href="/">
            <h1 className="text-xl font-semibold py-1">Coffee Store</h1>
          </Link>
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <Link href={item.link} key={item.label}>
                <li>{item.label}</li>
              </Link>
            ))}
          </ul>
        </div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {user.username}{" "}
                {cart.length > 0 ? <Badge>{cart.length}</Badge> : null}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Мой аккаунт </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href={"/account/profile"}>
                  <DropdownMenuItem>Профиль</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <Link href={"/account/cart"}>
                  <DropdownMenuItem>
                    Корзина
                    {cart.length > 0 ? <Badge>{cart.length}</Badge> : null}
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuGroup>
                <Link href={"/account/orders"}>
                  <DropdownMenuItem>Заказы</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Выйти</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/auth/signin">Войти</Link>
        )}
      </nav>
    </header>
  );
}
