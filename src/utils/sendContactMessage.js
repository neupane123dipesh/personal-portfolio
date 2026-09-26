import emailjs from '@emailjs/browser';

/**
 * Sends contact form submissions to your inbox.
 * Configure either Web3Forms (recommended) or EmailJS via Vite env vars — see .env.example.
 */
export async function sendContactMessage({ name, email, subject, message }) {
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  if (web3Key) {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: web3Key,
        name,
        email,
        subject: subject || 'Portfolio enquiry',
        message,
        from_name: name,
        botcheck: false,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Web3Forms request failed');
    }
    return;
  }

  if (serviceId && templateId && publicKey) {
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: name,
        from_email: email,
        reply_to: email,
        subject: subject || 'Portfolio enquiry',
        message,
      },
      publicKey,
    );
    return;
  }

  throw new Error('MAIL_NOT_CONFIGURED');
}

export function openMailtoFallback({ name, email, subject, message }) {
  const to = import.meta.env.VITE_CONTACT_EMAIL || 'dipeshneupane213@gmail.com';
  const body = [
    message,
    '',
    '—',
    `From: ${name}`,
    email ? `Reply-to: ${email}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const params = new URLSearchParams({
    subject: subject || 'Portfolio enquiry',
    body,
  });
  if (email) params.set('cc', email);

  window.location.href = `mailto:${encodeURIComponent(to)}?${params.toString()}`;
}
