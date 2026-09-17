import {
  Cloud,
  ShoppingBag,
  ShieldCheck,
} from "lucide-react";

function About() {
  return (
    <main>

      <section className="bg-slate-950 px-4 py-24 text-center text-white">

        <p className="font-bold uppercase tracking-widest text-blue-400">
          About Us
        </p>

        <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-black">
          Simple shopping powered by modern technology.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          Mankelvo Market is a demonstration e-commerce
          platform designed to provide a clean,
          responsive and cloud-ready shopping experience.
        </p>

      </section>


      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 md:grid-cols-3">

        <AboutCard
          icon={<ShoppingBag />}
          title="Simple Shopping"
          text="Customers can browse products, view details and manage their shopping cart."
        />

        <AboutCard
          icon={<ShieldCheck />}
          title="Designed for Security"
          text="The application is designed to be hosted within a secured cloud environment."
        />

        <AboutCard
          icon={<Cloud />}
          title="Cloud Ready"
          text="Mankelvo Market will be deployed and managed using Microsoft Azure."
        />

      </section>

    </main>
  );
}


function AboutCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-slate-200 p-8">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
        {icon}
      </div>

      <h2 className="mt-5 text-xl font-black">
        {title}
      </h2>

      <p className="mt-3 leading-7 text-slate-500">
        {text}
      </p>

    </div>
  );
}

export default About;