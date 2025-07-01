export type TUSerRole = "admin" | "user" | "superAdmin";

export type TUSer = {
  exp?: number;
  iat?: number;
  userId: string;
  userRole: TUSerRole;
};

export type TUserInfo = {
  name: string;
  email: string;
  password: string;
  photoURL: string;
  role: TUSerRole;
  isDeleted: boolean;
  passwordChangedAt?: Date;
};
