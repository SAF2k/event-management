"use client";

import appwriteService from "@/appwrite/config";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useAuth from "@/context/useAuth";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setAuthStatus } = useAuth();

  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
  });

  const onSignup = async (values: z.infer<typeof formSchema>) => {
    try {
      const userData = await appwriteService.createUserAccount(values);
      if (userData) {
        setAuthStatus(true);
        router.push("/landing");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    console.log(values);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-200/50 rounded-xl p-10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[60px]">
            <Image src="/favicon.ico" alt="image" width={60} height={60} />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Already have an account?&nbsp;
          <Link
            href="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSignup)} className="mt-8">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled: cursor-not-allowed disabled:opacity-50"
                  placeholder="Username"
                />
                {formState.errors.name && (
                  <p className="text-red-600">
                    {formState.errors.name.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled: cursor-not-allowed disabled:opacity-50"
                  placeholder="Email"
                />
                {formState.errors.email && (
                  <p className="text-red-600">
                    {formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-base font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  id="password"
                />
                {formState.errors.password && (
                  <p className="text-red-600">
                    {formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-primary/80 disabled:opacity-50"
              >
                {loading && (
                  <span className="mr-2">
                    <Image
                      src="/loading.svg"
                      alt="loading"
                      width={20}
                      height={20}
                    />
                  </span>
                )}
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
