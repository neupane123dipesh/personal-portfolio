import { useMemo, useState } from 'react';
import { FiCheckCircle, FiMapPin, FiMail, FiPhone, FiSend, FiXCircle } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import personalInfo from '../../data/personalInfo';
import Toast from '../ui/Toast';

const initialState = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const emailPattern = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      setToast({ visible: true, message: 'Please fix the highlighted fields.', type: 'error' });
      setTimeout(() => setToast((current) => ({ ...current, visible: false })), 2600);
      return;
    }

    setSubmitting(true);

    try {
      // TODO: add your EmailJS service ID, template ID, and public key
      const serviceId = 'service_xxxxxx';
      const templateId = 'template_xxxxxx';
      const publicKey = 'your_public_key';

      await emailjs.send(serviceId, templateId, {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject || 'Portfolio enquiry',
        message: form.message,
      }, publicKey);

      setToast({ visible: true, message: 'Message sent successfully!', type: 'success' });
      setForm(initialState);
    } catch (error) {
      setToast({ visible: true, message: 'Unable to send message right now. Please email me directly.', type: 'error' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-display text-4xl text-ink dark:text-slate-100">Let&apos;s build something meaningful.</h3>
            <div className="mt-8 space-y-5 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3"><FiMapPin className="mt-1 text-primary" /> <span>{personalInfo.location || 'Your location'}</span></div>
              <div className="flex items-start gap-3"><FiPhone className="mt-1 text-primary" /> <span>{personalInfo.phone || '+000 000 0000'}</span></div>
              <div className="flex items-start gap-3"><FiMail className="mt-1 text-primary" /> <span>{personalInfo.email || 'you@example.com'}</span></div>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/80">
              <div className="h-40 rounded-[1rem] bg-[radial-gradient(circle_at_top_left,_rgba(29,78,216,0.15),_transparent_40%),linear-gradient(135deg,#e2e8f0,#cbd5e1)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.22),_transparent_35%),linear-gradient(135deg,#0f172a,#1e293b)]" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.05)] dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Name*</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} aria-invalid={!!errors.name} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="Your name" />
                {errors.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Email*</label>
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="name@email.com" />
                {errors.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Subject</label>
              <input id="subject" name="subject" value={form.subject} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="Project inquiry" />
            </div>

            <div className="mt-5">
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Message*</label>
              <textarea id="message" name="message" rows={6} value={form.message} onChange={handleChange} aria-invalid={!!errors.message} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" placeholder="Tell me about your project..." />
              {errors.message && <p className="mt-2 text-xs text-red-500">{errors.message}</p>}
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <button type="submit" disabled={submitting} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-primary transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70">
                {submitting ? 'Sending...' : 'Send Message'}
                {submitting ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <FiSend />}
              </button>

              <p className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                {personalInfo.freelanceStatus === 'Available' ? <FiCheckCircle className="text-emerald-500" /> : <FiXCircle className="text-red-500" />}
                {personalInfo.freelanceStatus || 'Available'} for freelance work
              </p>
            </div>
          </form>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} type={toast.type} />
    </section>
  );
}
