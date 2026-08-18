/**
 * INIESTA AUTOMATION HUB - AI CHATBOT WIDGET
 * Floating Cyan AI Assistant with Knowledge Engine & 5-second auto-open
 */

document.addEventListener('DOMContentLoaded', () => {
  injectChatbotWidget();
  initChatbotLogic();
});

function injectChatbotWidget() {
  if (document.getElementById('ai-chatbot-root')) return;

  const root = document.createElement('div');
  root.id = 'ai-chatbot-root';
  root.className = 'ai-chatbot-widget';
  root.innerHTML = `
    <!-- Floating Trigger Button -->
    <button class="chatbot-trigger-btn" id="chatbot-toggle-btn" aria-label="Open AI Assistant">
      <span class="chatbot-status-pulse"></span>
      <svg class="chat-open-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
        <circle cx="12" cy="10" r="1" fill="currentColor"></circle>
        <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
      </svg>
      <svg class="chat-close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- Chatbot Window -->
    <div class="chatbot-box" id="chatbot-box">
      <!-- Header -->
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="bot-avatar">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="11" width="18" height="10" rx="2"></rect>
              <circle cx="12" cy="5" r="2"></circle>
              <path d="M12 7v4"></path>
              <line x1="8" y1="16" x2="8.01" y2="16"></line>
              <line x1="16" y1="16" x2="16.01" y2="16"></line>
            </svg>
          </div>
          <div class="bot-title-group">
            <h4>Iniesta AI Assistant</h4>
            <span>● Online | Ready to help</span>
          </div>
        </div>
      </div>

      <!-- Messages Area -->
      <div class="chatbot-messages" id="chatbot-messages-list">
        <div class="chat-msg bot">
          Hi there! 👋 I'm Iniesta's AI assistant. How can I help you today? I can tell you about our services, or help you book a free strategy call.
        </div>
      </div>

      <!-- Quick Action Chips -->
      <div class="chatbot-quick-chips" id="chatbot-chips">
        <button class="quick-chip-btn" data-msg="What services do you offer?">🚀 Our Services</button>
        <button class="quick-chip-btn" data-msg="How do I book a free call?">📅 Book a Call</button>
        <button class="quick-chip-btn" data-msg="What is your pricing and turnaround time?">⏱️ Pricing & Timelines</button>
        <button class="quick-chip-btn" data-msg="How can I contact Inoluwa directly?">📩 Contact Info</button>
      </div>

      <!-- Input Area -->
      <form class="chatbot-input-area" id="chatbot-form">
        <input type="text" id="chatbot-input" placeholder="Type your question..." autocomplete="off" required>
        <button type="submit" class="chat-send-btn" aria-label="Send Message">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(root);
}

function initChatbotLogic() {
  const toggleBtn = document.getElementById('chatbot-toggle-btn');
  const chatBox = document.getElementById('chatbot-box');
  const messagesList = document.getElementById('chatbot-messages-list');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const chips = document.getElementById('chatbot-chips');

  if (!toggleBtn || !chatBox || !messagesList || !form || !input) return;

  function toggleChat(forceOpen = null) {
    const willOpen = forceOpen !== null ? forceOpen : !chatBox.classList.contains('open');
    chatBox.classList.toggle('open', willOpen);
    toggleBtn.classList.toggle('active', willOpen);
    if (willOpen) {
      setTimeout(() => input.focus(), 200);
    }
  }

  toggleBtn.addEventListener('click', () => toggleChat());

  // Auto-open after 5 seconds on first visit in this session
  const hasAutoOpened = sessionStorage.getItem('iniesta_bot_auto_opened');
  if (!hasAutoOpened) {
    setTimeout(() => {
      if (!chatBox.classList.contains('open')) {
        toggleChat(true);
        sessionStorage.setItem('iniesta_bot_auto_opened', 'true');
      }
    }, 5000);
  }

  // Quick Chips Click Handler
  chips.addEventListener('click', (e) => {
    const chipBtn = e.target.closest('.quick-chip-btn');
    if (!chipBtn) return;
    const msg = chipBtn.getAttribute('data-msg');
    if (msg) {
      sendMessage(msg);
    }
  });

  // Handle Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;
    sendMessage(userText);
    input.value = '';
  });

  function appendMessage(text, sender = 'bot') {
    const msgEl = document.createElement('div');
    msgEl.className = `chat-msg ${sender}`;
    msgEl.innerHTML = text;
    messagesList.appendChild(msgEl);
    messagesList.scrollTop = messagesList.scrollHeight;
  }

  function sendMessage(text) {
    appendMessage(text, 'user');

    // Simulate typing delay
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-msg bot typing-indicator';
    typingIndicator.innerHTML = '<span class="spinner" style="width:14px;height:14px;border-width:2px;margin-right:6px;"></span> Thinking...';
    messagesList.appendChild(typingIndicator);
    messagesList.scrollTop = messagesList.scrollHeight;

    setTimeout(() => {
      typingIndicator.remove();
      const response = generateAIResponse(text);
      appendMessage(response, 'bot');
    }, 600);
  }

  // Knowledge Engine for Iniesta Automation Hub
  function generateAIResponse(query) {
    const q = query.toLowerCase();

    // 1. Services
    if (q.includes('service') || q.includes('what do you do') || q.includes('offer') || q.includes('capabilities')) {
      return `At <strong>Iniesta Automation Hub</strong>, we build intelligent AI systems across 12 specialized areas:<br><br>
      • 🤖 <strong>AI Chatbots & Voice Agents</strong> (ChatGPT API, VAPI, ElevenLabs)<br>
      • 📅 <strong>AI Appointment Booking Agents</strong><br>
      • 📈 <strong>Lead Generation & Follow-Up Automation</strong><br>
      • ⚡ <strong>CRM Integrations</strong> (HubSpot, Salesforce, Zoho, GoHighLevel)<br>
      • 🔒 <strong>AI Security & Red Teaming</strong><br>
      • 💻 <strong>Custom AI App & Web Development</strong><br><br>
      👉 <a href="services.html" style="color:#00D4FF;text-decoration:underline;">Explore all 12 services</a> or <a href="book.html" style="color:#E63946;font-weight:700;">Book a Free Call</a>!`;
    }

    // 2. Booking a Call
    if (q.includes('book') || q.includes('call') || q.includes('schedule') || q.includes('consult') || q.includes('meeting')) {
      return `You can easily book a <strong>free 30-minute AI Strategy Consultation</strong> with our lead consultant, Inoluwa.<br><br>
      We'll audit your workflows, discuss your bottlenecks, and outline a custom AI implementation blueprint.<br><br>
      👉 <a href="book.html" class="btn btn-sm btn-red" style="display:inline-block;margin-top:6px;color:#fff !important;">Schedule My Free Call →</a>`;
    }

    // 3. Pricing / Cost
    if (q.includes('price') || q.includes('cost') || q.includes('quote') || q.includes('how much') || q.includes('rate')) {
      return `Every business has unique architecture and goals. We provide customized, fixed-price or milestone-based quotes tailored to your scope.<br><br>
      👉 Please <strong><a href="book.html" style="color:#00D4FF;text-decoration:underline;">book a free strategy call</a></strong> for a custom quote, ROI calculation, and implementation plan.`;
    }

    // 4. Turnaround Times / Timeline
    if (q.includes('timeline') || q.includes('turnaround') || q.includes('how long') || q.includes('time') || q.includes('duration')) {
      return `Our typical turnaround times range from <strong>2 to 6 weeks</strong> depending on project complexity and integration scope (e.g., custom AI agents vs. multi-channel enterprise CRM workflows).`;
    }

    // 5. Technologies & Tools
    if (q.includes('tech') || q.includes('tool') || q.includes('openai') || q.includes('claude') || q.includes('make') || q.includes('zapier') || q.includes('vapi') || q.includes('elevenlabs') || q.includes('hubspot')) {
      return `We engineer solutions with industry-leading AI and automation stacks including <strong>OpenAI GPT-4o, Anthropic Claude, Make.com, Zapier, VAPI, ElevenLabs, Twilio, GoHighLevel, HubSpot, Salesforce, Zoho</strong>, plus custom React and Python architectures.`;
    }

    // 6. Contact Information / Inoluwa
    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('inoluwa') || q.includes('address') || q.includes('location')) {
      return `You can reach Inoluwa and the Iniesta team directly:<br><br>
      📧 <strong>Email:</strong> <a href="mailto:iniesta.automatiom@gmail.com" style="color:#00D4FF;">iniesta.automatiom@gmail.com</a><br>
      📞 <strong>Phone:</strong> +234 810-627-3746 / 081-3538-4333<br>
      📍 <strong>Location:</strong> Akure, Ondo State, Nigeria<br><br>
      👉 Or leave a message on our <a href="contact.html" style="color:#00D4FF;text-decoration:underline;">Contact Page</a>.`;
    }

    // 7. Security / Red Teaming
    if (q.includes('security') || q.includes('red team') || q.includes('prompt injection') || q.includes('safety')) {
      return `We specialize in <strong>AI Security & Red Teaming</strong> — safeguarding LLM applications against prompt injections, data leakages, hallucination exploits, and compliance vulnerabilities.`;
    }

    // 8. Default fallback
    return `Let me connect you with <strong>Inoluwa</strong> directly. You can email us at <a href="mailto:iniesta.automatiom@gmail.com" style="color:#00D4FF;">iniesta.automatiom@gmail.com</a> or <a href="book.html" style="color:#E63946;font-weight:700;">book a free strategy call</a> to discuss your specific requirements.`;
  }
}
