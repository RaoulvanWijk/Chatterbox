"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { loginSchema, TLoginSchema } from "@/lib/types/zodSchemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    console.log(res, resData);

    if (!res.ok) {
      // response status is not 2xx

      setError("password", {
        type: "manual",
        message: "Wrong password or email",
      });
      return;
    }
    router.push("/app/channels/@me");
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="title">Welcome back!</h1>
      <p className="text">We are happy to see you back!</p>
      <label htmlFor="email">Email</label>
      <input type="text" id="email" {...register("email")} />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}
      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register("password")} />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}
      <button className="main-btn" type="submit">
        Login
      </button>
      <Link className="disclaimer" href="/auth/register">
        Don't have an account yet? <span>Register</span>
      </Link>
    </form>
  );
}
