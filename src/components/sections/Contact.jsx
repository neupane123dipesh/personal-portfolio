import { useEffect, useMemo, useState } from 'react';
import { FiCheckCircle, FiMapPin, FiMail, FiPhone, FiSend, FiXCircle } from 'react-icons/fi';
import personalInfo from '../../data/personalInfo';
import Toast from '../ui/Toast';
import { consumeHireSubject } from '../../utils/hireIntent';
import { openMailtoFallback, sendContactMessage } from '../../utils/sendContactMessage';

const initialState = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const emailPattern = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  useEffect(() => {
    const hireSubject = consumeHireSubject();
    if (hireSubject) {
      setForm((current) => ({
        ...current,
        subject: hireSubject,
        message: current.message || 'Hi Dipesh,\n\nI would like to discuss a role / project with you.\n\n',
      }));
    }
  }, []);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    else if (!emailPattern.test(form.email)) nextErrors.email = 'Use a valid email address';
    if (!form.message.trim()) nextErrors.message = 'Message is required';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3200);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      showToast('Please fix the highlighted fields.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      await sendContactMessage(form);
      showToast('Message sent — I will get back to you soon.', 'success');
      setForm(initialState);
    } catch (error) {
      if (error.message === 'MAIL_NOT_CONFIGURED') {
        openMailtoFallback(form);
        showToast('Opening your email app to send the message.', 'success');
      } else {
        openMailtoFallback(form);
        showToast('Could not send via API — opened email fallback.', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Contact</p>
          <h2 className="mt-3 font-display text-4xl text-ink dark:text-slate-100 md:text-5xl">Let&apos;s work together.</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Hiring, freelance, or collaboration — send a message here and it goes straight to{' '}
            <a className="font-medium text-primary hover:underline" href={`mailto:${personalInfo.email}`}>
              {personalInfo.email}
            </a>
            .
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-display text-2xl text-ink dark:text-slate-100">Direct</h3>
            <div className="mt-8 space-y-5 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-primary" /> <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-start gap-3">
                <FiPhone className="mt-1 text-primary" />{' '}
                <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="hover:text-primary">
                  {personalInfo.phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <FiMail className="mt-1 text-primary" />{' '}
                <a href={`mailto:${personalInfo.email}`} className="hover:text-primary">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/80">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Response time</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Usually within 24–48 hours on business days.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                  Name*
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                  Email*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="name@company.com"
                />
                {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Project or role"
              />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">
                Message*
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                placeholder="Tell me about the role, timeline, and stack..."
              />
              {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-primary transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? 'Sending...' : 'Send message'}
                {submitting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <FiSend />
                )}
              </button>

              <p className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                {personalInfo.freelanceStatus === 'Available' ? (
                  <FiCheckCircle className="text-emerald-500" />
                ) : (
                  <FiXCircle className="text-red-500" />
                )}
                {personalInfo.freelanceStatus} for new work
              </p>
            </div>
          </form>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} type={toast.type} />
    </section>
  );
}
