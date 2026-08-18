/**
 * INIESTA AUTOMATION HUB - BLOG & PORTFOLIO LOGIC
 * Category Filtering, Article Modal Readers, Claude AI Certificate Viewer
 */

document.addEventListener('DOMContentLoaded', () => {
  initBlogFilter();
  initBlogModals();
  initCertificateModal();
  initPortfolioFilter();
});

/* ==========================================================================
   1. BLOG CATEGORY FILTER
   ========================================================================== */
function initBlogFilter() {
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card-item');

  if (!filterBtns.length || !blogCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      blogCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   2. BLOG ARTICLE MODAL READER
   ========================================================================== */
const blogArticlesData = {
  "post-1": {
    title: "10 Ways AI Can Automate Your Business in 2026",
    category: "AI Strategy",
    date: "Feb 20, 2026",
    readTime: "6 min read",
    author: "Inoluwa (Lead AI Consultant)",
    content: `
      <p>As we navigate 2026, artificial intelligence is no longer an experimental gimmick — it is the core operational engine of agile, high-margin enterprises. Companies that automate redundant workflows achieve up to a 60% operational overhead reduction while expanding client throughput.</p>
      
      <h4>1. Multi-Agent Customer Support Orchestration</h4>
      <p>Autonomous AI agents resolve up to 80% of support queries instantly, triggering real-time API lookups in your order management systems without human intervention.</p>
      
      <h4>2. Intelligent Lead Qualification & Instant Speed-to-Lead</h4>
      <p>Voice and chat agents contact inbound prospects in under 60 seconds, verifying budget and intent before seamlessly syncing them to your CRM.</p>

      <h4>3. Autonomous CRM Pipeline Sanitization & Follow-Up</h4>
      <p>Prevent deal slippage by automating personalized email check-ins, proposal generation, and pipeline status updates.</p>

      <h4>4. Automated Invoice & Financial Reconciliation</h4>
      <p>Extract line-item data from invoices and match ledger transactions across Stripe, QuickBooks, and Xero.</p>

      <h4>5. AI Content & Video Generation at Scale</h4>
      <p>Generate personalized client video briefings and documentation using HeyGen, Synthesia, and automated rendering pipelines.</p>

      <div style="margin-top:24px;padding:16px;background:rgba(0,212,255,0.08);border-left:3px solid #00D4FF;border-radius:4px;">
        <strong>Ready to implement these in your business?</strong><br>
        <a href="book.html" style="color:#00D4FF;text-decoration:underline;">Book a strategy session with Iniesta Automation Hub today →</a>
      </div>
    `
  },
  "post-2": {
    title: "Building an AI Roadmap: Where to Start",
    category: "AI Strategy",
    date: "Feb 2, 2026",
    readTime: "5 min read",
    author: "Inoluwa",
    content: `
      <p>Embarking on enterprise AI transformation requires clarity before code. A successful AI roadmap focuses on high-ROI, low-friction entry points first.</p>
      <h4>Phase 1: Process & Bottleneck Auditing</h4>
      <p>Identify repetitive human bottlenecks such as appointment scheduling, manual data entry, or repetitive customer triage.</p>
      <h4>Phase 2: Tooling & Data Architecture Selection</h4>
      <p>Integrate robust middleware like Make.com or custom microservices with enterprise LLMs.</p>
      <h4>Phase 3: Pilot Deployment & Iteration</h4>
      <p>Deploy a sandbox version, benchmark response quality, and verify human handoff protocols before rolling out company-wide.</p>
    `
  },
  "post-3": {
    title: "AI ROI: How to Measure the Value of Automation",
    category: "AI Strategy",
    date: "Jan 18, 2026",
    readTime: "7 min read",
    author: "Inoluwa",
    content: `
      <p>Calculating the true ROI of AI automation requires evaluating direct wage savings, error reduction rate, and increased revenue velocity from instant lead response times.</p>
      <h4>The 3-Pillar ROI Formula</h4>
      <p><strong>Total ROI = (Hours Saved × Hourly Wage Rate) + (Increased Close Rate Revenue) - (Automation Tech Costs)</strong></p>
      <p>Across our client deployments, typical ROI ranges from 400% to over 1300% within the first 6 months of active deployment.</p>
    `
  },
  "post-4": {
    title: "The Ultimate Guide to AI Chatbots for Customer Support",
    category: "Chatbots",
    date: "Feb 15, 2026",
    readTime: "8 min read",
    author: "Inoluwa",
    content: `
      <p>Modern conversational AI chatbots combine RAG (Retrieval-Augmented Generation) with function calling to deliver contextual, hallucination-free support across web, WhatsApp, and Telegram.</p>
      <h4>Key Pillars of Enterprise Chatbots:</h4>
      <ul>
        <li>• Knowledge Base Synchronization: Live embeddings from Notion, Zendesk, or custom PDFs.</li>
        <li>• Guardrails & Tone Calibration: Ensuring brand compliance and polite, concise replies.</li>
        <li>• Smart Escalation: Smooth routing to human operators when sentiment detection signals urgency.</li>
      </ul>
    `
  },
  "post-5": {
    title: "GPT-4 vs Dialogflow: Which Chatbot Platform is Right for You?",
    category: "Chatbots",
    date: "Jan 28, 2026",
    readTime: "6 min read",
    author: "Inoluwa",
    content: `
      <p>While Dialogflow excels at strict intent trees and deterministic telephony routing, GPT-4o powered chatbots offer superior semantic comprehension, nuanced reasoning, and adaptive multi-turn conversations.</p>
      <p>For most modern customer-facing deployments, a hybrid model using GPT-4 with structured tools provides the highest conversion and satisfaction rates.</p>
    `
  },
  "post-6": {
    title: "5 Mistakes to Avoid When Building Your First AI Chatbot",
    category: "Chatbots",
    date: "Jan 12, 2026",
    readTime: "5 min read",
    author: "Inoluwa",
    content: `
      <p>Avoid these common pitfalls when deploying AI agents:</p>
      <ol>
        <li>1. Neglecting system prompt guardrails against prompt injection.</li>
        <li>2. Feeding uncleaned or outdated documentation into the vector database.</li>
        <li>3. Omitting fallback human escalation paths.</li>
        <li>4. Overcomplicating user prompt requirements.</li>
        <li>5. Failing to log conversations for continuous reinforcement fine-tuning.</li>
      </ol>
    `
  },
  "post-7": {
    title: "How to Choose the Right AI Tools for Your Business",
    category: "Tools & Tech",
    date: "Feb 10, 2026",
    readTime: "6 min read",
    author: "Inoluwa",
    content: `
      <p>Choosing an automation stack depends on scale, developer availability, and integration ecosystems. We evaluate tools across modularity, security, uptime SLA, and API flexibility.</p>
    `
  },
  "post-8": {
    title: "Make vs Zapier: Best Automation Platform in 2026",
    category: "Tools & Tech",
    date: "Jan 22, 2026",
    readTime: "7 min read",
    author: "Inoluwa",
    content: `
      <p>Zapier offers simple triggers and broad integrations for non-technical teams, whereas Make.com offers superior visual routing, granular array manipulation, lower per-operation costs, and robust error handling for complex enterprise workflows.</p>
    `
  },
  "post-9": {
    title: "Top 10 AI Tools Every Business Should Be Using Right Now",
    category: "Tools & Tech",
    date: "Jan 8, 2026",
    readTime: "5 min read",
    author: "Inoluwa",
    content: `
      <p>From OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Make.com, ElevenLabs, VAPI, GoHighLevel, HeyGen, Cursor, to Fireflies.ai — discover the essential toolkit powering high-performing modern operations.</p>
    `
  },
  "post-10": {
    title: "AI Security Best Practices: Protecting Your AI Systems",
    category: "Security",
    date: "Feb 5, 2026",
    readTime: "6 min read",
    author: "Inoluwa",
    content: `
      <p>Securing LLM applications requires continuous monitoring, input sanitization, output guardrails, and role-based access control to prevent unauthorized internal data disclosures.</p>
    `
  },
  "post-11": {
    title: "What is Prompt Injection and How to Defend Against It",
    category: "Security",
    date: "Jan 26, 2026",
    readTime: "7 min read",
    author: "Inoluwa",
    content: `
      <p>Direct and indirect prompt injection attacks attempt to override system instructions through user input or untrusted third-party web content. We discuss defensive architectures using dual-LLM verifiers and strict schema validation.</p>
    `
  },
  "post-12": {
    title: "AI Red Teaming: Why Your Business Needs It",
    category: "Security",
    date: "Jan 10, 2026",
    readTime: "5 min read",
    author: "Inoluwa",
    content: `
      <p>AI Red Teaming simulates adversarial attacks against your deployed AI models to uncover jailbreaks, data leakage, and compliance vulnerabilities before malicious actors exploit them.</p>
    `
  },
  "post-13": {
    title: "CRM Automation with AI: A Complete Walkthrough",
    category: "CRM",
    date: "Jan 30, 2026",
    readTime: "8 min read",
    author: "Inoluwa",
    content: `
      <p>Learn how to connect inbound inquiries directly to your CRM, trigger automatic lead scoring, assign account executives, and generate personalized proposal decks automatically.</p>
    `
  },
  "post-14": {
    title: "HubSpot vs Salesforce: Which CRM Works Best with AI?",
    category: "CRM",
    date: "Jan 20, 2026",
    readTime: "6 min read",
    author: "Inoluwa",
    content: `
      <p>We compare HubSpot's Breeze AI native workflows against Salesforce's Agentforce architecture for enterprise scale, custom flexibility, and cost effectiveness.</p>
    `
  },
  "post-15": {
    title: "How AI Lead Scoring Transforms Your Sales Pipeline",
    category: "CRM",
    date: "Jan 5, 2026",
    readTime: "5 min read",
    author: "Inoluwa",
    content: `
      <p>By analyzing prospect behavior, website engagement, and enrichment data, predictive AI models score leads in real-time so your sales team focuses solely on high-closing opportunities.</p>
    `
  },
  "post-16": {
    title: "Voice AI Revolution: What You Need to Know",
    category: "Voice AI",
    date: "Jan 25, 2026",
    readTime: "6 min read",
    author: "Inoluwa",
    content: `
      <p>Ultra-low-latency voice models now achieve human parity with sub-500ms response times, natural conversational interruptions, and lifelike emotional inflections.</p>
    `
  },
  "post-17": {
    title: "How to Deploy an AI Phone Agent for Your Business",
    category: "Voice AI",
    date: "Jan 15, 2026",
    readTime: "7 min read",
    author: "Inoluwa",
    content: `
      <p>A step-by-step guide to setting up SIP trunking, Twilio phone numbers, and VAPI voice models to answer after-hours calls and schedule appointments automatically.</p>
    `
  },
  "post-18": {
    title: "ElevenLabs vs VAPI: Best Voice AI Platform Compared",
    category: "Voice AI",
    date: "Jan 3, 2026",
    readTime: "6 min read",
    author: "Inoluwa",
    content: `
      <p>A technical comparison between ElevenLabs Conversational AI engine and VAPI's end-to-end voice telephony orchestration stack for production reliability and voice quality.</p>
    `
  }
};

function initBlogModals() {
  const readMoreBtns = document.querySelectorAll('.read-blog-btn');
  if (!readMoreBtns.length) return;

  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const postId = btn.getAttribute('data-post-id');
      const post = blogArticlesData[postId];
      if (!post) return;

      openArticleModal(post);
    });
  });
}

function openArticleModal(post) {
  let modal = document.getElementById('blog-article-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'blog-article-modal';
    modal.className = 'modal-backdrop';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content-box" style="max-width: 820px;">
      <button class="modal-close-btn" id="close-blog-modal">&times;</button>
      <div style="margin-bottom: 20px;">
        <span class="badge-chip">${post.category}</span>
        <h2 style="font-size: 2rem; margin: 12px 0 8px 0; color: #FFF;">${post.title}</h2>
        <div style="display:flex; gap:16px; color: var(--text-muted); font-size: 0.85rem;">
          <span>✍️ By ${post.author}</span>
          <span>📅 ${post.date}</span>
          <span>⏱️ ${post.readTime}</span>
        </div>
      </div>
      <hr style="border:0;height:1px;background:rgba(0,212,255,0.2);margin-bottom:24px;">
      <div style="color: var(--text-body); font-size: 1rem; line-height: 1.75;">
        ${post.content}
      </div>
      <div style="margin-top: 32px; text-align: center;">
        <a href="https://calendar.app.google/Xt1GoHFKonVmbPWe8" target="_blank" rel="noopener" class="btn btn-red">Book a Free AI Strategy Call</a>
      </div>
    </div>
  `;

  modal.classList.add('active');

  const close = () => modal.classList.remove('active');
  modal.querySelector('#close-blog-modal').addEventListener('click', close);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });
}

/* ==========================================================================
   3. CLAUDE AI CERTIFICATE MODAL (/about)
   ========================================================================== */
function initCertificateModal() {
  const certBtn = document.getElementById('view-certificate-btn');
  if (!certBtn) return;

  certBtn.addEventListener('click', () => {
    let modal = document.getElementById('cert-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'cert-modal';
      modal.className = 'modal-backdrop';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content-box" style="max-width: 680px; text-align: center;">
        <button class="modal-close-btn" id="close-cert-modal">&times;</button>
        
        <div class="badge-chip badge-red">Verified AI Credential</div>
        <h3 style="color: #FFF; margin: 12px 0 6px 0;">Anthropic Claude Certified Specialist</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">Issued to Inoluwa | Iniesta Automation Hub</p>

        <!-- Styled Certificate Representation -->
        <div style="background: linear-gradient(135deg, #0A1628 0%, #112240 100%); border: 2px solid var(--accent-cyan); border-radius: 16px; padding: 36px 24px; position: relative; box-shadow: var(--shadow-cyan-glow); margin-bottom: 24px;">
          <div style="font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent-cyan); font-weight: 700; margin-bottom: 8px;">Certificate of Competence & Mastery</div>
          <h2 style="font-size: 1.6rem; color: #FFF; margin-bottom: 12px;">Claude AI Architecture & Advanced Prompt Engineering</h2>
          <p style="color: var(--text-body); font-size: 0.9rem; max-width: 480px; margin: 0 auto 20px auto;">
            Demonstrating verified expertise in building enterprise multi-agent workflows, tool use, Claude 3.5 Sonnet integrations, and secure LLM guardrails.
          </p>
          <div style="display:flex;justify-content:space-around;border-top:1px solid rgba(0,212,255,0.2);padding-top:16px;font-size:0.8rem;color:var(--text-muted);">
            <div><strong>Verification ID:</strong> INI-CLAUDE-2026</div>
            <div><strong>Status:</strong> Active & Verified ✓</div>
          </div>
        </div>

        <button class="btn btn-outline" id="close-cert-btn">Close Preview</button>
      </div>
    `;

    modal.classList.add('active');

    const close = () => modal.classList.remove('active');
    modal.querySelector('#close-cert-modal').addEventListener('click', close);
    modal.querySelector('#close-cert-btn').addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
  });
}

/* ==========================================================================
   4. PORTFOLIO FILTER (PORTFOLIO PAGE)
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const projectItems = document.querySelectorAll('.portfolio-item');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'flex';
          setTimeout(() => { item.style.opacity = '1'; }, 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => { item.style.display = 'none'; }, 200);
        }
      });
    });
  });
}
