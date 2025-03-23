"use client";

import { useState } from "react";
import { Loader } from "@/components/loader";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setSuccess("Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  };

  return (
    <main className="relative">
      <Loader onLoadComplete={handleLoadComplete} />

      {!loading && (
        <>
          <Navbar />

          <section className="relative w-full min-h-[50vh] pt-32 pb-24 bg-[#1b1b1c] flex items-center justify-center overflow-hidden">
            <div className="vertical-lines">
              {[...Array(5)].map((_, i) => (
                <span key={i}></span>
              ))}
            </div>

            <div className="container mx-auto px-6 md:px-8 max-w-5xl">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                <h1 className="didot-bold text-5xl md:text-6xl lg:text-7xl mb-6">Get in touch</h1>
                <p className="muli text-lg max-w-2xl mx-auto">
                  Drop me a line and let me know about your wedding or project. I'll get back to you as soon as possible.
                </p>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {success && <p className="text-green-500 mt-4">{success}</p>}
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <h2 className="didot text-2xl mb-6">Contact Form</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="muli block mb-2 text-sm">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-3 bg-black/30 border border-white/20 focus:border-primary outline-none muli"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="muli block mb-2 text-sm">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-black/30 border border-white/20 focus:border-primary outline-none muli"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="muli block mb-2 text-sm">Phone (optional)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 bg-black/30 border border-white/20 focus:border-primary outline-none muli"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="muli block mb-2 text-sm">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className="w-full p-3 bg-black/30 border border-white/20 focus:border-primary outline-none muli"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="muli uppercase tracking-wider py-3 px-8 bg-primary text-white hover:bg-primary/80 transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-10">
                  <div>
                    <h2 className="didot text-2xl mb-6">Contact Information</h2>
                    <ul className="muli space-y-6">
                      <li className="flex items-center gap-4 transition-all hover:scale-105 transform hover:text-primary">
                        <i className="fas fa-envelope h-6 w-6 text-primary" style={{ fontSize: '24px' }}></i>
                        <span className="text-primary">Email:</span>
                        <a
                          href="mailto:honeybhardwaj00064@gmail.com"
                          className="hover:text-primary transition-colors underline"
                        >
                          honeybhardwaj00064@gmail.com
                        </a>
                      </li>
                      <li className="flex items-center gap-4 transition-all hover:scale-105 transform hover:text-primary">
                        <i className="fas fa-phone h-6 w-6 text-primary" style={{ fontSize: '24px' }}></i>
                        <span className="text-primary">Phone:</span>
                        <a
                          href="tel:+918882320627"
                          className="hover:text-primary transition-colors underline"
                        >
                          +91 8882320627
                        </a>
                      </li>
                      <li className="flex items-center gap-4 transition-all hover:scale-105 transform hover:text-primary">
                        <i className="fab fa-instagram h-6 w-6 text-primary" style={{ fontSize: '24px' }}></i>
                        <span className="text-primary">Instagram:</span>
                        <a
                          href="https://www.instagram.com/honeybhardwajphotography/"
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-primary transition-colors underline"
                        >
                          @honeybhardwajphotography
                        </a>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </main>
  );
}
