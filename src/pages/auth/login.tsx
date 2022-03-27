import Link from "next/link";
import { getCsrfToken } from "next-auth/react";
import { getSession } from "../../lib/auth";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Button from "../../components/button";
import Input from "../../components/input";
import { useFormik } from "formik";

interface loginFormValues {
  email: string;
  password: string;
}

export default function Login({ csrfToken }) {
  const router = useRouter();

  const signInFormik = useFormik<loginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {},
  });

  useEffect(() => {
    if (!router.query?.callbackUrl) {
      window.history.replaceState(null, document.title, "?callbackUrl=/");
    }
  }, [router.query]);

  return (
    <div className="flex items-center justify-center h-screen bg-indigo-500">
      <div className="p-8 bg-white rounded shadow-lg shadow-indigo-500/40 min-w-[400px]">
        <header className="mb-5 text-lg font-semibold">Login</header>

        <form className="flex flex-col" method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} hidden />
          <Input label="Email" id="email" placeholder="Email" name="email" value={signInFormik.values.email} onChange={signInFormik.handleChange} error={signInFormik.touched.email && Boolean(signInFormik.errors.email)} helperText={signInFormik.touched.email && signInFormik.errors.email} />
          <Input label="Password" id="password" placeholder="Password" name="password" type="password" value={signInFormik.values.password} onChange={signInFormik.handleChange} error={signInFormik.touched.password && Boolean(signInFormik.errors.password)} helperText={signInFormik.touched.password && signInFormik.errors.password} />
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

Login.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });
  if (session) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return;
  }

  return {
    csrfToken: await getCsrfToken(context),
  };
};
