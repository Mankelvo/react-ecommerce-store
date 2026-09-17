import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">

        <div>

          <p className="text-2xl font-black">
            Mankelvo
            <span className="text-blue-500">.</span>
          </p>

          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            Modern finds. Simple shopping.
          </p>

        </div>


        <div>

          <h3 className="font-bold">
            Shop
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-400">

            <Link
              to="/shop"
              className="block hover:text-white"
            >
              Products
            </Link>

            <Link
              to="/cart"
              className="block hover:text-white"
            >
              Cart
            </Link>

          </div>

        </div>


        <div>

          <h3 className="font-bold">
            Mankelvo
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-400">

            <Link
              to="/about"
              className="block hover:text-white"
            >
              About
            </Link>

            <Link
              to="/signin"
              className="block hover:text-white"
            >
              Sign In
            </Link>

          </div>

        </div>

      </div>


      <div className="border-t border-slate-800 px-4 py-6 text-center text-sm text-slate-500">
        © 2026 Mankelvo Market. Cloud Computing Project.
      </div>

    </footer>
  );
}

export default Footer;