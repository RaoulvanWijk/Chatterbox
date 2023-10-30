"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { registerSchema, TRegisterSchema } from "@/lib/types/zodSchemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TRegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: TRegisterSchema) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

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
      <h1 className="title">Welcome new user!</h1>
      <p className="text">We are happy for you to join us!</p>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" autoComplete="username" {...register("username")} />
      {errors.username && (
        <p className="text-red-500">{`${errors.username.message}`}</p>
      )}
      <label htmlFor="email">Email</label>
      <input type="email" id="email" autoComplete="email mail" {...register("email")} />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}
      <label htmlFor="password">Password</label>
      <input type="password" id="password" autoComplete="current-password" {...register("password")} />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}
      <button className="main-btn" type="submit">
        Register
      </button>
      <Link className="disclaimer" href="/auth/login">
        Already have an account? <span>Login</span>
      </Link>
    </form>
  );
}
