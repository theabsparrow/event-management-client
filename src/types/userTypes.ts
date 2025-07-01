export type TUSerRole = "admin" | "user" | "superAdmin";

export type TUSer = {
  exp?: number;
  iat?: number;
  userId: string;
  userRole: TUSerRole;
};
