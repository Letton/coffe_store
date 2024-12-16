"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ApolloError, useMutation } from "@apollo/client";
import { ACTIVATION } from "@/graphql/actions/activation.action";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function ActivateForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();

  const [activateUser, { loading }] = useMutation(ACTIVATION);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const activationToken = localStorage.getItem("activationToken");
      console.log(data);
      await activateUser({
        variables: {
          activationToken: activationToken,
          activationCode: data.pin,
        },
      });
      toast({
        title: "Успех!",
        description: "Вы успешно активировали аккаунт",
      });
      router.push("/auth/login");
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
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Активация аккаунта</CardTitle>
          <CardDescription>
            Введите ваш код подтверждения, отправленный на Ваш email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Код подтверждения</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading}>
                Отправить
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
