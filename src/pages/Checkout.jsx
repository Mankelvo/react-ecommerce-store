import { useState } from "react";
import { Link } from "react-router-dom";

function Checkout({ cart, onClearCart }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity ?? 1),
    0
  );

  async function handleSubmit(event) {
  event.preventDefault();

  if (cart.length === 0) return;

  const formData = new FormData(event.currentTarget);

  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const email = String(formData.get("email") || "").trim();

  const orderData = {
    customerName: `${firstName} ${lastName}`,
    email,
    total: Number(subtotal.toFixed(2))
  };

  setIsSubmitting(true);
  setSubmitError("");

  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error("Order submission failed");
    }

    const result = await response.json();

    console.log("Order saved to Azure SQL:", result);

    setOrderPlaced(true);
    onClearCart();

  } catch (error) {
    console.error("Checkout error:", error);

    setSubmitError(
      "Unable to save your order. Please try again."
    );

  } finally {
    setIsSubmitting(false);
  }
}

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20">

        <div className="mx-auto max-w-lg rounded-3xl bg-white p-10 text-center shadow-sm">

          <div className="text-6xl">
            ✅
          </div>

          <h1 className="mt-5 text-3xl font-black">
            Order received!
          </h1>

          <p className="mt-3 text-slate-500">
            This is a demonstration checkout.
            No real payment was processed.
          </p>

          <Link
            to="/"
            className="mt-8 inline-block rounded-full bg-blue-600 px-7 py-3 font-bold text-white"
          >
            Return Home
          </Link>

        </div>

      </main>
    );
  }


  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12">

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_380px]">

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-7 shadow-sm"
        >

          <h1 className="text-3xl font-black">
            Checkout
          </h1>

          <p className="mt-2 text-slate-500">
            Enter your delivery information.
          </p>


          <div className="mt-8 grid gap-5 sm:grid-cols-2">

            <Input
  label="First Name"
  name="firstName"
  type="text"
  required
/>

<Input
  label="Last Name"
  name="lastName"
  type="text"
  required
/>

<Input
  label="Email"
  name="email"
  type="email"
  required
/>

            <Input
              label="Phone"
              type="tel"
            />

          </div>


          <div className="mt-5">

            <Input
              label="Street Address"
              type="text"
            />

          </div>


          <div className="mt-5 grid gap-5 sm:grid-cols-3">

            <Input
              label="City"
              type="text"
            />

            <Input
              label="State"
              type="text"
            />

            <Input
              label="ZIP Code"
              type="text"
            />

          </div>


          <button
  type="submit"
  disabled={cart.length === 0 || isSubmitting}
  className="mt-8 w-full rounded-full bg-blue-600 px-6 py-4 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
>
  {isSubmitting ? "Saving Order..." : "Place Demo Order"}
</button>

{submitError && (
  <p role="alert" className="mt-3 text-sm text-red-600">
    {submitError}
  </p>
)}

        </form>


        <aside className="h-fit rounded-3xl bg-slate-950 p-7 text-white">

          <h2 className="text-xl font-black">
            Order Summary
          </h2>

          <div className="mt-6 space-y-4">

            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between gap-5 text-sm"
              >
                <span className="text-slate-300">
                  {item.title} × {item.quantity}
                </span>

                <span className="font-bold">
                  $
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </span>
              </div>
            ))}

          </div>


          <div className="mt-6 border-t border-slate-700 pt-5">

            <div className="flex justify-between text-xl font-black">
              <span>Subtotal</span>

              <span>
                ${subtotal.toFixed(2)}
              </span>
            </div>

          </div>

        </aside>

      </div>
    </main>
  );
}


function Input({ label, name, type, required = false }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
        {!required && (
          <span className="ml-2 font-normal text-slate-400">
            (Optional)
          </span>
        )}
      </span>

      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
      />
    </label>
  );
}


export default Checkout;