import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiMapPin, FiMail, FiPhone, FiSend, FiXCircle } from "react-icons/fi";
import personalInfo from "../../data/personalInfo";
import Toast from "../ui/Toast";
import { consumeHireSubject } from "../../utils/hireIntent";
import { openMailtoFallback, sendContactMessage } from "../../utils/sendContactMessage";

const initialState = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const emailPattern = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  useEffect(() => {
    const hireSubject = consumeHireSubject();
    if (hireSubject) {
      setForm((current) => ({
        ...current,
        subject: hireSubject,
        message: current.message || "Hi Dipesh,\n\nI would like to discuss a role / project with you.\n\n",
      }));
    }
  }, []);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    if (!form.email.trim()) nextErrors.email = "Email is required";
    else if (!emailPattern.test(form.email)) nextErrors.email = "Use a valid email address";
    if (!form.message.trim()) nextErrors.message = "Message is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3200);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      showToast("Please fix the highlighted fields.", "error");
      return;
    }

    setSubmitting(true);

    try {
      await sendContactMessage(form);
      showToast("Message sent — I will get back to you soon.", "success");
      setForm(initialState);
    } catch (error) {
      if (error.message === "MAIL_NOT_CONFIGURED") {
        openMailtoFallback(form);
        showToast("Opening your email app to send the message.", "success");
      } else {
        openMailtoFallback(form);
        showToast("Could not send via API — opened email fallback.", "error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 max-w-xl"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-px w-5 bg-indigo-600 dark:bg-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Contact
            </span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Let&apos;s work together.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Hiring, freelance, or collaboration — reach out directly to{" "}
            <a className="font-semibold text-slate-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400" href={`mailto:${personalInfo.email}`}>
              {personalInfo.email}
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid gap-8 lg:grid-cols-[340px_1fr]"
        >
          {/* Direct contact info card */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
            <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Direct Details</h3>
            <div className="mt-5 space-y-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="mt-0.5 text-indigo-600 dark:text-indigo-400" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <FiPhone className="mt-0.5 text-indigo-600 dark:text-indigo-400" />
                <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  {personalInfo.phone}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <FiMail className="mt-0.5 text-indigo-600 dark:text-indigo-400" />
                <a href={`mailto:${personalInfo.email}`} className="break-all hover:text-indigo-600 dark:hover:text-indigo-400">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-slate-200/80 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-800/50">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Response time</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Within 24–48 hours on business days.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/90 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Name*
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2 text-xs outline-none transition focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-white dark:focus:ring-white"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2 text-xs outline-none transition focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-white dark:focus:ring-white"
                  placeholder="name@company.com"
                />
                {errors.email && <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="subject" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2 text-xs outline-none transition focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-white dark:focus:ring-white"
                placeholder="Project or role title"
              />
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 py-2 text-xs outline-none transition focus:border-slate-900 focus:bg-white focus:ring-1 focus:ring-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-white dark:focus:ring-white"
                placeholder="Describe the opportunity, stack, and timeline..."
              />
              {errors.message && <p className="mt-1 text-[11px] text-red-500">{errors.message}</p>}
            </div>

            <div className="mt-5 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary !px-5 !py-2 !text-xs disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Sending..." : "Send message"}
                {submitting ? (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <FiSend className="size-3.5" />
                )}
              </button>

              <p className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                {personalInfo.freelanceStatus === "Available" ? (
                  <FiCheckCircle className="text-emerald-500" />
                ) : (
                  <FiXCircle className="text-red-500" />
                )}
                {personalInfo.freelanceStatus} for new projects
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      <Toast message={toast.message} visible={toast.visible} type={toast.type} />
    </section>
  );
}
