"use client";

import { login } from "@/lib/actions/auth";

export function SignInButton() {
    return (
        <button onClick={() => login() }>Sign in with Github</button>
    )
}