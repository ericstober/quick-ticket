"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/auth.actions";

const LoginForm = () => {
  const router = useRouter();

  const initialState = {
    success: false,
    message: "",
  };

  const [state, formAction] = useActionState(loginUser, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Login Successful");
      router.push("/tickets");
      router.refresh();
    } else if (state.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className='min-h-screen flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white shadow-md ronded-lg p-8 border border-gray-200'>
        <h1 className='text-3xl font-bold mb-6 text-center text-purple'>Login</h1>

        <form action={formAction} className='space-y-4 text-gray-700'>
          <input
            type='text'
            name='email'
            placeholder='Your Email'
            autoComplete='email'
            required
            className='w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400'
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='new-password'
            required
            className='w-full border border-gray-200 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400'
          />

          <button
            type='submit'
            className='w-full bg-purple text-white p-3 rounded hover:bg-purple-dark transition disabled:opacity-50'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
