import { useState } from "react";
import { useApi } from "./useApi";

interface IAdminCreateUser {
  email: string;
}

export const useUsers = () => {
  const { request, processing } = useApi({ path: "" });

  const [usersAdmin, setUsersAdmin] = useState<any[]>([]);

  const fetchUsersAdmin = () => {
    request({ method: "get", pathParameters: "/users-admin" }).then(
      (response) => {
        setUsersAdmin(response);
      }
    );
  };

  const createAdminUser = ({ email }: IAdminCreateUser) => {
    return request({
      method: "post",
      body: { email },
      pathParameters: `/users-admin/create`,
    });
  };

  const deleteAdmin = ({ id }: { id: string }) => {
    return request({ method: "del", pathParameters: "/users-admin/" + id });
  };

  return {
    processing,
    fetchUsersAdmin,
    usersAdmin,
    deleteAdmin,
    createAdminUser,
  };
};
