import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <section className="relative max-w-3xl mx-auto px-4 sm:px-8 my-24 text-center">
      <div>
        <h2 className="text-slate-700 text-[42px] font-bold mb-4">
          Find the Right Plan for You
        </h2>
        <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
          Whether you're just getting started or scaling fast, we've got a pricing plan that fits your journey. Start free, grow confidently.
        </p>
      </div>

      <div className="mt-16 z-20">
        <PricingTable />
      </div>
    </section>
  );
};

export default Plan;
