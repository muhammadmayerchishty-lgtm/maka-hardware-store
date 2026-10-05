import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Calendar,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { Language } from '../data/catalog';

interface BookingProps {
  lang: Language;
  quoteList: string[];
  selectedTagsFromQuote: string[];
  onRemoveQuoteItem: (item: string) => void;
}

const ROLES = [
  'Homeowner',
  'Interior Designer',
  'Architect',
  'Contractor',
  'Builder',
];

const INTEREST_OPTIONS = [
  'Door Handles',
  'Locks',
  'Hinges',
  'Kitchen Accessories',
  'Laminates',
  'Other',
];

const SERVICE_TYPES = [
  'Showroom Visit',
  'Site Visit & Consultation',
  'Bulk Quote',
  'Online Order Support',
];

const TIME_SLOTS = ['11:00 AM', '2:00 PM', '5:00 PM', '7:00 PM'];

export const Booking: React.FC<BookingProps> = ({
  lang,
  quoteList,
  selectedTagsFromQuote,
  onRemoveQuoteItem,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+92 ');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Homeowner');
  const [interests, setInterests] = useState<string[]>(['Door Handles']);
  const [serviceType, setServiceType] = useState('Showroom Visit');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('5:00 PM');
  const [message, setMessage] = useState('');

  // Validation & states
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync Quote List tags into step 2 interests automatically
  useEffect(() => {
    if (selectedTagsFromQuote.length > 0) {
      setInterests((prev) => Array.from(new Set([...prev, ...selectedTagsFromQuote])));
    }
  }, [selectedTagsFromQuote]);

  const validatePakistanPhone = (raw: string) => {
    const cleaned = raw.replace(/[\s\-()]/g, '');
    return /^(\+92|0092|92|0)?3\d{9}$/.test(cleaned);
  };

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 1) {
      if (name.trim().length < 2) {
        setErrorMsg(
          lang === 'en'
            ? 'Please enter your full name.'
            : 'براہ کرم اپنا مکمل نام درج کریں۔'
        );
        return;
      }
      if (!validatePakistanPhone(phone)) {
        setErrorMsg(
          lang === 'en'
            ? 'Please enter a valid Pakistan mobile number (e.g. 0321 8860070 or +92 321 8860070).'
            : 'براہ کرم درست پاکستانی موبائل نمبر درج کریں (مثال: 03218860070)۔'
        );
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (interests.length === 0) {
        setErrorMsg(
          lang === 'en'
            ? 'Please select at least one hardware category of interest.'
            : 'کم از کم ایک ہارڈویئر کیٹیگری منتخب کریں۔'
        );
        return;
      }
      setStep(3);
    }
  };

  const toggleInterest = (tag: string) => {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((i) => i !== tag) : [...prev, tag]
    );
  };

  // Next 6 days quick-pick calendar helper
  const upcomingDates = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(Date.now() + (i + 1) * 86400000);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
    };
  });

  const buildWhatsAppUrl = () => {
    const lines = [
      `*MAKA (REX Hardware & Interior) — New Consultation / Quote Request*`,
      `• *Name:* ${name.trim()}`,
      `• *Phone:* ${phone.trim()}`,
      email.trim() ? `• *Email:* ${email.trim()}` : null,
      `• *Profile:* ${role}`,
      `• *Interests:* ${interests.join(', ')}`,
      quoteList.length > 0 ? `• *Quote List Items:* ${quoteList.join(' | ')}` : null,
      `• *Service Type:* ${serviceType}`,
      `• *Preferred Date & Time:* ${preferredDate} at ${timeSlot}`,
      message.trim() ? `• *Notes:* ${message.trim()}` : null,
    ].filter(Boolean);

    return `https://wa.me/923218860070?text=${encodeURIComponent(lines.join('\n'))}`;
  };

  const buildMailtoUrl = () => {
    const subject = `MAKA Quote / Showroom Booking — ${name.trim()} (${role})`;
    const body = [
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Email: ${email.trim() || 'N/A'}`,
      `Profile: ${role}`,
      `Categories: ${interests.join(', ')}`,
      `Quote List: ${quoteList.join(', ') || 'None selected'}`,
      `Service Type: ${serviceType}`,
      `Preferred Schedule: ${preferredDate} at ${timeSlot}`,
      `Notes: ${message.trim() || 'None'}`,
    ].join('\n');

    return `mailto:makapk92@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    // -------------------------------------------------------------------------
    // FUTURE BACKEND INTEGRATION HOOK (Formspree / Google Sheets / Firebase)
    // Uncomment and replace endpoint when connecting a persistent lead webhook:
    // await fetch('https://formspree.io/f/YOUR_MAKA_ENDPOINT', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name, phone, email, role, interests, quoteList, serviceType, preferredDate, timeSlot, message
    //   }),
    // });
    // -------------------------------------------------------------------------

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      // Launch celebratory brand-colored confetti (#F26A21, #C9A24B, #F3E2A9)
      try {
        confetti({
          particleCount: 70,
          spread: 65,
          origin: { y: 0.65 },
          colors: ['#F26A21', '#C9A24B', '#F3E2A9', '#E9DFCF'],
        });
      } catch {
        // Ignore if reduced motion blocks canvas confetti
      }
    }, 650);
  };

  return (
    <section
      id="booking"
      className="relative py-24 md:py-32 bg-[#0A0A0B] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Showroom Info & Interactive Dark Map Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs md:text-sm font-medium tracking-[0.22em] text-[#F26A21] mb-3">
                {lang === 'en' ? '04. SHOWROOM & CONSULTATION' : '04. شوروم وزٹ اور کوٹیشن'}
              </p>
              <h2
                className={`font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#E9DFCF] leading-[1.06] [text-wrap:balance] ${
                  lang === 'ur' ? 'font-urdu leading-[1.6]' : ''
                }`}
              >
                {lang === 'en' ? (
                  <>
                    Let’s Design{' '}
                    <span className="italic text-gold-gradient">Your Space.</span>
                  </>
                ) : (
                  'آئیے آپ کے گھر کو دلکش بنائیں۔'
                )}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#E9DFCF]/75 font-light leading-relaxed">
                {lang === 'en'
                  ? 'Whether you are fitting out a single main entrance door or specifying hardware for an entire residential project, visit our Garhi Shahu showroom or request a tailored WhatsApp quotation.'
                  : 'چاہے آپ کو اپنے مین ڈور کے لیے لاک اور ہینڈل چاہیے ہو یا مکمل گھر کے کچن اور الماریوں کی فٹنگز، ہمارے شوروم تشریف لائیں یا واٹس ایپ پر کوٹیشن حاصل کریں۔'}
              </p>
            </div>

            {/* Contact Details List */}
            <div className="space-y-4 p-6 rounded-2xl bg-[#111113] border border-white/10">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#F26A21] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono text-[#C9A24B]">SHOWROOM ADDRESS</p>
                  <p className="text-sm text-[#E9DFCF] mt-0.5">
                    16 Beadon Rd, Garhi Shahu, Lahore, 54000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-white/5">
                <Phone className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono text-[#C9A24B]">PHONE &amp; WHATSAPP</p>
                  <a
                    href="tel:+923218860070"
                    className="text-sm text-[#E9DFCF] hover:text-[#F26A21] transition-colors mt-0.5 block font-mono"
                  >
                    0321 8860070 (+92 321 8860070)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-white/5">
                <Mail className="w-5 h-5 text-[#C9A24B] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono text-[#C9A24B]">EMAIL</p>
                  <a
                    href="mailto:makapk92@gmail.com"
                    className="text-sm text-[#E9DFCF] hover:text-[#F26A21] transition-colors mt-0.5 block"
                  >
                    makapk92@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-white/5">
                <Clock className="w-5 h-5 text-[#F26A21] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-mono text-[#C9A24B]">SHOWROOM HOURS</p>
                  <p className="text-sm text-[#E9DFCF] mt-0.5">
                    Open daily · Closes at 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Dark-Styled Architectural Map Card for 16 Beadon Rd, Garhi Shahu */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=16+Beadon+Rd+Garhi+Shahu+Lahore+54000"
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative rounded-2xl overflow-hidden bg-[#111113] border border-white/10 hover:border-[#C9A24B]/60 p-6 transition-all"
            >
              <div className="absolute inset-0 bg-blueprint-grid opacity-60 pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(242,106,33,0.16),transparent_65%)] pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono tracking-widest text-[#F3E2A9]">
                    LAHORE SHOWROOM PIN · 31.5619° N, 74.3347° E
                  </span>
                  <h3 className="font-serif-display text-2xl text-[#E9DFCF] mt-1 group-hover:text-[#F3E2A9] transition-colors">
                    16 Beadon Rd, Garhi Shahu
                  </h3>
                  <p className="text-xs text-[#E9DFCF]/65 mt-1">
                    Tap to open turn-by-turn directions in Google Maps
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#F26A21]/15 border border-[#F26A21]/40 flex items-center justify-center text-[#F26A21] group-hover:bg-[#F26A21] group-hover:text-[#0A0A0B] transition-colors shrink-0">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: Multi-Step Glass Booking & Quote Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl bg-[#111113]/90 backdrop-blur-xl border border-[#F26A21]/30 shadow-[0_0_50px_rgba(242,106,33,0.12)] p-6 sm:p-10">
              {/* Top Progress Header */}
              {!submitted && (
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-mono text-[#E9DFCF]/70 mb-3">
                    <span>STEP 0{step} OF 03</span>
                    <span className="text-[#C9A24B]">
                      {step === 1
                        ? 'Contact Details'
                        : step === 2
                        ? 'Profile & Hardware Selection'
                        : 'Schedule & Dispatch'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#C9A24B] via-[#F3E2A9] to-[#F26A21]"
                      initial={{ width: '33.33%' }}
                      animate={{ width: `${(step / 3) * 100}%` }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              )}

              {/* Active Quote List Items Banner inside the Form */}
              {quoteList.length > 0 && !submitted && (
                <div className="mb-6 p-4 rounded-xl bg-[#0A0A0B] border border-[#C9A24B]/35">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#F3E2A9] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#F26A21]" />
                      SELECTED FOR PKR QUOTATION ({quoteList.length})
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quoteList.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-2 text-xs bg-white/[0.06] text-[#E9DFCF] px-3 py-1 rounded-lg border border-white/10"
                      >
                        <span className="truncate max-w-[220px]">{item}</span>
                        <button
                          type="button"
                          onClick={() => onRemoveQuoteItem(item)}
                          aria-label={`Remove ${item} from quote list`}
                          className="text-[#E9DFCF]/50 hover:text-[#F26A21] cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key={`step-${step}`}
                    initial={{ opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* STEP 1: Name, Pakistan Phone, Email */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <label
                            htmlFor="maka-name"
                            className="block text-xs font-medium text-[#E9DFCF]/80 mb-2"
                          >
                            {lang === 'en' ? 'Your Full Name *' : 'آپ کا مکمل نام *'}
                          </label>
                          <input
                            id="maka-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Ahmed Raza / Studio Arched"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0B] border border-white/15 focus:border-[#F26A21] focus:outline-none text-sm text-[#E9DFCF] placeholder:text-[#E9DFCF]/35 transition-colors"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="maka-phone"
                            className="block text-xs font-medium text-[#E9DFCF]/80 mb-2"
                          >
                            {lang === 'en'
                              ? 'WhatsApp / Mobile Number (Pakistan +92) *'
                              : 'واٹس ایپ یا موبائل نمبر (+92) *'}
                          </label>
                          <input
                            id="maka-phone"
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+92 321 8860070"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0B] border border-white/15 focus:border-[#F26A21] focus:outline-none text-sm font-mono text-[#E9DFCF] placeholder:text-[#E9DFCF]/35 transition-colors"
                          />
                          <p className="mt-1.5 text-[11px] text-[#E9DFCF]/50">
                            Used to send your itemized hardware quotation &amp; catalog photos via
                            WhatsApp.
                          </p>
                        </div>

                        <div>
                          <label
                            htmlFor="maka-email"
                            className="block text-xs font-medium text-[#E9DFCF]/80 mb-2"
                          >
                            {lang === 'en' ? 'Email Address (Optional)' : 'ای میل ایڈریس (اختیاری)'}
                          </label>
                          <input
                            id="maka-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="architect@firm.pk"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#0A0A0B] border border-white/15 focus:border-[#F26A21] focus:outline-none text-sm text-[#E9DFCF] placeholder:text-[#E9DFCF]/35 transition-colors"
                          />
                        </div>
                      </div>
                    )}

                    {/* STEP 2: Profile & Multi-Select Hardware Interests */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <label className="block text-xs font-medium text-[#E9DFCF]/80 mb-3">
                            {lang === 'en' ? 'I am a:' : 'آپ کی پروفائل:'}
                          </label>
                          <div className="flex flex-wrap gap-2.5">
                            {ROLES.map((r) => (
                              <button
                                key={r}
                                type="button"
                                onClick={() => setRole(r)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-medium border transition-all cursor-pointer whitespace-nowrap ${
                                  role === r
                                    ? 'bg-[#F26A21] text-[#0A0A0B] border-[#F26A21] font-semibold'
                                    : 'bg-[#0A0A0B] text-[#E9DFCF]/75 border-white/10 hover:border-white/30'
                                }`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-[#E9DFCF]/80 mb-3">
                            {lang === 'en'
                              ? 'Hardware Categories of Interest (Multi-select):'
                              : 'پسندیدہ ہارڈویئر کیٹیگریز منتخب کریں:'}
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                            {INTEREST_OPTIONS.map((tag) => {
                              const active = interests.includes(tag);
                              return (
                                <button
                                  key={tag}
                                  type="button"
                                  onClick={() => toggleInterest(tag)}
                                  className={`px-3.5 py-3 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all cursor-pointer ${
                                    active
                                      ? 'bg-[#C9A24B]/20 text-[#F3E2A9] border-[#C9A24B]'
                                      : 'bg-[#0A0A0B] text-[#E9DFCF]/70 border-white/10 hover:border-white/25'
                                  }`}
                                >
                                  <span className="truncate">{tag}</span>
                                  {active && <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A24B] shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: Service Type, Custom Date Picker, Time Slot, Message */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs font-medium text-[#E9DFCF]/80 mb-2.5">
                            {lang === 'en' ? 'How can MAKA assist you?' : 'سروس کی قسم منتخب کریں:'}
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {SERVICE_TYPES.map((st) => (
                              <button
                                key={st}
                                type="button"
                                onClick={() => setServiceType(st)}
                                className={`px-4 py-3 rounded-xl text-xs font-medium border text-left transition-all cursor-pointer ${
                                  serviceType === st
                                    ? 'bg-[#F26A21] text-[#0A0A0B] border-[#F26A21] font-semibold'
                                    : 'bg-[#0A0A0B] text-[#E9DFCF]/75 border-white/10 hover:border-white/25'
                                }`}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Custom Styled Date Picker Strip */}
                        <div>
                          <label className="block text-xs font-medium text-[#E9DFCF]/80 mb-2.5 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#C9A24B]" />
                            <span>Preferred Date (Showroom Open Daily Until 8 PM):</span>
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                            {upcomingDates.map((d) => {
                              const selected = preferredDate === d.iso;
                              return (
                                <button
                                  key={d.iso}
                                  type="button"
                                  onClick={() => setPreferredDate(d.iso)}
                                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                                    selected
                                      ? 'border-[#C9A24B] bg-[#C9A24B]/20 text-[#F3E2A9]'
                                      : 'border-white/10 bg-[#0A0A0B] text-[#E9DFCF]/70 hover:border-white/25'
                                  }`}
                                >
                                  <div className="text-[10px] uppercase opacity-70">{d.dayName}</div>
                                  <div className="text-base font-serif-display font-semibold tabular-nums">
                                    {d.dayNum}
                                  </div>
                                  <div className="text-[10px] opacity-70">{d.month}</div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Time Slot Selection */}
                        <div>
                          <label className="block text-xs font-medium text-[#E9DFCF]/80 mb-2">
                            Preferred Time Slot:
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {TIME_SLOTS.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setTimeSlot(slot)}
                                className={`py-2.5 px-3 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                                  timeSlot === slot
                                    ? 'bg-[#C9A24B] text-[#0A0A0B] border-[#C9A24B] font-semibold'
                                    : 'bg-[#0A0A0B] text-[#E9DFCF]/70 border-white/10 hover:border-white/25'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Project Notes */}
                        <div>
                          <label
                            htmlFor="maka-notes"
                            className="block text-xs font-medium text-[#E9DFCF]/80 mb-2"
                          >
                            Project Details or Door/Kitchen Quantities (Optional):
                          </label>
                          <textarea
                            id="maka-notes"
                            rows={3}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="e.g. Need 2 main entrance brass pulls, 14 bedroom mortise locks, and soft-close hinges for a 1-Kanal house in Lahore..."
                            className="w-full px-4 py-3 rounded-xl bg-[#0A0A0B] border border-white/15 focus:border-[#F26A21] focus:outline-none text-sm text-[#E9DFCF] placeholder:text-[#E9DFCF]/35 transition-colors"
                          />
                        </div>
                      </div>
                    )}

                    {/* Inline Validation Feedback */}
                    {errorMsg && (
                      <p
                        role="alert"
                        className="text-xs text-[#F26A21] bg-[#F26A21]/10 border border-[#F26A21]/30 px-4 py-2.5 rounded-xl"
                      >
                        {errorMsg}
                      </p>
                    )}

                    {/* Step Navigation Controls */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={() => setStep((step - 1) as 1 | 2)}
                          className="px-5 py-3 rounded-xl border border-white/15 hover:border-white/30 text-xs sm:text-sm text-[#E9DFCF] inline-flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span>Back</span>
                        </button>
                      ) : (
                        <span className="text-xs text-[#E9DFCF]/45">
                          Direct WhatsApp &amp; Showroom Dispatch
                        </span>
                      )}

                      {step < 3 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="px-7 py-3.5 rounded-xl bg-[#F26A21] hover:bg-[#e05d17] text-[#0A0A0B] font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                        >
                          <span>Continue</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={submitting}
                          className="px-7 py-3.5 rounded-xl bg-[#F26A21] hover:bg-[#e05d17] disabled:opacity-50 text-[#0A0A0B] font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_0_28px_rgba(242,106,33,0.45)] transition-all cursor-pointer"
                        >
                          <span>
                            {submitting
                              ? 'Preparing Request...'
                              : 'Confirm & Prepare WhatsApp Quote'}
                          </span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </motion.form>
                ) : (
                  /* Success Summary Screen with Direct WhatsApp & Email Dispatch Links */
                  <motion.div
                    key="booking-success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#F26A21]/15 border border-[#F26A21]/40 text-[#F26A21] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div>
                      <p className="text-xs font-mono tracking-widest text-[#C9A24B]">
                        CONSULTATION &amp; QUOTE SUMMARY READY
                      </p>
                      <h3 className="font-serif-display text-3xl sm:text-4xl text-[#E9DFCF] mt-1">
                        Thank You, {name}
                      </h3>
                      <p className="mt-2 text-sm text-[#E9DFCF]/70 max-w-lg mx-auto">
                        Your specification summary has been formatted. Click below to send it
                        directly to MAKA’s WhatsApp desk (+92 321 8860070) or via email for an
                        immediate PKR response.
                      </p>
                    </div>

                    {/* Booking Summary Box */}
                    <div className="text-left p-5 rounded-xl bg-[#0A0A0B] border border-white/10 text-xs space-y-2 text-[#E9DFCF]/80">
                      <div>
                        <span className="text-[#C9A24B]">Profile:</span> {role} · {phone}
                      </div>
                      <div>
                        <span className="text-[#C9A24B]">Service &amp; Slot:</span> {serviceType} on{' '}
                        {preferredDate} at {timeSlot}
                      </div>
                      <div>
                        <span className="text-[#C9A24B]">Selected Categories:</span>{' '}
                        {interests.join(', ')}
                      </div>
                      {quoteList.length > 0 && (
                        <div>
                          <span className="text-[#C9A24B]">Quote List Items:</span>{' '}
                          {quoteList.join(' | ')}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a
                        href={buildWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0A0A0B] font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send Summary on WhatsApp (0321 8860070)</span>
                      </a>

                      <a
                        href={buildMailtoUrl()}
                        className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/15 hover:border-[#C9A24B] text-[#E9DFCF] text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-[#C9A24B]" />
                        <span>Send via Email Fallback</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setStep(1);
                      }}
                      className="text-xs text-[#E9DFCF]/50 hover:text-[#E9DFCF] underline cursor-pointer"
                    >
                      Edit or start another consultation request
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick-Contact Row Under the Form */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-center">
                <a
                  href="tel:+923218860070"
                  className="py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-[#E9DFCF] flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Call Now</span>
                </a>
                <a
                  href="https://wa.me/923218860070?text=Hi%20MAKA%2C%20I'd%20like%20to%20know%20more%20about%20your%20hardware%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-[#E9DFCF] flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=16+Beadon+Rd+Garhi+Shahu+Lahore+54000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs text-[#E9DFCF] flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#F26A21]" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
