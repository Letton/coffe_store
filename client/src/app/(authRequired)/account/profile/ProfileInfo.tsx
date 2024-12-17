"use client";

import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { GET_FULL_USER_INFO } from "@/graphql/actions/getFullUserInfo.action";
import { useQuery } from "@apollo/client";
interface IUserInfo {
  user: {
    id: string;

    email: string;

    username: string;

    password: string;

    role: string;

    createdAt: Date;
  };
}

export default function ProfileInfo() {
  const { data, loading } = useQuery<{ getMe: IUserInfo }>(GET_FULL_USER_INFO);

  return (
    <CardContent>
      {!loading ? (
        <>
          <div className="mb-4">Данные:</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div>Id: </div>
              <Badge>{data?.getMe.user.id}</Badge>
            </div>
            <div className="flex items-center gap-2">
              Email: <Badge>{data?.getMe.user.email}</Badge>
            </div>
            <div className="flex items-center gap-2">
              Username: <Badge>{data?.getMe.user.username}</Badge>
            </div>
            <div className="flex items-center gap-2">
              Роль: <Badge>{data?.getMe.user.role}</Badge>
            </div>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </CardContent>
  );
}
