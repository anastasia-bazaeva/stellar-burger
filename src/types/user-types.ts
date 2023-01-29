export type TUser = {
    email: string | undefined;
    name: string | undefined;
};

export type TUserRegisterData = TUser & { password: string | undefined };

export type TUserLoginData = Omit<TUser, 'name'> & { password: string | undefined };

export type TUserResponse = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
}

export type TTokenResponse = Omit<TUserResponse, "user">;

export type TOwner = TUser & {
    createdAt: string;
    updatedAt: string;
}