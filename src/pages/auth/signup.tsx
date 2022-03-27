import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import prisma from "../../lib/prisma";
import Input from "../../components/input";
import Button from "../../components/button";
import Link from "next/link";
import { useFormik } from "formik";
import { toast } from "react-toast";

interface loginFormValues {
  email: string;
  password: string;
  username: string;
}

export default function Signup() {
  const router = useRouter();

  const handleErrors = async (resp) => {
    if (!resp.ok) {
      const err = await resp.json();
      throw new Error(err.message);
    }
  };

  const register = useFormik<loginFormValues>({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    onSubmit: (values) => {
      console.log("called");
      fetch("/api/auth/signup", {
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then(handleErrors)
        .then(() => signIn("Calendso", { callbackUrl: (router.query.callbackUrl || "") as string }))
        .catch((err) => {
          toast.error(err.message);
        });
    },
  });

  return (
    <div className="flex items-center justify-center h-screen bg-indigo-500">
      <div className="p-8 bg-white rounded shadow-lg shadow-indigo-500/40 min-w-[400px]">
        <header className="mb-5 text-lg font-semibold">Create an account</header>
        <form className="flex flex-col" onSubmit={register.handleSubmit}>
          <Input label="Username" id="username" placeholder="Username" name="username" value={register.values.username} onChange={register.handleChange} error={register.touched.username && Boolean(register.errors.username)} helperText={register.touched.username && register.errors.username} />
          <Input label="Email" id="email" placeholder="Email" name="email" value={register.values.email} onChange={register.handleChange} error={register.touched.email && Boolean(register.errors.email)} helperText={register.touched.email && register.errors.email} />
          <Input label="Password" id="password" placeholder="Password" name="password" type="password" value={register.values.password} onChange={register.handleChange} error={register.touched.password && Boolean(register.errors.password)} helperText={register.touched.password && register.errors.password} />
          <Button>Login</Button>
        </form>
        <Link href="/register" passHref>
          <div className="mt-5 cursor-pointer">
            Don&apos;t have yout account? <span className="font-medium">Create an account?</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
