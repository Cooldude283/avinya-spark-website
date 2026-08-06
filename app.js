/* ==========================================================================
   AVINYA SPARK INTERNATIONAL - INTERACTIVE ENGINE & UI
   ========================================================================== */

// --- Default Quiz Data (Easy to edit & customize) ---
window.quizConfig = {
  title: "Free Business AI Audit",
  subtitle: "Evaluate your company's AI readiness, customer acquisition efficiency, and operational bottlenecks in 3-5 minutes.",
  pillars: [
    { id: "data", name: "Data & Systems", color: "#06b6d4" },
    { id: "leadgen", name: "Customer Acquisition", color: "#6366f1" },
    { id: "readiness", name: "Team & Process Readiness", color: "#10b981" }
  ],
  questions: [
    {
      id: 1,
      pillar: "data",
      question: "How does your company currently store and use customer data?",
      options: [
        { label: "A. Mostly manual spreadsheets or sticky notes", points: 5 },
        { label: "B. Standard CRM/Database, but data isn't synced", points: 12 },
        { label: "C. Integrated digital tools with basic reporting", points: 20 },
        { label: "D. Automated real-time data pipelines & predictive dashboards", points: 30 }
      ]
    },
    {
      id: 2,
      pillar: "leadgen",
      question: "How are potential new business leads discovered and followed up?",
      options: [
        { label: "A. Manual outreach whenever team has free time", points: 5 },
        { label: "B. Paid ads or lead forms handled manually within 24-48 hrs", points: 12 },
        { label: "C. Automated lead capture with scheduled email sequences", points: 22 },
        { label: "D. AI-powered Lead Engine that qualifies & books meetings 24/7", points: 35 }
      ]
    },
    {
      id: 3,
      pillar: "readiness",
      question: "How does leadership handle repetitive tasks, scheduling & meeting summaries?",
      options: [
        { label: "A. Boss/Team handles everything manually, eating up key hours", points: 5 },
        { label: "B. Virtual Assistant or staff handles administrative overhead", points: 12 },
        { label: "C. Basic calendar booking links and automatic reminders", points: 20 },
        { label: "D. Dedicated AI Assistant handling scheduling, summaries & reminders", points: 35 }
      ]
    }
  ],
  tiers: [
    { maxScore: 30, label: "AI-Curious", tag: "Just Getting Started", color: "#f59e0b", desc: "Your business has high growth potential by automating manual bottlenecks and centralizing data." },
    { maxScore: 70, label: "AI-Ready", tag: "Doing Well", color: "#06b6d4", desc: "Solid foundation! Implementing custom AI agents and targeted lead gen will rapidly scale operations." },
    { maxScore: 100, label: "AI-Accelerating", tag: "Super Advanced", color: "#10b981", desc: "Top-tier tech adoption. Fine-tuning AI workflows will maximize executive productivity and ROI." }
  ]
};

// --- Application State ---
let currentQuizStep = 0; // 0 = welcome, 1..N = questions, N+1 = company info, N+2 = lead capture, N+3 = results
let quizAnswers = {};
let leadInfo = { name: '', email: '', industry: 'Technology', companySize: '1-10' };
let currentSelectedTime = '10:00 AM EST';

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  if (['home', 'services', 'audit', 'about', 'contact'].includes(hash)) {
    navigateTo(hash);
  } else {
    navigateTo('home');
  }
});

// Navigation Router
function navigateTo(pageId) {
  const contentEl = document.getElementById('app-content');
  
  // Update header links
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const activeLink = document.getElementById(`nav-${pageId}`);
  if (activeLink) activeLink.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });

  switch (pageId) {
    case 'home':
      contentEl.innerHTML = renderHomePage();
      break;
    case 'services':
      contentEl.innerHTML = renderServicesPage();
      break;
    case 'audit':
      contentEl.innerHTML = renderAuditPage();
      break;
    case 'about':
      contentEl.innerHTML = renderAboutPage();
      break;
    case 'contact':
      contentEl.innerHTML = renderContactPage();
      break;
    default:
      contentEl.innerHTML = renderHomePage();
  }

  if (window.lucide) lucide.createIcons();
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  mobileNav.classList.toggle('open');
}

function closeMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  mobileNav.classList.remove('open');
}

/* ==========================================================================
   PAGE RENDERERS
   ========================================================================== */

function renderHomePage() {
  return `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="section-tag"><i data-lucide="zap"></i> Results-Driven AI Transformation</div>
          <h1>Empowering Businesses to <span class="gradient-text">Work Better & Grow Faster</span> with AI</h1>
          <p>We don't sell fancy technology for its own sake. We ask what you want to achieve, then build smart AI tools that deliver measurable growth.</p>
          <div class="hero-ctas">
            <button class="btn btn-primary btn-lg" onclick="navigateTo('audit')">
              <i data-lucide="cpu"></i> Take the Free AI Audit
            </button>
            <button class="btn btn-outline btn-lg" onclick="openBookingModal()">
              <i data-lucide="calendar"></i> Book a Call
            </button>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <h4>100%</h4>
              <p>Custom Built AI Tools</p>
            </div>
            <div class="stat-item">
              <h4>3-5 Min</h4>
              <p>Free Business Audit</p>
            </div>
            <div class="stat-item">
              <h4>Global</h4>
              <p>Leadership Expertise</p>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="card hero-interactive-card" style="border-color: var(--cyan-accent);">
            <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem;">
              <div class="logo-icon"><i data-lucide="sparkles"></i></div>
              <div>
                <h3 style="font-size:1.2rem; margin:0;">Free AI Audit Preview</h3>
                <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">Check your business score</p>
              </div>
            </div>
            <p style="font-size:0.95rem; color:var(--text-muted); margin-bottom:1.5rem;">Answer 3 quick questions regarding your company's data, lead acquisition, and leadership workflows to receive a customized report.</p>
            <button class="btn btn-cyan btn-full" onclick="navigateTo('audit')">
              Start Free Audit Now <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="services-section">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">Our Core Offerings</div>
          <h2>Three Powerful Ways We Accelerate Your Business</h2>
          <p>Tailored AI solutions engineered to solve real business challenges and unlock revenue.</p>
        </div>

        <div class="services-grid">
          <div class="card service-card">
            <div class="card-icon"><i data-lucide="line-chart"></i></div>
            <h3>AI Business Growth Audit</h3>
            <p>Finds where AI can help your business the most by auditing your operations, data flow, and productivity.</p>
            <ul class="service-features">
              <li><i data-lucide="check"></i> In-depth workflow analysis</li>
              <li><i data-lucide="check"></i> Custom ROI roadmap</li>
              <li><i data-lucide="check"></i> Tailored action plan</li>
            </ul>
            <button class="btn btn-outline btn-full" onclick="navigateTo('services')">Learn More</button>
          </div>

          <div class="card service-card">
            <div class="card-icon" style="color:var(--cyan-accent);"><i data-lucide="users"></i></div>
            <h3>AI Lead Generation Engine</h3>
            <p>Smart tools that help your business find, qualify, and convert new prospective customers automatically.</p>
            <ul class="service-features">
              <li><i data-lucide="check"></i> 24/7 lead qualification</li>
              <li><i data-lucide="check"></i> Automated outreach flows</li>
              <li><i data-lucide="check"></i> CRM sync & alerts</li>
            </ul>
            <button class="btn btn-outline btn-full" onclick="navigateTo('services')">Learn More</button>
          </div>

          <div class="card service-card">
            <div class="card-icon" style="color:var(--emerald-accent);"><i data-lucide="bot"></i></div>
            <h3>AI CEO Assistant</h3>
            <p>An intelligent executive helper for bosses that handles calendar scheduling, meeting summaries, and priority reminders.</p>
            <ul class="service-features">
              <li><i data-lucide="check"></i> Smart calendar management</li>
              <li><i data-lucide="check"></i> Auto meeting action items</li>
              <li><i data-lucide="check"></i> Daily executive briefs</li>
            </ul>
            <button class="btn btn-outline btn-full" onclick="navigateTo('services')">Learn More</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership Spotlight -->
    <section style="padding: 4rem 0; background: rgba(15, 23, 42, 0.4);">
      <div class="container hero-grid">
        <div>
          <div class="section-tag">Leadership</div>
          <h2>Meet Rajesh Damerla</h2>
          <p style="color: var(--text-muted); font-size:1.1rem; margin-bottom:1.5rem;">
            A seasoned global business leader who has led teams across multiple countries, Rajesh combines executive strategic vision with deep passion for practical AI implementation.
          </p>
          <p style="color: var(--text-muted); font-size:1.0rem; margin-bottom:2rem;">
            Alongside <strong>Neha</strong>, who engineers our AI backend tools, Avinya Spark focuses on tangible business results—not tech jargon.
          </p>
          <button class="btn btn-outline" onclick="navigateTo('about')">
            Read Our Full Story <i data-lucide="arrow-right"></i>
          </button>
        </div>
        <div class="card" style="text-align:center; padding:3rem;">
          <div style="width:120px; height:120px; border-radius:50%; background:linear-gradient(135deg, var(--primary), var(--cyan-accent)); margin:0 auto 1.5rem; display:flex; align-items:center; justify-content:center; font-size:3rem; color:#fff; font-family:var(--font-heading); font-weight:800;">
            RD
          </div>
          <h3>Rajesh Damerla</h3>
          <p style="color:var(--cyan-accent); font-weight:600; font-size:0.9rem;">Founder & Business Leader</p>
          <p style="color:var(--text-muted); font-size:0.9rem; margin-top:1rem;">"Technology should serve your business goals, simplify your operations, and multiply your revenue."</p>
        </div>
      </div>
    </section>
  `;
}

function renderServicesPage() {
  return `
    <section style="padding: 4rem 0 2rem;">
      <div class="container section-header">
        <div class="section-tag">Services & Packages</div>
        <h2>Solutions Built for Measurable Outcomes</h2>
        <p>Explore our 3 primary AI services and flexible service packages designed to match your company's stage.</p>
      </div>
    </section>

    <section class="container" style="margin-bottom: 5rem;">
      <div class="services-grid">
        <div class="card service-card">
          <div class="card-icon"><i data-lucide="line-chart"></i></div>
          <h3>AI Business Growth Audit</h3>
          <p>Finds where AI can help a business the most. We analyze your tech stack, team bottlenecks, and operational cost drivers.</p>
          <button class="btn btn-cyan btn-full mt-3" onclick="navigateTo('audit')">Take the Audit</button>
        </div>

        <div class="card service-card">
          <div class="card-icon" style="color:var(--cyan-accent);"><i data-lucide="users"></i></div>
          <h3>AI Lead Generation Engine</h3>
          <p>Smart automation tools that identify high-intent prospects, qualify incoming leads 24/7, and book calls automatically.</p>
          <button class="btn btn-outline btn-full mt-3" onclick="openBookingModal()">Book a Strategy Call</button>
        </div>

        <div class="card service-card">
          <div class="card-icon" style="color:var(--emerald-accent);"><i data-lucide="bot"></i></div>
          <h3>AI CEO Assistant</h3>
          <p>Empowers business leaders by handling scheduling, summarizing long documents/meetings, and setting proactive reminders.</p>
          <button class="btn btn-outline btn-full mt-3" onclick="openBookingModal()">Book a Strategy Call</button>
        </div>
      </div>
    </section>

    <!-- Packages Section (NO PRICES) -->
    <section style="background: rgba(15, 23, 42, 0.6); padding: 5rem 0;">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">Service Packages</div>
          <h2>Choose the Right Track for Your Growth</h2>
          <p>Flexible engagement models tailored for getting started, scaling, or total transformation.</p>
        </div>

        <div class="packages-grid">
          <!-- Package 1 -->
          <div class="card package-card">
            <div>
              <h3>Spark AI Ignite</h3>
              <p style="color:var(--cyan-accent); font-weight:600; font-size:0.9rem; margin-bottom:1.5rem;">For Getting Started</p>
              <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem;">Ideal for small teams looking to eliminate repetitive manual work and test AI capabilities.</p>
              <ul class="service-features">
                <li><i data-lucide="check"></i> Initial AI Business Audit</li>
                <li><i data-lucide="check"></i> 1 Core AI Automation setup</li>
                <li><i data-lucide="check"></i> Basic CRM & Lead setup</li>
                <li><i data-lucide="check"></i> Staff training & onboarding</li>
              </ul>
            </div>
            <button class="btn btn-outline btn-full mt-4" onclick="openBookingModal()">Book a Call</button>
          </div>

          <!-- Package 2 -->
          <div class="card package-card popular">
            <div class="popular-badge">Most Popular</div>
            <div>
              <h3>Spark AI Momentum</h3>
              <p style="color:var(--cyan-accent); font-weight:600; font-size:0.9rem; margin-bottom:1.5rem;">For Growing Faster</p>
              <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem;">Designed for scaling businesses seeking automated customer acquisition and executive AI help.</p>
              <ul class="service-features">
                <li><i data-lucide="check"></i> Full AI Growth Audit & Blueprint</li>
                <li><i data-lucide="check"></i> AI Lead Generation Engine</li>
                <li><i data-lucide="check"></i> AI CEO Assistant integration</li>
                <li><i data-lucide="check"></i> Priority support & optimization</li>
              </ul>
            </div>
            <button class="btn btn-primary btn-full mt-4" onclick="openBookingModal()">Book a Call</button>
          </div>

          <!-- Package 3 -->
          <div class="card package-card">
            <div>
              <h3>Spark AI Horizon</h3>
              <p style="color:var(--cyan-accent); font-weight:600; font-size:0.9rem; margin-bottom:1.5rem;">For Full Transformation</p>
              <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem;">Comprehensive enterprise AI integration, custom autonomous agents, and strategic advisory.</p>
              <ul class="service-features">
                <li><i data-lucide="check"></i> End-to-end custom AI ecosystem</li>
                <li><i data-lucide="check"></i> Dedicated AI CEO Assistant</li>
                <li><i data-lucide="check"></i> Multi-channel Lead Engine</li>
                <li><i data-lucide="check"></i> Continuous executive advisory</li>
              </ul>
            </div>
            <button class="btn btn-outline btn-full mt-4" onclick="openBookingModal()">Book a Call</button>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="container" style="padding: 5rem 0;">
      <div class="section-header">
        <div class="section-tag">Frequently Asked Questions</div>
        <h2>Common Questions</h2>
      </div>
      <div style="max-width:800px; margin:0 auto; display:flex; flex-direction:column; gap:1.25rem;">
        <div class="card" style="padding:1.5rem;">
          <h4 style="font-size:1.1rem; margin-bottom:0.5rem;">How long does the AI Audit take?</h4>
          <p style="color:var(--text-muted); font-size:0.95rem;">The online quiz takes 3-5 minutes. Once submitted, you'll receive immediate score insights and can book a 1-on-1 strategy session to review detailed recommendations.</p>
        </div>
        <div class="card" style="padding:1.5rem;">
          <h4 style="font-size:1.1rem; margin-bottom:0.5rem;">Do I need existing technical knowledge to use your AI tools?</h4>
          <p style="color:var(--text-muted); font-size:0.95rem;">Not at all! We build straightforward, user-friendly solutions so your team can focus on results rather than managing complex code.</p>
        </div>
      </div>
    </section>
  `;
}

function renderAuditPage() {
  const config = window.quizConfig;
  const totalQuestions = config.questions.length;
  
  // Render step based on currentQuizStep
  let stepContent = '';

  if (currentQuizStep === 0) {
    // Welcome Screen
    stepContent = `
      <div style="text-align:center;">
        <div class="score-badge" style="margin:0 auto 2rem; border-color:var(--primary);">
          <i data-lucide="cpu" style="font-size:3rem; color:var(--cyan-accent);"></i>
        </div>
        <h2 style="font-size:2.2rem; margin-bottom:1rem;">${config.title}</h2>
        <p style="color:var(--text-muted); font-size:1.1rem; max-width:600px; margin:0 auto 2.5rem;">${config.subtitle}</p>
        
        <div style="display:flex; justify-content:center; gap:2rem; margin-bottom:3rem; font-size:0.95rem; color:var(--text-muted);">
          <div><i data-lucide="clock" style="color:var(--cyan-accent);"></i> Takes 3–5 minutes</div>
          <div><i data-lucide="shield-check" style="color:var(--emerald-accent);"></i> 100% Free & Confidential</div>
        </div>

        <button class="btn btn-primary btn-lg" onclick="nextQuizStep()">
          Start Audit Now <i data-lucide="arrow-right"></i>
        </button>
      </div>
    `;
  } else if (currentQuizStep <= totalQuestions) {
    // Question Step
    const qIndex = currentQuizStep - 1;
    const q = config.questions[qIndex];
    const progressPercent = Math.round((currentQuizStep / (totalQuestions + 2)) * 100);

    stepContent = `
      <div class="progress-bar-container">
        <div class="progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
        <span class="section-tag" style="margin:0;">Question ${currentQuizStep} of ${totalQuestions}</span>
        <span style="font-size:0.85rem; color:var(--text-muted);">${progressPercent}% Complete</span>
      </div>

      <h3 style="font-size:1.4rem; margin-bottom:2rem;">${q.question}</h3>

      <div class="quiz-options">
        ${q.options.map((opt, idx) => `
          <button class="option-btn ${quizAnswers[q.id] === opt.points ? 'selected' : ''}" onclick="selectQuizOption(${q.id}, ${opt.points})">
            <span>${opt.label}</span>
            <i data-lucide="circle-check-big" style="opacity: ${quizAnswers[q.id] === opt.points ? '1' : '0.2'}"></i>
          </button>
        `).join('')}
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:2rem;">
        <button class="btn btn-outline" onclick="prevQuizStep()" ${currentQuizStep === 1 ? 'disabled style="opacity:0.5;"' : ''}>
          <i data-lucide="arrow-left"></i> Back
        </button>
        <button class="btn btn-primary" onclick="nextQuizStep()" ${!quizAnswers[q.id] ? 'disabled style="opacity:0.5;"' : ''}>
          Next Question <i data-lucide="arrow-right"></i>
        </button>
      </div>
    `;
  } else if (currentQuizStep === totalQuestions + 1) {
    // Business Profile Step
    const progressPercent = Math.round(((totalQuestions + 1) / (totalQuestions + 2)) * 100);
    stepContent = `
      <div class="progress-bar-container">
        <div class="progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
      <span class="section-tag">Almost Done!</span>
      <h3 style="font-size:1.4rem; margin-bottom:1rem;">Tell us a bit about your business</h3>
      <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:2rem;">This helps us personalize your AI readiness recommendations.</p>

      <div class="form-group">
        <label>Industry</label>
        <select class="form-input" id="profile-industry" onchange="leadInfo.industry = this.value">
          <option value="Technology">Technology & Software</option>
          <option value="Healthcare">Healthcare & Life Sciences</option>
          <option value="Finance">Finance & Professional Services</option>
          <option value="Retail">Retail & E-commerce</option>
          <option value="Manufacturing">Manufacturing & Operations</option>
          <option value="Other">Other Services</option>
        </select>
      </div>

      <div class="form-group">
        <label>Company Size</label>
        <select class="form-input" id="profile-size" onchange="leadInfo.companySize = this.value">
          <option value="1-10">1-10 employees</option>
          <option value="11-50">11-50 employees</option>
          <option value="51-200">51-200 employees</option>
          <option value="200+">200+ employees</option>
        </select>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:2rem;">
        <button class="btn btn-outline" onclick="prevQuizStep()"><i data-lucide="arrow-left"></i> Back</button>
        <button class="btn btn-primary" onclick="nextQuizStep()">Continue <i data-lucide="arrow-right"></i></button>
      </div>
    `;
  } else if (currentQuizStep === totalQuestions + 2) {
    // Lead Capture Step (With Score Preview Sneak Peek)
    const rawScore = calculateTotalScore();
    const progressPercent = 95;
    stepContent = `
      <div class="progress-bar-container">
        <div class="progress-fill" style="width: ${progressPercent}%;"></div>
      </div>
      <div style="text-align:center; margin-bottom:2rem;">
        <div class="section-tag">Score Calculated!</div>
        <h3>Where should we send your full report?</h3>
        <p style="color:var(--text-muted); font-size:0.95rem;">Enter your name and email to view your full analysis and download your PDF audit.</p>
        
        <div style="background:rgba(99, 102, 241, 0.1); border:1px dashed var(--primary); padding:1rem; border-radius:var(--radius-md); margin:1.5rem 0;">
          <span style="font-size:0.85rem; color:var(--cyan-accent); font-weight:600;">SNEAK PEEK PREVIEW</span>
          <h4 style="font-size:1.5rem; color:#fff; margin-top:0.25rem;">Preliminary AI Score: ${rawScore} / 100</h4>
        </div>
      </div>

      <form onsubmit="handleAuditLeadSubmit(event)">
        <div class="form-group">
          <label for="lead-name">Your Full Name</label>
          <input type="text" id="lead-name" class="form-input" placeholder="Rajesh Damerla" required value="${leadInfo.name}" onchange="leadInfo.name = this.value">
        </div>
        <div class="form-group">
          <label for="lead-email">Business Email</label>
          <input type="email" id="lead-email" class="form-input" placeholder="rajesh@company.com" required value="${leadInfo.email}" onchange="leadInfo.email = this.value">
        </div>

        <button type="submit" class="btn btn-cyan btn-full btn-lg mt-3">
          <i data-lucide="bar-chart-2"></i> Reveal Full Results & Download PDF Report
        </button>
      </form>
    `;
  } else {
    // Results Screen
    const totalScore = calculateTotalScore();
    const tier = getTierForScore(totalScore);

    stepContent = `
      <div class="results-header">
        <div class="score-badge">
          <span class="score-number">${totalScore}</span>
          <span class="score-label-sub">out of 100</span>
        </div>
        <h2 style="font-size:2rem; margin-bottom:0.5rem;">AI Readiness: <span style="color:${tier.color}">${tier.label}</span></h2>
        <span class="section-tag" style="background:rgba(255,255,255,0.05); color:${tier.color}; border-color:${tier.color};">${tier.tag}</span>
        <p style="color:var(--text-muted); font-size:1.05rem; max-width:600px; margin:1rem auto 0;">${tier.desc}</p>
      </div>

      <!-- Pillar Breakdown Bars -->
      <div class="pillar-breakdown">
        <h4 style="font-size:1.1rem; margin-bottom:1rem;">Pillar Performance Breakdown</h4>
        ${config.pillars.map(pillar => {
          const score = calculatePillarScore(pillar.id);
          return `
            <div class="pillar-item">
              <div class="pillar-info">
                <span>${pillar.name}</span>
                <span style="font-weight:700; color:${pillar.color}">${score}%</span>
              </div>
              <div class="pillar-bar-bg">
                <div class="pillar-bar-fill" style="width:${score}%; background:${pillar.color};"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Top 3 Actionable Suggestions -->
      <div style="background:rgba(15, 23, 42, 0.7); border:1px solid var(--glass-border); border-radius:var(--radius-lg); padding:1.5rem; margin:2rem 0;">
        <h4 style="font-size:1.1rem; margin-bottom:1rem; color:var(--cyan-accent);"><i data-lucide="sparkles"></i> Top 3 Growth Recommendations</h4>
        <ul style="list-style:none; display:flex; flex-direction:column; gap:0.85rem;">
          <li style="display:flex; gap:0.75rem; font-size:0.95rem;">
            <i data-lucide="check-circle-2" style="color:var(--emerald-accent); flex-shrink:0;"></i>
            <span><strong>Automate Lead Outreach:</strong> Deploy an AI Lead Engine to convert inquiry forms within 5 minutes.</span>
          </li>
          <li style="display:flex; gap:0.75rem; font-size:0.95rem;">
            <i data-lucide="check-circle-2" style="color:var(--emerald-accent); flex-shrink:0;"></i>
            <span><strong>Deploy AI Executive Assistant:</strong> Save 10+ leadership hours/week by automating meeting summaries & scheduling.</span>
          </li>
          <li style="display:flex; gap:0.75rem; font-size:0.95rem;">
            <i data-lucide="check-circle-2" style="color:var(--emerald-accent); flex-shrink:0;"></i>
            <span><strong>Centralize Data Pipeline:</strong> Sync CRM data directly with predictive dashboards for real-time reporting.</span>
          </li>
        </ul>
      </div>

      <!-- CTAs & Actions -->
      <div style="display:flex; flex-direction:column; gap:1rem;">
        <button class="btn btn-primary btn-lg btn-full" onclick="openBookingModal()">
          <i data-lucide="calendar"></i> Book a Free AI Strategy Call
        </button>
        <button class="btn btn-outline btn-full" onclick="downloadPDFReport()">
          <i data-lucide="download"></i> Download Full PDF Report
        </button>
        <button class="btn btn-outline btn-full" style="font-size:0.85rem;" onclick="resetQuiz()">
          <i data-lucide="rotate-ccw"></i> Retake Audit
        </button>
      </div>
    `;
  }

  return `
    <section style="padding: 4rem 0 5rem;">
      <div class="container quiz-wrapper">
        <div class="quiz-card">
          ${stepContent}
        </div>
      </div>
    </section>
  `;
}

function renderAboutPage() {
  return `
    <section style="padding: 5rem 0;">
      <div class="container">
        <div class="section-header">
          <div class="section-tag">About Avinya Spark</div>
          <h2>Driven by Strategic Vision & Cutting-Edge Tech</h2>
          <p>We bridge the gap between complex AI innovation and practical business growth.</p>
        </div>

        <div class="hero-grid" style="align-items:center; margin-bottom:4rem;">
          <div class="card" style="padding:2.5rem;">
            <h3 style="font-size:1.8rem; margin-bottom:1rem;">Our Mission</h3>
            <p style="color:var(--text-muted); margin-bottom:1.5rem;">
              Avinya Spark International was founded on a simple premise: business leaders don't want technical complexity—they want results. We design intuitive, high-impact AI systems that help companies find new clients, automate operational clutter, and focus on core revenue drivers.
            </p>
            <p style="color:var(--text-muted);">
              Whether you are taking your first step into digital automation or scaling enterprise operations, our tailored tools ensure every dollar spent translates directly into measurable ROI.
            </p>
          </div>

          <div style="display:flex; flex-direction:column; gap:1.5rem;">
            <!-- Team Member 1 -->
            <div class="card" style="display:flex; gap:1.5rem; align-items:center;">
              <div style="width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg, var(--primary), var(--cyan-accent)); display:flex; align-items:center; justify-content:center; font-size:1.8rem; font-weight:800; color:#fff; flex-shrink:0;">
                RD
              </div>
              <div>
                <h4 style="font-size:1.2rem;">Rajesh Damerla</h4>
                <p style="color:var(--cyan-accent); font-weight:600; font-size:0.85rem; margin-bottom:0.35rem;">Founder & Business Leader</p>
                <p style="color:var(--text-muted); font-size:0.9rem;">Global experience leading business strategies across multiple countries, now focused on driving AI adoption for enterprise growth.</p>
              </div>
            </div>

            <!-- Team Member 2 -->
            <div class="card" style="display:flex; gap:1.5rem; align-items:center;">
              <div style="width:80px; height:80px; border-radius:50%; background:linear-gradient(135deg, var(--emerald-accent), var(--cyan-accent)); display:flex; align-items:center; justify-content:center; font-size:1.8rem; font-weight:800; color:#fff; flex-shrink:0;">
                N
              </div>
              <div>
                <h4 style="font-size:1.2rem;">Neha</h4>
                <p style="color:var(--emerald-accent); font-weight:600; font-size:0.85rem; margin-bottom:0.35rem;">Lead AI Solutions Architect</p>
                <p style="color:var(--text-muted); font-size:0.9rem;">Engineers the custom AI tools, autonomous agents, and backend automation infrastructure behind the scenes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderContactPage() {
  return `
    <section style="padding: 5rem 0;">
      <div class="container" style="max-width:900px;">
        <div class="section-header">
          <div class="section-tag">Get in Touch</div>
          <h2>Start Your AI Journey Today</h2>
          <p>Have questions or ready to discuss how AI can transform your business? Drop us a message or book a call directly.</p>
        </div>

        <div class="hero-grid">
          <!-- Contact Form -->
          <div class="card" style="padding:2.5rem;">
            <h3 style="font-size:1.4rem; margin-bottom:1.5rem;">Send Us a Message</h3>
            <form onsubmit="handleGeneralContactSubmit(event)">
              <div class="form-group">
                <label for="contact-name">Full Name</label>
                <input type="text" id="contact-name" class="form-input" placeholder="Your Name" required>
              </div>
              <div class="form-group">
                <label for="contact-email">Business Email</label>
                <input type="email" id="contact-email" class="form-input" placeholder="name@company.com" required>
              </div>
              <div class="form-group">
                <label for="contact-company">Company Name</label>
                <input type="text" id="contact-company" class="form-input" placeholder="Company Ltd.">
              </div>
              <div class="form-group">
                <label for="contact-msg">Message</label>
                <textarea id="contact-msg" class="form-input" rows="3" placeholder="Tell us about your business goals..." required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-full">
                <i data-lucide="send"></i> Send Message
              </button>
            </form>
          </div>

          <!-- Direct Call Booking Box -->
          <div class="card" style="padding:2.5rem; display:flex; flex-direction:column; justify-content:space-between; border-color:var(--cyan-accent);">
            <div>
              <div class="card-icon" style="color:var(--cyan-accent);"><i data-lucide="calendar-check"></i></div>
              <h3 style="font-size:1.4rem; margin-bottom:1rem;">Prefer a Direct Call?</h3>
              <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem;">
                Schedule a 1-on-1 strategy call directly with Rajesh Damerla to explore how our AI services fit your specific goals.
              </p>
            </div>

            <div>
              <div style="background:rgba(255,255,255,0.03); border:1px solid var(--glass-border); padding:1rem; border-radius:var(--radius-md); margin-bottom:1.5rem;">
                <p style="font-size:0.85rem; color:var(--text-muted); margin:0;"><i data-lucide="mail" style="color:var(--cyan-accent); font-size:0.9rem;"></i> Direct Alert Email:</p>
                <p style="font-size:0.95rem; font-weight:600; color:#fff; margin:0;">contact@avinyaspark.com</p>
              </div>
              <button class="btn btn-cyan btn-full btn-lg" onclick="openBookingModal()">
                <i data-lucide="calendar"></i> Book Strategy Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ==========================================================================
   QUIZ LOGIC & COMPUTATIONS
   ========================================================================== */

function selectQuizOption(qId, points) {
  quizAnswers[qId] = points;
  renderAuditPage();
  const contentEl = document.getElementById('app-content');
  contentEl.innerHTML = renderAuditPage();
  if (window.lucide) lucide.createIcons();
}

function nextQuizStep() {
  currentQuizStep++;
  const contentEl = document.getElementById('app-content');
  contentEl.innerHTML = renderAuditPage();
  if (window.lucide) lucide.createIcons();
}

function prevQuizStep() {
  if (currentQuizStep > 0) {
    currentQuizStep--;
    const contentEl = document.getElementById('app-content');
    contentEl.innerHTML = renderAuditPage();
    if (window.lucide) lucide.createIcons();
  }
}

function resetQuiz() {
  currentQuizStep = 0;
  quizAnswers = {};
  renderPage('audit');
}

function calculateTotalScore() {
  let sum = 0;
  Object.values(quizAnswers).forEach(val => sum += val);
  return Math.min(sum, 100);
}

function calculatePillarScore(pillarId) {
  const config = window.quizConfig;
  const pillarQs = config.questions.filter(q => q.pillar === pillarId);
  if (pillarQs.length === 0) return 70;
  
  let earned = 0;
  let maxPossible = 0;
  pillarQs.forEach(q => {
    earned += (quizAnswers[q.id] || 0);
    const maxOpt = Math.max(...q.options.map(o => o.points));
    maxPossible += maxOpt;
  });

  return Math.round((earned / maxPossible) * 100);
}

function getTierForScore(score) {
  const tiers = window.quizConfig.tiers;
  for (let t of tiers) {
    if (score <= t.maxScore) return t;
  }
  return tiers[tiers.length - 1];
}

/* ==========================================================================
   LEAD CAPTURE & EMAIL SIMULATION
   ========================================================================== */

function handleAuditLeadSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('lead-name').value;
  const email = document.getElementById('lead-email').value;
  leadInfo.name = name;
  leadInfo.email = email;

  const score = calculateTotalScore();
  const tier = getTierForScore(score);

  // Send automatic background email to both recipients via Formsubmit.co
  sendBackgroundEmail({
    _subject: `New AI Audit Lead - ${name} scored ${score}/100 [${tier.label}]`,
    'Lead Name': name,
    'Lead Email': email,
    'AI Readiness Score': `${score} / 100`,
    'AI Readiness Tier': `${tier.label} (${tier.tag})`,
    'Industry': leadInfo.industry,
    'Company Size': leadInfo.companySize,
    'Tier Description': tier.desc,
    'Source': 'AI Audit Quiz'
  });

  showToast(`Audit complete! Results sent to the team.`);
  console.log('CRM Syncing...', { name, email, score, tier: tier.label, industry: leadInfo.industry, companySize: leadInfo.companySize });

  // Move to results screen
  currentQuizStep = window.quizConfig.questions.length + 3;
  const contentEl = document.getElementById('app-content');
  contentEl.innerHTML = renderAuditPage();
  if (window.lucide) lucide.createIcons();
}

function handleGeneralContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const company = document.getElementById('contact-company') ? document.getElementById('contact-company').value : '';
  const message = document.getElementById('contact-msg') ? document.getElementById('contact-msg').value : '';

  // Send automatic background email to both recipients
  sendBackgroundEmail({
    _subject: `New Contact Message from ${name} - Avinya Spark`,
    'Name': name,
    'Email': email,
    'Company': company || 'N/A',
    'Message': message,
    'Source': 'Contact Form'
  });

  showToast(`Message sent! We'll get back to you shortly.`);
  e.target.reset();
}

/* ==========================================================================
   BOOKING MODAL LOGIC
   ========================================================================== */

function openBookingModal() {
  document.getElementById('booking-modal').classList.add('open');
}

function closeBookingModal() {
  document.getElementById('booking-modal').classList.remove('open');
}

function selectTimeSlot(btn) {
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentSelectedTime = btn.innerText;
  const timeInput = document.getElementById('hidden-booking-time');
  if (timeInput) timeInput.value = currentSelectedTime;
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('book-name').value;
  const email = document.getElementById('book-email').value;
  const date = document.getElementById('booking-date').value;
  const notes = document.getElementById('book-notes') ? document.getElementById('book-notes').value : '';

  // Update hidden inputs
  const dateInput = document.getElementById('hidden-booking-date');
  if (dateInput) dateInput.value = date;

  // Send automatic background email to both recipients
  sendBackgroundEmail({
    _subject: `New Strategy Call Booking - ${name} on ${date} at ${currentSelectedTime}`,
    'Full Name': name,
    'Email': email,
    'Appointment Date': date,
    'Appointment Time': currentSelectedTime,
    'Notes': notes || 'N/A',
    'Source': 'Booking Modal'
  });

  closeBookingModal();
  showToast(`Strategy call booked! Confirmation sent to the team.`);
}

/* ==========================================================================
   BACKGROUND EMAIL SENDER (Formsubmit.co)
   Sends to both damerlarajesh@gmail.com and roshnori@gmail.com
   ========================================================================== */

function sendBackgroundEmail(data) {
  // Primary recipient: damerlarajesh@gmail.com
  const payload = {
    ...data,
    _cc: 'roshnori@gmail.com',
    _captcha: 'false',
    _template: 'table'
  };

  fetch('https://formsubmit.co/ajax/damerlarajesh@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Email sent successfully:', result);
  })
  .catch(error => {
    console.error('Email delivery error:', error);
  });
}

/* ==========================================================================
   PDF REPORT GENERATOR
   ========================================================================== */

function downloadPDFReport() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const score = calculateTotalScore();
  const tier = getTierForScore(score);

  // Header Design
  doc.setFillColor(9, 13, 22);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("AVINYA SPARK INTERNATIONAL", 15, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("AI Business Readiness Audit Report", 15, 30);
  doc.text("avinyaspark.com", 160, 30);

  // Recipient Details
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(`Prepared for: ${leadInfo.name || 'Valued Business Leader'}`, 15, 55);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Email: ${leadInfo.email || 'N/A'} | Industry: ${leadInfo.industry} | Size: ${leadInfo.companySize}`, 15, 62);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 15, 69);

  // Score Box
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(15, 80, 180, 45, 3, 3, 'F');
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Overall AI Readiness Score", 25, 95);
  
  doc.setFontSize(28);
  doc.setTextColor(99, 102, 241);
  doc.text(`${score} / 100`, 25, 112);

  doc.setFontSize(16);
  doc.setTextColor(6, 182, 212);
  doc.text(`Classification: ${tier.label}`, 110, 102);

  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(tier.desc, 110, 112, { maxWidth: 80 });

  // Recommendations Section
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.setFont("helvetica", "bold");
  doc.text("Top Actionable Recommendations", 15, 145);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("1. Automate Customer Lead Acquisition: Deploy 24/7 qualifying AI engines.", 15, 160);
  doc.text("2. Deploy AI CEO Assistant: Free up leadership bandwidth for executive growth.", 15, 172);
  doc.text("3. Integrated Data Analytics: Connect legacy databases to real-time dashboards.", 15, 184);

  // Footer Note
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text("To schedule a complimentary 1-on-1 strategy call with Rajesh Damerla, visit avinyaspark.com", 15, 270);

  doc.save(`Avinya_Spark_AI_Audit_${leadInfo.name || 'Report'}.pdf`);
  showToast("PDF Audit Report downloaded successfully!");
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i data-lucide="check-circle" style="color:var(--cyan-accent)"></i> <span>${message}</span>`;
  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  setTimeout(() => {
    toast.remove();
  }, 4500);
}
