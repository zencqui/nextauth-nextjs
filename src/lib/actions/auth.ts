"use server";

import { signOut } from "next-auth/react";
import { signIn } from "../../auth";


export const login = async () => {
    await signIn("auth0", { redirectTo: "/" });
}

export const logOut = async () => {
    await signOut ({ redirectTo: "/" });
}