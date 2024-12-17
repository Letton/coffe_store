import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProfileInfo from "./ProfileInfo";

export default function Profile() {
  return (
    <section className="flex items-center justify-center min-h-[calc(100svh-100px)] mx-auto container py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Мои профиль</CardTitle>
          <CardDescription>Здесь указаны ваши данные</CardDescription>
        </CardHeader>
        <ProfileInfo />
      </Card>
    </section>
  );
}
