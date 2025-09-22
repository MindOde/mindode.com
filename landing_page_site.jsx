import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Hero Section */}
      <section className="w-full text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-4"
        >
          Welcome to Your Website
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg mb-6 max-w-xl mx-auto"
        >
          A modern, responsive landing page built with React, Tailwind, and Framer Motion.
        </motion.p>
        <Button size="lg" className="rounded-2xl bg-white text-blue-600 hover:bg-gray-200">
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {["Fast", "Responsive", "Customizable"].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
          >
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">{feature}</h3>
                <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-6 w-full max-w-5xl text-center">
        <h2 className="text-3xl font-bold mb-8">Pricing Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Basic", "Pro", "Enterprise"].map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.7 }}
            >
              <Card className="rounded-2xl shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-4">{plan}</h3>
                  <p className="text-gray-600 mb-6">Perfect for {plan.toLowerCase()} usage.</p>
                  <Button className="rounded-2xl w-full">Choose {plan}</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Your Website. All rights reserved.
      </footer>
    </div>
  );
}
