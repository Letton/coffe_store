"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ApolloError, useMutation } from "@apollo/client";
import { LOGIN } from "@/graphql/actions/login.action";
import { toast } from "@/hooks/use-toast";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/userContext";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Имя пользователя должно быть не менее 3 символов"),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});

type SignInSchema = z.infer<typeof formSchema>;

export default function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const { refetch } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInSchema>({ resolver: zodResolver(formSchema) });

  const [loginMutation, { loading }] = useMutation(LOGIN);

  const onSubmit = async (data: SignInSchema) => {
    try {
      const loginData = {
        username: data.username,
        password: data.password,
      };
      const response = await loginMutation({ variables: loginData });
      if (response.data.login.user) {
        cookies.set("refreshToken", response.data.login.refreshToken);
        cookies.set("accessToken", response.data.login.accessToken);
        refetch();
        toast({
          title: "Успех!",
          description: "Вы вошли в аккаунт",
        });
        router.push("/");
      }
    } catch (error) {
      if (error instanceof ApolloError) {
        const errorMessage =
          error.graphQLErrors?.[0]?.message || "Что-то пошло не так";

        toast({
          title: "Ошибка!",
          description: errorMessage,
        });
      } else {
        console.error(error);
        toast({
          title: "Ошибка!",
          description: "Неизвестная ошибка",
        });
      }
    }
    reset();
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Вход</CardTitle>
          <CardDescription>
            Введите ваш логин ниже, чтобы войти в аккаунт
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Логин</Label>
                <Input
                  {...register("username")}
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                />
                {errors.username && (
                  <span className="text-red-500 text-sm">
                    {errors.username.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Пароль</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Забыли пароль?
                  </a>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="Password"
                  required
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                Войти
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Нет аккаунта?{" "}
              <Link
                href="/auth/signup"
                className="underline underline-offset-4"
              >
                Зарегистрироваться
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
