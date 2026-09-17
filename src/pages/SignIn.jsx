import { useState } from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    setMessage(
      "Demo sign-in only. Authentication will be added in a future version."
    );
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-slate-50 px-4 py-16">

      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-xl">

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-xl font-black text-white">
            M
          </div>

          <h1 className="mt-5 text-3xl font-black">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-500">
            Sign in to Mankelvo Market.
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <label className="block">

            <span className="mb-2 block text-sm font-bold">
              Email
            </span>

            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />

          </label>


          <label className="block">

            <span className="mb-2 block text-sm font-bold">
              Password
            </span>

            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-200 px-4 py-3"
            />

          </label>


          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 px-6 py-4 font-bold text-white hover:bg-blue-700"
          >
            Sign In
          </button>

        </form>


        {message && (
          <p className="mt-5 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
            {message}
          </p>
        )}


        <p className="mt-6 text-center text-sm text-slate-500">
          Demo account interface for Mankelvo Market.
        </p>

      </div>
    </main>
  );
}

export default SignIn;