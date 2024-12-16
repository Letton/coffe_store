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
import { REGISTER } from "@/graphql/actions/register.action";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Имя пользователя должно быть не менее 3 символов"),
  email: z.string().email("Неверный формат email"),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});

type SignInSchema = z.infer<typeof formSchema>;

export default function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInSchema>({ resolver: zodResolver(formSchema) });

  const [registerMutation] = useMutation(REGISTER);

  const onSubmit = async (data: SignInSchema) => {
    try {
      const response = await registerMutation({ variables: data });
      localStorage.setItem(
        "activationToken",
        response.data.register.activationToken
      );
      toast({
        title: "Успех!",
        description: "Вы успешно зарегистрировались",
      });
      router.push("/auth/activate");
    } catch (error) {
      handleError(error);
    }
    reset();
  };

  const handleError = (error: unknown) => {
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
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Регистрация</CardTitle>
          <CardDescription>
            Введите ваш email ниже, чтобы зарегистрироваться
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
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
                  required
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Зарегистрироваться
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Есть аккаунт?{" "}
              <Link
                href="/auth/signin"
                className="underline underline-offset-4"
              >
                Войти
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
