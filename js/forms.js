/**
 * INIESTA AUTOMATION HUB - FORMS LOGIC & VALIDATION
 * Handles Contact Form, Booking Form, Calendly Integration, and Confirmation Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initBookingForm();
  initNewsletterForms();
});

/* ==========================================================================
   1. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending message...';

    // Form data extraction
    const formData = {
      fullName: form.querySelector('#fullName')?.value.trim() || '',
      email: form.querySelector('#email')?.value.trim() || '',
      company: form.querySelector('#company')?.value.trim() || 'N/A',
      phone: form.querySelector('#phone')?.value.trim() || 'N/A',
      companySize: form.querySelector('#companySize')?.value || 'N/A',
      businessType: form.querySelector('#businessType')?.value || 'N/A',
      industry: form.querySelector('#industry')?.value || 'N/A',
      message: form.querySelector('#message')?.value.trim() || ''
    };

    // Simulate async network request
    await new Promise(resolve => setTimeout(resolve, 1200));

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHtml;
    form.reset();

    showNotificationModal({
      title: 'Message Sent Successfully! 🎉',
      subtitle: `Hi ${formData.fullName}, thanks for reaching out! Our team will get back to you within 24 hours.`,
      details: [
        `📧 <strong>Admin Notification:</strong> Dispatched to iniesta.automatiom@gmail.com`,
        `👤 <strong>Name:</strong> ${formData.fullName}`,
        `✉️ <strong>Email:</strong> ${formData.email}`,
        `🏢 <strong>Company:</strong> ${formData.company} (${formData.companySize})`,
        `💼 <strong>Industry:</strong> ${formData.industry} | <strong>Type:</strong> ${formData.businessType}`,
        `💬 <strong>Message:</strong> "${formData.message.substring(0, 100)}${formData.message.length > 100 ? '...' : ''}"`
      ],
      actionText: 'Close Window'
    });
  });
}

/* ==========================================================================
   2. BOOKING FORM HANDLER (/book)
   ========================================================================== */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Scheduling Consultation...';

    const formData = {
      fullName: form.querySelector('#bookFullName')?.value.trim() || '',
      email: form.querySelector('#bookEmail')?.value.trim() || '',
      company: form.querySelector('#bookCompany')?.value.trim() || '',
      phone: form.querySelector('#bookPhone')?.value.trim() || '',
      companySize: form.querySelector('#bookCompanySize')?.value || '',
      industry: form.querySelector('#bookIndustry')?.value || '',
      businessType: form.querySelector('#bookBusinessType')?.value || '',
      helpTopic: form.querySelector('#bookHelpTopic')?.value.trim() || ''
    };

    await new Promise(resolve => setTimeout(resolve, 1400));

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnHtml;
    form.reset();

    // Show Calendly Modal & Confirmation Receipt
    showBookingConfirmationModal(formData);
  });
}

/* ==========================================================================
   3. NEWSLETTER FORMS
   ========================================================================== */
function initNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input || !validateEmail(input.value)) {
        alert('Please enter a valid email address.');
        return;
      }

      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Subscribing...';

      await new Promise(resolve => setTimeout(resolve, 900));

      btn.disabled = false;
      btn.textContent = 'Subscribed! ✓';
      btn.style.backgroundColor = '#00FF88';
      btn.style.color = '#0A1628';
      input.value = '';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 3500);
    });
  });
}

/* ==========================================================================
   4. FORM VALIDATION HELPERS
   ========================================================================== */
function validateForm(form) {
  let isValid = true;
  const requiredInputs = form.querySelectorAll('[required]');

  requiredInputs.forEach(input => {
    let fieldValid = true;
    if (input.type === 'email') {
      fieldValid = validateEmail(input.value.trim());
    } else if (input.tagName === 'SELECT') {
      fieldValid = input.value !== '';
    } else {
      fieldValid = input.value.trim().length > 0;
    }

    if (!fieldValid) {
      input.classList.add('is-invalid');
      isValid = false;
    } else {
      input.classList.remove('is-invalid');
    }

    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
    }, { once: true });
  });

  return isValid;
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ==========================================================================
   5. NOTIFICATION & BOOKING MODAL GENERATOR
   ========================================================================== */
function showNotificationModal({ title, subtitle, details = [], actionText = 'Okay' }) {
  let modal = document.getElementById('global-notification-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'global-notification-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content-box">
      <button class="modal-close-btn" id="close-notif-modal">&times;</button>
      <div style="text-align: center; margin-bottom: 24px;">
        <div style="width:64px;height:64px;background:rgba(0,255,136,0.15);border:2px solid #00FF88;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#00FF88;font-size:28px;margin-bottom:16px;">
          ✓
        </div>
        <h3 style="color:#FFF;margin-bottom:8px;">${title}</h3>
        <p style="color:#A8B2C1;font-size:1.05rem;">${subtitle}</p>
      </div>

      ${details.length ? `
        <div style="background:rgba(10,22,40,0.7);border:1px solid rgba(0,212,255,0.2);border-radius:12px;padding:18px;margin-bottom:24px;font-size:0.875rem;line-height:1.7;color:#A8B2C1;">
          ${details.map(d => `<div style="margin-bottom:6px;">${d}</div>`).join('')}
        </div>
      ` : ''}

      <div style="text-align: center;">
        <button class="btn btn-red" id="confirm-notif-btn" style="min-width:180px;">${actionText}</button>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const close = () => modal.classList.remove('active');
  modal.querySelector('#close-notif-modal').addEventListener('click', close);
  modal.querySelector('#confirm-notif-btn').addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}

function showBookingConfirmationModal(formData) {
  let modal = document.getElementById('global-notification-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'global-notification-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content-box" style="max-width: 720px;">
      <button class="modal-close-btn" id="close-notif-modal">&times;</button>
      
      <div style="text-align: center; margin-bottom: 20px;">
        <div class="badge-chip">Booking Request Confirmed</div>
        <h2 style="font-size: 1.75rem; margin-bottom: 8px;">You're One Step Away, ${formData.fullName}!</h2>
        <p style="color: var(--text-body); font-size: 0.95rem;">
          Hi <strong>${formData.fullName}</strong>, your booking request has been received! We'll send you a calendar confirmation email shortly.
        </p>
      </div>

      <!-- Simulated Dispatch Summary -->
      <div style="background: rgba(10,22,40,0.8); border: 1px solid rgba(0,212,255,0.2); border-radius: 12px; padding: 16px; margin-bottom: 20px; font-size: 0.85rem; color: #A8B2C1;">
        <div><strong>👤 Client:</strong> ${formData.fullName} | <strong>Company:</strong> ${formData.company} (${formData.companySize})</div>
        <div><strong>📞 Phone:</strong> ${formData.phone} | <strong>Email:</strong> ${formData.email}</div>
        <div><strong>🎯 Needs:</strong> "${formData.helpTopic}"</div>
        <div style="margin-top: 6px; color: #00FF88;">✓ Admin email alert dispatched to <strong>iniesta.automatiom@gmail.com</strong></div>
      </div>

      <!-- Calendly Widget Placeholder Frame -->
      <div style="background: rgba(17,34,64,0.9); border: 1px dashed var(--accent-cyan); border-radius: 14px; padding: 30px 20px; text-align: center; margin-bottom: 20px;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(0,212,255,0.15); border: 1px solid var(--accent-cyan); display: inline-flex; align-items: center; justify-content: center; color: var(--accent-cyan); margin-bottom: 12px;">
          📅
        </div>
        <h4 style="color: #FFF; margin-bottom: 6px;">Select Your Preferred Time Slot</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; max-width: 460px; margin: 0 auto 16px auto;">
          30-Minute AI Strategy & Automation Discovery Session with Inoluwa.
        </p>
        <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
          <a href="https://calendly.com" target="_blank" rel="noopener" class="btn btn-sm btn-cyan">Open in Calendly Portal ↗</a>
          <button class="btn btn-sm btn-outline" id="confirm-notif-btn">Return to Site</button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const close = () => modal.classList.remove('active');
  modal.querySelector('#close-notif-modal').addEventListener('click', close);
  modal.querySelector('#confirm-notif-btn').addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}
