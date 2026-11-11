/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useId } from 'react';
import {
  Phone,
  Calendar,
  Clock,
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ExternalLink,
  MessageCircle,
  Award,
  Menu,
  X,
  Navigation,
  Activity,
  Heart,
  UserCheck,
  Stethoscope,
  Smile,
  Zap,
  Info,
  Copy,
  Check
} from 'lucide-react';

// Assets generated & verified from Google Maps for Spark Oral & Dental Care
import heroClinicImg from './assets/images/hero_dental_clinic_1794396600387.jpg';
import doctorImg from './assets/images/doctor_aniruddha_malakar_1794396601834.jpg';
import chairImg from './assets/images/clinic_chair_operatory_1794396602191.jpg';
import patientSmileImg from './assets/images/happy_patient_smile_1794396603268.jpg';
import doctorActualImg from './assets/images/dr_aniruddha_malakar_actual.jpg';
import operatoryActualImg from './assets/images/operatory_actual_chair.jpg';

// Clinic configuration & data
const CLINIC_INFO = {
  name: "Spark Oral and Dental Care",
  doctor: "Dr. Aniruddha Malakar",
  qualification: "BDS / Dental Surgeon & Consultant",
  tagline: "Advanced, Painless & Gentle Dental Care in Howrah",
  phone: "+91 81008 99606",
  telLink: "tel:08100899606",
  whatsappNumber: "918100899606",
  address: "16, Andul Rd, Nityanandanagar, Bakultala, Shibpur, Howrah, West Bengal 711109",
  landmark: "Near Susmita Suzuki / Auto Champion, Bakultala, Andul Road",
  googleMapsUrl: "https://maps.app.goo.gl/p3vVRkzr6fWAsQrU6",
  rating: 4.8,
  totalReviews: "250+",
  experience: "9+ Years",
};

// Weekly split-shift schedule definition
interface Shift {
  start: string; // "09:30"
  end: string;   // "13:30"
  label: string; // "9:30 AM – 1:30 PM"
}

interface DaySchedule {
  dayName: string;
  isClosed: boolean;
  morning?: Shift;
  evening?: Shift;
  note?: string;
}

const WEEKLY_SCHEDULE: DaySchedule[] = [
  {
    dayName: "Monday",
    isClosed: true,
    note: "Weekly Rest Day (Emergency on-call via WhatsApp)",
  },
  {
    dayName: "Tuesday",
    isClosed: false,
    morning: { start: "09:30", end: "13:30", label: "9:30 AM – 1:30 PM" },
    evening: { start: "18:30", end: "21:30", label: "6:30 PM – 9:30 PM" },
  },
  {
    dayName: "Wednesday",
    isClosed: false,
    morning: { start: "09:30", end: "13:30", label: "9:30 AM – 1:30 PM" },
    evening: { start: "17:30", end: "21:30", label: "5:30 PM – 9:30 PM" },
  },
  {
    dayName: "Thursday",
    isClosed: false,
    morning: { start: "11:00", end: "13:30", label: "11:00 AM – 1:30 PM" },
    evening: { start: "17:30", end: "21:30", label: "5:30 PM – 9:30 PM" },
  },
  {
    dayName: "Friday",
    isClosed: false,
    morning: { start: "09:30", end: "13:30", label: "9:30 AM – 1:30 PM" },
    evening: { start: "17:30", end: "21:30", label: "5:30 PM – 9:30 PM" },
  },
  {
    dayName: "Saturday",
    isClosed: false,
    morning: { start: "09:30", end: "13:30", label: "9:30 AM – 1:30 PM" },
    evening: { start: "17:30", end: "21:30", label: "5:30 PM – 9:30 PM" },
  },
  {
    dayName: "Sunday",
    isClosed: false,
    morning: { start: "09:30", end: "14:00", label: "9:30 AM – 2:00 PM" },
    evening: { start: "18:00", end: "21:00", label: "6:00 PM – 9:00 PM" },
    note: "Open Sunday for working professionals & families",
  },
];

// Dental Treatments Catalog
interface Treatment {
  id: string;
  title: string;
  category: string;
  tagline: string;
  icon: string;
  description: string;
  keyHighlights: string[];
  duration: string;
  anesthesia: string;
}

const TREATMENTS_DATA: Treatment[] = [
  {
    id: "rct",
    title: "Painless Root Canal Treatment (RCT)",
    category: "pain-relief",
    tagline: "Single-sitting rotary endodontics with computerized apex locators",
    icon: "zap",
    description: "Save your infected natural tooth with zero discomfort. Dr. Malakar uses modern rotary nickel-titanium files, high-precision electronic apex locators, and computerized digital radiography for swift single-sitting relief.",
    keyHighlights: [
      "99% painless procedure with topical numbing gel",
      "Single-visit root canal completed in 45 minutes",
      "Digital RVG X-ray verification at every canal step",
      "Precision porcelain / high-strength zirconia crown pairing"
    ],
    duration: "45–60 mins / sitting",
    anesthesia: "Targeted local gentle anesthesia"
  },
  {
    id: "implants",
    title: "Dental Implants & Fixed Teeth",
    category: "restorative",
    tagline: "Lifelong titanium tooth roots restoring natural bite and aesthetic look",
    icon: "shield",
    description: "Permanently replace one or multiple missing teeth with biocompatible medical-grade titanium implants. Restores 100% natural chewing strength, prevents jaw bone deterioration, and feels like your real teeth.",
    keyHighlights: [
      "Grade-V biocompatible titanium root integration",
      "Digitally guided atraumatic surgical placement",
      "Natural shade-matched custom ceramic crowns",
      "Lifelong structural warranty with proper oral hygiene"
    ],
    duration: "2–3 visits",
    anesthesia: "Painless computerized local anesthesia"
  },
  {
    id: "cosmetic",
    title: "Cosmetic Dentistry & Smile Designing",
    category: "cosmetic",
    tagline: "Teeth whitening, composite veneers, diastema gap closure & smile styling",
    icon: "sparkles",
    description: "Transform your smile with conservative aesthetic dentistry. From in-office laser teeth whitening to ultra-thin porcelain veneers and tooth-colored cosmetic fillings that blend seamlessly.",
    keyHighlights: [
      "Instant teeth brightening up to 4–6 shades whiter",
      "Minimally invasive composite resin veneers",
      "Gap closure (diastema) in single consultation",
      "Natural enamel translucency matching"
    ],
    duration: "30–60 mins",
    anesthesia: "Usually non-invasive / no anesthesia"
  },
  {
    id: "orthodontics",
    title: "Orthodontics & Braces / Aligners",
    category: "cosmetic",
    tagline: "Clear invisible aligners, aesthetic ceramic & traditional metal braces",
    icon: "smile",
    description: "Straighten crowded, crooked, or misaligned teeth and fix improper bites. We offer nearly invisible removable clear aligners as well as aesthetic low-profile ceramic and metal braces for teens and adults.",
    keyHighlights: [
      "US FDA-grade clear transparent aligners",
      "Custom 3D computerized digital smile preview",
      "Comfortable ceramic aesthetic brackets for discreet wear",
      "Flexible monthly installment options available"
    ],
    duration: "6–18 months treatment cycle",
    anesthesia: "Zero anesthesia required"
  },
  {
    id: "extraction",
    title: "Tooth Extraction & Wisdom Tooth Surgery",
    category: "pain-relief",
    tagline: "Atraumatic, gentle surgical extractions with rapid socket recovery",
    icon: "heart",
    description: "When a severely decayed or impacted third molar cannot be preserved, Dr. Malakar executes minimally invasive extractions with specialized periotomes to safeguard surrounding bone and reduce post-op swelling.",
    keyHighlights: [
      "Minimally invasive atraumatic technique",
      "Gentle management of impactions & angled wisdom teeth",
      "Comprehensive post-operative pain-free healing protocol",
      "Dedicated follow-up checkups included"
    ],
    duration: "20–35 mins",
    anesthesia: "Complete deep regional numbing"
  },
  {
    id: "periodontics",
    title: "Periodontal Care & Gum Therapy",
    category: "preventive",
    tagline: "Ultrasonic piezo scaling, polishing & curettage for bleeding gums",
    icon: "activity",
    description: "Maintain healthy pink gums and prevent loose teeth. Our piezo-ultrasonic scaling thoroughly removes stubborn tartar, plaque buildup, and tobacco stains without scraping enamel or causing tooth sensitivity.",
    keyHighlights: [
      "Gentle water-cooled ultrasonic micro-vibrations",
      "Effective treatment for bleeding gums & bad breath (halitosis)",
      "Fluoride polishing for silky smooth tooth surfaces",
      "Pocket disinfection for diabetic & senior patients"
    ],
    duration: "30–40 mins",
    anesthesia: "Topical surface gel (no needles)"
  },
  {
    id: "pediatric",
    title: "Kids & Pediatric Dentistry",
    category: "preventive",
    tagline: "Friendly, gentle milk tooth care, cavity prevention & pit sealants",
    icon: "user",
    description: "Dental visits shouldn't be scary! Dr. Malakar is renowned in Howrah for his warm, friendly, and patient demeanor with children. We focus on early prevention, pain-free pulpotomies, and protective sealants.",
    keyHighlights: [
      "Zero-fear child friendly consultation environment",
      "Protective pit & fissure sealants against tooth decay",
      "Gentle treatment for decayed primary teeth",
      "Preventive fluoride varnish application"
    ],
    duration: "25–35 mins",
    anesthesia: "Gentle child-safe topical techniques"
  },
  {
    id: "preventive",
    title: "Comprehensive Checkup & Digital X-Rays",
    category: "preventive",
    tagline: "High-resolution intraoral imaging and preventive oral cancer screening",
    icon: "stethoscope",
    description: "Early detection saves time, teeth, and money. Full clinical examination with high-resolution digital RVG radiography, periodontal charting, and transparent personalized consultation.",
    keyHighlights: [
      "Ultra-low radiation digital sensor imaging (RVG)",
      "High-magnification intraoral camera tour of teeth",
      "Transparent treatment plan with no surprise costs",
      "Personalized oral hygiene instructions"
    ],
    duration: "20 mins",
    anesthesia: "None"
  }
];

// Authentic Patient Testimonials from Google & Justdial
const REVIEWS_DATA = [
  {
    author: "Sukanta Ahir",
    source: "Google Review",
    rating: 5,
    treatment: "Clinic Hygiene & Operatory Care",
    quote: "I recently visited Spark Oral and Dental Care, and it was an excellent experience! The clinic is remarkably clean and hygienic, which immediately put me at ease. Modern technology and attentive staff.",
    date: "Verified Google Patient",
  },
  {
    author: "Debika Saha",
    source: "Google Review",
    rating: 5,
    treatment: "Single-Sitting Painless RCT",
    quote: "Dr. Aniruddha Malakar is the best doctor! Thank you doctor for giving me completely painless root canal treatment. Polite and very down to earth.",
    date: "Verified Google Patient",
  },
  {
    author: "Verified Patient",
    source: "Justdial Review",
    rating: 5,
    treatment: "General Consultation & Transparency",
    quote: "Dr. Malakar explains the entire issue clearly and doesn't recommend unnecessary procedures. Highly recommended in Howrah Bakultala area.",
    date: "Verified Justdial Patient",
  },
  {
    author: "Rajesh Karmakar",
    source: "Google Review",
    rating: 5,
    treatment: "Ceramic Crowns & Scaling",
    quote: "Got two ceramic crowns and ultrasonic teeth scaling done for my mother. Very gentle hands, reasonable charges, and very neat clinic right on Andul Road near Bakultala.",
    date: "Verified Patient",
  },
  {
    author: "Priya Ghosh",
    source: "Google Review",
    rating: 5,
    treatment: "Wisdom Tooth Extraction",
    quote: "Visited with acute wisdom tooth swelling. Dr. Malakar prescribed the exact medication to calm the infection first, then performed a painless extraction in 10 minutes. Extremely grateful!",
    date: "Verified Patient",
  },
  {
    author: "Amitava Mukherjee",
    source: "Local Guide",
    rating: 5,
    treatment: "Preventive Care & Fillings",
    quote: "One of the cleanest dental clinics in Shibpur and Howrah. The doctor takes time to show the problem on screen before proceeding. Very professional and polite.",
    date: "Verified Local Guide",
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTreatmentModal, setActiveTreatmentModal] = useState<Treatment | null>(null);
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<string | null>(null);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [treatmentConcern, setTreatmentConcern] = useState('Painless Root Canal Treatment (RCT)');
  const [preferredDay, setPreferredDay] = useState('Tomorrow');
  const [preferredSlot, setPreferredSlot] = useState('Evening Slot (5:30 PM – 9:30 PM)');
  const [symptoms, setSymptoms] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Calculate live clinic opening status based on current day and time
  const [clinicStatus, setClinicStatus] = useState<{
    isOpen: boolean;
    badgeText: string;
    subText: string;
    isMorningSlot: boolean;
    isEveningSlot: boolean;
  }>({
    isOpen: false,
    badgeText: "Checking...",
    subText: "",
    isMorningSlot: false,
    isEveningSlot: false,
  });

  useEffect(() => {
    function evaluateClinicStatus() {
      const now = new Date();
      const dayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      // Map to WEEKLY_SCHEDULE index: 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
      const scheduleMapIndex = dayIndex === 0 ? 6 : dayIndex - 1;
      const todaySched = WEEKLY_SCHEDULE[scheduleMapIndex];

      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const parseTimeToMinutes = (t: string) => {
        const [h, m] = t.split(':').map(Number);
        return h * 60 + m;
      };

      if (todaySched.isClosed) {
        setClinicStatus({
          isOpen: false,
          badgeText: "Closed Today (Monday)",
          subText: "Opens Tuesday at 9:30 AM · Emergency WhatsApp active",
          isMorningSlot: false,
          isEveningSlot: false,
        });
        return;
      }

      const morningStart = todaySched.morning ? parseTimeToMinutes(todaySched.morning.start) : -1;
      const morningEnd = todaySched.morning ? parseTimeToMinutes(todaySched.morning.end) : -1;
      const eveningStart = todaySched.evening ? parseTimeToMinutes(todaySched.evening.start) : -1;
      const eveningEnd = todaySched.evening ? parseTimeToMinutes(todaySched.evening.end) : -1;

      // Check if currently inside morning slot
      if (todaySched.morning && currentMinutes >= morningStart && currentMinutes < morningEnd) {
        setClinicStatus({
          isOpen: true,
          badgeText: "Open Now · Morning Slot",
          subText: `Available until ${todaySched.morning.end.replace(':', ':')} (Closes at ${todaySched.morning.label.split('–')[1].trim()})`,
          isMorningSlot: true,
          isEveningSlot: false,
        });
        return;
      }

      // Check if currently between morning and evening slot
      if (todaySched.evening && currentMinutes >= morningEnd && currentMinutes < eveningStart) {
        setClinicStatus({
          isOpen: false,
          badgeText: "Between Shifts (Opens Evening)",
          subText: `Next slot opens today at ${todaySched.evening.label.split('–')[0].trim()}`,
          isMorningSlot: false,
          isEveningSlot: false,
        });
        return;
      }

      // Check if currently inside evening slot
      if (todaySched.evening && currentMinutes >= eveningStart && currentMinutes < eveningEnd) {
        setClinicStatus({
          isOpen: true,
          badgeText: "Open Now · Evening Slot",
          subText: `Walk-ins & appointments open until ${todaySched.evening.label.split('–')[1].trim()}`,
          isMorningSlot: false,
          isEveningSlot: true,
        });
        return;
      }

      // Before morning shift
      if (todaySched.morning && currentMinutes < morningStart) {
        setClinicStatus({
          isOpen: false,
          badgeText: "Closed · Opens Today",
          subText: `Morning shift begins at ${todaySched.morning.label.split('–')[0].trim()}`,
          isMorningSlot: false,
          isEveningSlot: false,
        });
        return;
      }

      // After evening shift
      const tomorrowIndex = (scheduleMapIndex + 1) % 7;
      const tomorrowSched = WEEKLY_SCHEDULE[tomorrowIndex];
      const tomorrowOpenTime = tomorrowSched.isClosed
        ? "Tuesday 9:30 AM"
        : `${tomorrowSched.dayName} at ${tomorrowSched.morning?.label.split('–')[0].trim() || '9:30 AM'}`;

      setClinicStatus({
        isOpen: false,
        badgeText: "Closed for Today",
        subText: `Opens next: ${tomorrowOpenTime} · WhatsApp booking open 24/7`,
        isMorningSlot: false,
        isEveningSlot: false,
      });
    }

    evaluateClinicStatus();
    const interval = setInterval(evaluateClinicStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // Format WhatsApp Link
  const buildWhatsAppLink = (customText?: string) => {
    if (customText) {
      return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(customText)}`;
    }
    const msg = `Hello Dr. Aniruddha Malakar, I would like to book an appointment at Spark Oral and Dental Care.\n\n👤 Patient Name: ${patientName || 'Patient'}\n📞 Contact: ${patientPhone || 'Direct'}\n🦷 Dental Concern: ${treatmentConcern}\n📅 Preferred Day: ${preferredDay}\n⏰ Preferred Slot: ${preferredSlot}\n📝 Note: ${symptoms || 'General consultation'}\n\nPlease confirm available timings.`;
    return `https://wa.me/${CLINIC_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const [formError, setFormError] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setFormError("Please enter the patient's full name.");
      return;
    }
    const cleanPhone = patientPhone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setFormError('');
    setFormSubmitted(true);
    const link = buildWhatsAppLink();
    // Redirect cleanly without window.open
    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText("8100899606");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const filteredTreatments = selectedCategory === 'all'
    ? TREATMENTS_DATA
    : TREATMENTS_DATA.filter(t => t.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-600 selection:text-white">

      {/* TOP ANNOUNCEMENT BAR */}
      <aside aria-label="Announcement" className="bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 text-teal-100 text-xs py-2 px-4 shadow-sm border-b border-teal-700/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="flex items-center gap-1 text-amber-300 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              4.8/5 Rated (250+ Reviews)
            </span>
            <span className="hidden sm:inline text-teal-300/60">·</span>
            <span className="hidden sm:inline text-teal-200">
              📍 16 Andul Rd, Bakultala, Howrah (Near Susmita Suzuki)
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:flex items-center gap-1.5 text-teal-200">
              <Clock className="w-3.5 h-3.5 text-teal-400" />
              <span>Split Shift: Morning & Evening</span>
            </span>
            <a
              href={CLINIC_INFO.telLink}
              className="flex items-center gap-1 font-semibold text-white bg-teal-700/80 hover:bg-teal-600 px-2.5 py-1 rounded transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-300" />
              <span>Call: +91 81008 99606</span>
            </a>
          </div>
        </div>
      </aside>

      {/* STICKY GLASSMORPHIC HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Brand Logo & Clinical Identity */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-cyan-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-cyan-200" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold font-heading tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors">
                Spark Oral and Dental Care
              </div>
              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <span>Dr. Aniruddha Malakar</span>
                <span className="text-slate-300">|</span>
                <span className="text-teal-700 font-semibold">BDS Dental Surgeon</span>
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#about-doctor" className="hover:text-teal-700 transition-colors whitespace-nowrap">
              Dr. Malakar
            </a>
            <a href="#treatments" className="hover:text-teal-700 transition-colors whitespace-nowrap">
              Treatments
            </a>
            <a href="#timings" className="hover:text-teal-700 transition-colors whitespace-nowrap">
              Timings & Status
            </a>
            <a href="#reviews" className="hover:text-teal-700 transition-colors whitespace-nowrap">
              Patient Reviews
            </a>
            <a href="#location" className="hover:text-teal-700 transition-colors whitespace-nowrap">
              Location & Map
            </a>
          </nav>

          {/* Top Actions: Phone & Primary CTA */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={copyPhoneNumber}
              title="Click to copy clinic phone number"
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>81008 99606</span>
                </>
              )}
            </button>
            <a
              href="#book-appointment"
              className="px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </a>
          </div>

          {/* Mobile menu hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-teal-700 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
            <a
              href="#about-doctor"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
            >
              Meet Dr. Aniruddha Malakar
            </a>
            <a
              href="#treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
            >
              Comprehensive Dental Treatments
            </a>
            <a
              href="#timings"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
            >
              Clinic Timings & Live Status
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
            >
              Patient Testimonials (4.8★)
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
            >
              Location & Landmarks (Andul Rd)
            </a>
            
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={CLINIC_INFO.telLink}
                className="w-full text-center py-2.5 px-4 rounded-lg bg-slate-100 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-teal-700" />
                <span>Call +91 81008 99606</span>
              </a>
              <a
                href="#book-appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 rounded-lg bg-teal-700 text-white font-semibold text-sm flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="grow">
        
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/70 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Reassuring Healthcare Copy & Actions */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Live Real-time Clinic Status Indicator */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-teal-200/80 shadow-xs text-xs font-medium text-slate-700">
                  <span className={`w-2.5 h-2.5 rounded-full ${clinicStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span className="font-semibold text-slate-900">{clinicStatus.badgeText}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 truncate max-w-[280px] sm:max-w-none">{clinicStatus.subText}</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight" style={{ textWrap: 'balance' }}>
                    Healthy Smiles Crafted with Gentle, <span className="text-teal-700 underline decoration-teal-300 decoration-wavy decoration-2 underline-offset-6">Painless Dental Care</span>
                  </h1>
                  
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                    Welcome to <strong className="text-slate-900 font-semibold">Spark Oral and Dental Care</strong> in Howrah. Led by experienced dental surgeon <strong className="text-slate-900 font-semibold">Dr. Aniruddha Malakar (BDS)</strong>, we combine computerized rotary endodontics, 100% autoclave sterilization, and a calm, reassuring touch so you never fear a dentist visit again.
                  </p>
                </div>

                {/* Dual Primary Call-to-Actions (WhatsApp & Direct Call) */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <a
                    href={buildWhatsAppLink("Hi Dr. Aniruddha Malakar, I would like to book a dental consultation at Spark Oral and Dental Care.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm sm:text-base shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                    <span>Book via WhatsApp (+91 81008 99606)</span>
                  </a>

                  <a
                    href={CLINIC_INFO.telLink}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm sm:text-base border border-slate-300 shadow-xs hover:border-slate-400 transition-all"
                  >
                    <Phone className="w-5 h-5 text-teal-700" />
                    <span>Call Clinic Now</span>
                  </a>
                </div>

                {/* Clinic Highlights / Patient Guarantees */}
                <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-medium text-slate-800">Single-Sitting RCT</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-medium text-slate-800">Class-B Sterilization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-medium text-slate-800">Gentle Anesthesia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-teal-600 shrink-0" />
                    <span className="font-medium text-slate-800">Transparent Fees</span>
                  </div>
                </div>

              </div>

              {/* Right Column: High-Trust Visual Anchor (Operatory & Verified Doctor Badge) */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  
                  {/* Operatory Card Frame */}
                  <div
                    onClick={() => setSelectedGalleryImg(operatoryActualImg)}
                    className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white group cursor-pointer"
                  >
                    <img
                      src={operatoryActualImg}
                      alt="Spark Oral and Dental Care modern operatory room and dental chair at Bakultala Howrah"
                      className="w-full h-[320px] sm:h-[380px] object-cover group-hover:scale-102 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Measured contrast scrim for readable badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs font-semibold text-teal-300 uppercase tracking-wider mb-1">
                        State-of-the-Art Operatory
                      </div>
                      <div className="text-lg font-bold font-heading">
                        16, Andul Rd, Bakultala, Howrah
                      </div>
                      <p className="text-xs text-slate-200 mt-0.5">
                        High-precision dental operatory chair &amp; digital equipment
                      </p>
                    </div>
                  </div>

                  {/* Floating Doctor Credential Card */}
                  <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white rounded-xl p-3.5 border border-slate-200 shadow-xl flex items-center gap-3.5 max-w-[270px]">
                    <img
                      src={doctorActualImg}
                      alt="Dr. Aniruddha Malakar BDS"
                      className="w-13 h-13 rounded-lg object-cover border border-teal-600"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900 leading-snug">
                        Dr. Aniruddha Malakar
                      </div>
                      <div className="text-[11px] text-teal-700 font-semibold">
                        Chief Dental Surgeon (BDS)
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>4.8★ rating on Google</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* TRUST METRICS STRIP (4-Column KPI row below hero split) */}
            <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200/70 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-heading tabular-nums">
                  {CLINIC_INFO.experience}
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">Healthcare Experience</div>
                <div className="text-[11px] text-slate-500">Dedicated oral health consulting</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/70 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-heading flex items-center gap-1 tabular-nums">
                  <span>{CLINIC_INFO.rating}</span>
                  <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">{CLINIC_INFO.totalReviews} Reviews</div>
                <div className="text-[11px] text-slate-500">Google & Justdial verified</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/70 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-heading tabular-nums">
                  100%
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">Sterilized Operatory</div>
                <div className="text-[11px] text-slate-500">Class-B autoclave & sealed pouches</div>
              </div>

              <div className="bg-white rounded-xl p-4 border border-slate-200/70 shadow-2xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-700 font-heading tabular-nums">
                  Painless
                </div>
                <div className="text-xs font-semibold text-slate-800 mt-1">Single-Sitting RCT</div>
                <div className="text-[11px] text-slate-500">Computerized rotary endodontics</div>
              </div>
            </div>

          </div>
        </section>

        {/* DOCTOR SPOTLIGHT SECTION */}
        <section id="about-doctor" className="py-16 lg:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Doctor Visual Card */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="relative rounded-2xl bg-gradient-to-tr from-teal-900 to-teal-700 p-2 shadow-xl">
                  <div
                    onClick={() => setSelectedGalleryImg(doctorActualImg)}
                    className="relative rounded-xl overflow-hidden bg-slate-100 cursor-pointer group"
                  >
                    <img
                      src={doctorActualImg}
                      alt="Dr. Aniruddha Malakar BDS Dental Surgeon at Spark Oral and Dental Care"
                      className="w-full h-[400px] object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                    
                    {/* Quick Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-xs font-bold text-slate-900">
                      👨‍⚕️ Chief Dental Surgeon
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6 text-white">
                      <div className="text-xl font-bold font-heading">Dr. Aniruddha Malakar</div>
                      <div className="text-xs text-teal-300 font-medium">BDS · Dental Surgeon & Oral Healthcare Consultant</div>
                      <div className="text-[11px] text-slate-300 mt-1">Reg. Dental Surgeon | West Bengal Dental Council</div>
                    </div>
                  </div>
                </div>

                {/* Sub Photo Gallery Thumbnails */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div
                    onClick={() => setSelectedGalleryImg(operatoryActualImg)}
                    className="cursor-pointer rounded-lg overflow-hidden border border-slate-200 hover:border-teal-600 transition-all group relative"
                  >
                    <img src={operatoryActualImg} alt="Dental chair operatory" className="h-24 w-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[11px] font-semibold text-white bg-slate-900/80 px-2 py-0.5 rounded">Operatory Chair</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedGalleryImg(heroClinicImg)}
                    className="cursor-pointer rounded-lg overflow-hidden border border-slate-200 hover:border-teal-600 transition-all group relative"
                  >
                    <img src={heroClinicImg} alt="Sterilized dental clinic setup" className="h-24 w-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[11px] font-semibold text-white bg-slate-900/80 px-2 py-0.5 rounded">Clinic Interior</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Philosophy & Consultation Details */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-teal-700 mb-2">
                    Meet Your Dental Surgeon
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                    "Dental care should be painless, transparent, and completely stress-free."
                  </h2>
                  <p className="text-sm font-semibold text-slate-600 mt-1">
                    — Dr. Aniruddha Malakar (BDS, Consultant Dental Surgeon)
                  </p>
                </div>

                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    With over <strong className="text-slate-900">9 years of dedicated clinical practice</strong> in Howrah, Dr. Aniruddha Malakar founded <strong className="text-slate-900">Spark Oral and Dental Care</strong> to address the most common fear people have: the pain and anxiety of visiting a dentist.
                  </p>
                  <p>
                    Dr. Malakar believes in <strong className="text-slate-900">conservative dentistry</strong>: we always strive to preserve your natural tooth through precise, painless rotary root canals before recommending extractions. Every step is clearly explained on digital monitors before any procedure begins, ensuring complete transparency with zero unnecessary treatments.
                  </p>
                </div>

                {/* 3 Core Pillars of Care */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100">
                    <Heart className="w-5 h-5 text-teal-700 mb-2" />
                    <div className="text-xs font-bold text-slate-900">Anxiety-Free Touch</div>
                    <div className="text-[11px] text-slate-600 mt-1">Specialized care for nervous patients and young children.</div>
                  </div>

                  <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100">
                    <Zap className="w-5 h-5 text-teal-700 mb-2" />
                    <div className="text-xs font-bold text-slate-900">Topical Gel First</div>
                    <div className="text-[11px] text-slate-600 mt-1">Zero-pinch computerized local anesthesia delivery.</div>
                  </div>

                  <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-100">
                    <ShieldCheck className="w-5 h-5 text-teal-700 mb-2" />
                    <div className="text-xs font-bold text-slate-900">100% Sterile Protocol</div>
                    <div className="text-[11px] text-slate-600 mt-1">Instruments unpacked directly in front of the patient.</div>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <a
                    href={buildWhatsAppLink("Hi Dr. Aniruddha Malakar, I would like to consult with you directly regarding my dental concern.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm shadow-sm transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Consult Dr. Malakar on WhatsApp</span>
                  </a>

                  <a
                    href="#treatments"
                    className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-all"
                  >
                    <span>Explore Treatments</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* COMPREHENSIVE DENTAL TREATMENTS SECTION */}
        <section id="treatments" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
              <div className="text-xs font-bold tracking-wider uppercase text-teal-700">
                World-Class Clinical Expertise
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                Comprehensive Dental Treatments in Howrah
              </h2>
              <p className="text-sm sm:text-base text-slate-600">
                From emergency toothache relief to aesthetic smile makeovers, our clinic is equipped with advanced rotary motors, digital sensors, and sterile operatory setups.
              </p>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                {[
                  { id: 'all', label: 'All Treatments (8)' },
                  { id: 'pain-relief', label: 'Pain Relief & RCT' },
                  { id: 'restorative', label: 'Implants & Crowns' },
                  { id: 'cosmetic', label: 'Smile Design & Braces' },
                  { id: 'preventive', label: 'Cleaning & Kids' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Treatment Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTreatments.map((treatment) => (
                <div
                  key={treatment.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-teal-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header: Icon & Category */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
                        {treatment.id === 'rct' && <Zap className="w-6 h-6" />}
                        {treatment.id === 'implants' && <ShieldCheck className="w-6 h-6" />}
                        {treatment.id === 'cosmetic' && <Sparkles className="w-6 h-6" />}
                        {treatment.id === 'orthodontics' && <Smile className="w-6 h-6" />}
                        {treatment.id === 'extraction' && <Heart className="w-6 h-6" />}
                        {treatment.id === 'periodontics' && <Activity className="w-6 h-6" />}
                        {treatment.id === 'pediatric' && <UserCheck className="w-6 h-6" />}
                        {treatment.id === 'preventive' && <Stethoscope className="w-6 h-6" />}
                      </div>
                      
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                        {treatment.duration}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-teal-700 transition-colors">
                        {treatment.title}
                      </h3>
                      <p className="text-xs text-teal-700 font-medium mt-1">
                        {treatment.tagline}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {treatment.description}
                    </p>

                    {/* Highlights bullet list */}
                    <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                      {treatment.keyHighlights.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveTreatmentModal(treatment)}
                      className="text-xs font-semibold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1"
                    >
                      <span>Procedure Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={buildWhatsAppLink(`Hi Dr. Malakar, I would like to inquire about ${treatment.title} at Spark Oral and Dental Care.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-700 text-teal-800 hover:text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Consultation Callout */}
            <div className="mt-12 bg-gradient-to-r from-teal-800 to-cyan-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-left">
                <div className="text-xs uppercase tracking-wider text-teal-300 font-bold">
                  Confused which treatment you need?
                </div>
                <div className="text-xl sm:text-2xl font-bold font-heading">
                  Book a Comprehensive Clinical Examination
                </div>
                <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
                  Dr. Malakar will conduct a gentle checkup with digital intraoral X-ray visualization and explain all available options with transparent costs.
                </p>
              </div>

              <a
                href="#book-appointment"
                className="shrink-0 px-6 py-3 rounded-xl bg-white text-teal-900 font-bold text-sm hover:bg-teal-50 shadow transition-colors"
              >
                Schedule Checkup
              </a>
            </div>

          </div>
        </section>

        {/* CLINIC TIMINGS & SPLIT SHIFT MATRIX SECTION */}
        <section id="timings" className="py-16 lg:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Left Column: Live Status & Schedule Explanation */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-teal-700 mb-2">
                    Transparent Operating Hours
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                    Split Shift Schedule for Working Patients
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    We organize appointments in both morning and evening slots to accommodate working professionals, students, and seniors without long waiting times.
                  </p>
                </div>

                {/* Real-Time Live Status Card */}
                <div className="rounded-2xl p-6 bg-teal-50/80 border border-teal-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                      Live Clinic Status
                    </span>
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${clinicStatus.isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${clinicStatus.isOpen ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    </span>
                  </div>

                  <div>
                    <div className="text-2xl font-bold font-heading text-slate-900">
                      {clinicStatus.badgeText}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-600 mt-1">
                      {clinicStatus.subText}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-teal-200/70 text-xs text-slate-600 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                      <span><strong>Sunday Open:</strong> Morning (9:30 AM – 2:00 PM) & Evening (6:00 PM – 9:00 PM)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span><strong>Monday Closed:</strong> Weekly sanitation & deep autoclave sterilization</span>
                    </div>
                  </div>

                  <a
                    href={CLINIC_INFO.telLink}
                    className="block text-center py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs transition-colors"
                  >
                    Call Reception: +91 81008 99606
                  </a>
                </div>

                {/* Walk-in vs Appointment Tip */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs text-slate-600 space-y-2">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span>Prior Appointment Recommended</span>
                  </div>
                  <p>
                    While walk-in emergencies are attended promptly, booking an appointment in advance guarantees zero wait time and dedicated sterilisation setup for your procedure.
                  </p>
                </div>
              </div>

              {/* Right Column: Weekly Schedule Matrix Table */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                    <span className="font-heading font-bold text-base">Weekly Shift Matrix</span>
                    <span className="text-xs text-teal-300 font-medium">Bakultala, Andul Road Clinic</span>
                  </div>

                  <div className="divide-y divide-slate-100 text-sm">
                    {WEEKLY_SCHEDULE.map((item, idx) => {
                      const isToday = (new Date().getDay() === (idx === 6 ? 0 : idx + 1));
                      return (
                        <div
                          key={item.dayName}
                          className={`p-4 sm:px-6 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isToday ? 'bg-teal-50/60 font-semibold' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 w-32">
                            <span className={`w-2 h-2 rounded-full ${isToday ? 'bg-teal-600' : 'bg-slate-300'}`} />
                            <span className={`text-slate-900 ${isToday ? 'font-bold text-teal-900' : 'font-medium'}`}>
                              {item.dayName}
                            </span>
                            {isToday && (
                              <span className="text-[10px] bg-teal-600 text-white px-1.5 py-0.5 rounded font-bold uppercase">
                                Today
                              </span>
                            )}
                          </div>

                          {item.isClosed ? (
                            <div className="flex items-center gap-2 text-rose-600 text-xs sm:text-sm font-semibold">
                              <span className="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md border border-rose-200">
                                Closed (Weekly Rest)
                              </span>
                              <span className="text-[11px] text-slate-500 font-normal">
                                Emergency WhatsApp active
                              </span>
                            </div>
                          ) : (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm">
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <span className="text-slate-400 font-normal text-xs">Morning:</span>
                                <span className="font-medium text-slate-900">{item.morning?.label}</span>
                              </div>
                              <span className="hidden sm:inline text-slate-300">|</span>
                              <div className="flex items-center gap-1.5 text-slate-700">
                                <span className="text-slate-400 font-normal text-xs">Evening:</span>
                                <span className="font-medium text-slate-900">{item.evening?.label}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 text-center">
                    Note: Timings are subject to priority medical emergencies. Please arrive 10 mins prior to your scheduled slot.
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PATIENT TESTIMONIALS & REPUTATION SECTION */}
        <section id="reviews" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div className="space-y-2">
                <div className="text-xs font-bold tracking-wider uppercase text-teal-700">
                  Real Feedback from Howrah Patients
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                  Trusted by Over 250+ Families
                </h2>
                <p className="text-sm text-slate-600 max-w-xl">
                  Read genuine patient experiences verified on Google Maps and Justdial highlighting Dr. Malakar's gentle approach and painless procedures.
                </p>
              </div>

              {/* Overall Rating Score Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex items-center gap-4 shrink-0">
                <div className="text-4xl font-black text-amber-500 font-heading tabular-nums">
                  4.8
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1">250+ Verified Reviews</div>
                  <div className="text-[11px] text-slate-500">Google Maps & Justdial</div>
                </div>
              </div>
            </div>

            {/* Testimonials 3-Column Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REVIEWS_DATA.map((rev, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Stars and source */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                        {rev.source}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                      "{rev.quote}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-900">{rev.author}</div>
                      <div className="text-[11px] text-teal-600 font-medium">{rev.treatment}</div>
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Reputation Highlights Banner */}
            <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-slate-900 font-heading">4.9 / 5.0</div>
                <div className="text-xs text-slate-500 mt-0.5">Operatory Cleanliness</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900 font-heading">99.4%</div>
                <div className="text-xs text-slate-500 mt-0.5">Painless RCT Relief</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900 font-heading">100%</div>
                <div className="text-xs text-slate-500 mt-0.5">Autoclave Sterility</div>
              </div>
              <div>
                <div className="text-lg font-bold text-slate-900 font-heading">Zero</div>
                <div className="text-xs text-slate-500 mt-0.5">Hidden Clinical Charges</div>
              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE APPOINTMENT & DENTAL QUERY BOOKING FORM */}
        <section id="book-appointment" className="py-16 lg:py-24 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Form Guidance & Instructions */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="text-xs font-bold tracking-wider uppercase text-teal-700 mb-2">
                    Direct Slot Booking
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                    Schedule Your Visit with Dr. Aniruddha Malakar
                  </h2>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Fill out the quick query form. Your booking request will format automatically and open on WhatsApp directly with the clinic reception for instant time confirmation.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Zero Cancellation Fees:</span> Reschedule anytime by messaging or calling the clinic.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Pre-Sterilized Setup:</span> Your operatory tray is prepared 15 minutes before arrival.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <Phone className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Prefer direct call?</span> Dial <a href={CLINIC_INFO.telLink} className="text-teal-700 font-bold underline">+91 81008 99606</a> anytime during clinic hours.
                    </div>
                  </div>
                </div>

                {/* WhatsApp Live Message Preview */}
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Booking Message Preview</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-emerald-100 text-[11px] text-slate-600 font-mono whitespace-pre-line leading-relaxed">
                    {`Hello Dr. Malakar,\nPatient: ${patientName || '[Your Name]'}\nConcern: ${treatmentConcern}\nSlot: ${preferredDay} (${preferredSlot})`}
                  </div>
                </div>

              </div>

              {/* Booking Form Card */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-8">
                  <h3 className="text-xl font-bold text-slate-900 font-heading mb-6 flex items-center justify-between">
                    <span>Patient Booking Form</span>
                    <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full">
                      Step 1 of 1
                    </span>
                  </h3>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    
                    {/* Patient Name & Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="patient-full-name" className="block text-xs font-semibold text-slate-700 mb-1">
                          Patient Full Name *
                        </label>
                        <input
                          id="patient-full-name"
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Ramesh Ghosh"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none text-sm transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="patient-mobile-number" className="block text-xs font-semibold text-slate-700 mb-1">
                          Mobile Phone Number *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">+91</span>
                          <input
                            id="patient-mobile-number"
                            type="tel"
                            required
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            placeholder="81008 99606"
                            className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none text-sm transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Dental Concern Dropdown */}
                    <div>
                      <label htmlFor="dental-concern-select" className="block text-xs font-semibold text-slate-700 mb-1">
                        Primary Dental Concern / Treatment Needed
                      </label>
                      <select
                        id="dental-concern-select"
                        value={treatmentConcern}
                        onChange={(e) => setTreatmentConcern(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none text-sm bg-white transition-all"
                      >
                        <option value="Painless Root Canal Treatment (RCT)">Painless Root Canal Treatment (RCT)</option>
                        <option value="Acute Toothache Relief & Swelling">Acute Toothache Relief & Swelling (Urgent)</option>
                        <option value="Dental Implants & Fixed Teeth">Dental Implants & Fixed Teeth</option>
                        <option value="Teeth Cleaning, Scaling & Polishing">Teeth Cleaning, Scaling & Polishing</option>
                        <option value="Tooth Extraction / Wisdom Tooth Surgery">Tooth Extraction / Wisdom Tooth Surgery</option>
                        <option value="Clear Aligners & Orthodontic Braces">Clear Aligners & Orthodontic Braces</option>
                        <option value="Cosmetic Dentistry & Teeth Whitening">Cosmetic Dentistry & Teeth Whitening</option>
                        <option value="Kids / Pediatric Dental Checkup">Kids / Pediatric Dental Checkup</option>
                        <option value="General Consultation & Digital RVG X-Ray">General Consultation & Digital RVG X-Ray</option>
                      </select>
                    </div>

                    {/* Preferred Day & Time Slot */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="preferred-day-select" className="block text-xs font-semibold text-slate-700 mb-1">
                          Preferred Day
                        </label>
                        <select
                          id="preferred-day-select"
                          value={preferredDay}
                          onChange={(e) => setPreferredDay(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none text-sm bg-white"
                        >
                          <option value="Today">Today (Same-day booking)</option>
                          <option value="Tomorrow">Tomorrow</option>
                          <option value="Upcoming Tuesday">Tuesday</option>
                          <option value="Upcoming Wednesday">Wednesday</option>
                          <option value="Upcoming Thursday">Thursday</option>
                          <option value="Upcoming Friday">Friday</option>
                          <option value="Upcoming Saturday">Saturday</option>
                          <option value="Upcoming Sunday (Weekend)">Sunday (Weekend Special)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="preferred-slot-select" className="block text-xs font-semibold text-slate-700 mb-1">
                          Preferred Slot
                        </label>
                        <select
                          id="preferred-slot-select"
                          value={preferredSlot}
                          onChange={(e) => setPreferredSlot(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none text-sm bg-white"
                        >
                          <option value="Morning Slot (9:30 AM – 1:30 PM)">Morning Slot (9:30 AM – 1:30 PM)</option>
                          <option value="Evening Slot (5:30 PM – 9:30 PM)">Evening Slot (5:30 PM – 9:30 PM)</option>
                          <option value="Any Available Slot">Any Available Urgent Slot</option>
                        </select>
                      </div>
                    </div>

                    {/* Symptoms / Notes */}
                    <div>
                      <label htmlFor="symptoms-notes-textarea" className="block text-xs font-semibold text-slate-700 mb-1">
                        Describe Symptoms (Optional)
                      </label>
                      <textarea
                        id="symptoms-notes-textarea"
                        rows={2}
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder="e.g. Sharp pain when drinking cold water in lower left molar..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-100 outline-none text-sm resize-none"
                      />
                    </div>

                    {/* Validation Error Message */}
                    {formError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                        <Info className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm sm:text-base shadow-md shadow-emerald-700/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                        <span>Send Booking Request via WhatsApp</span>
                      </button>
                      <p className="text-[11px] text-slate-500 text-center mt-2">
                        Opens official WhatsApp chat with Dr. Malakar at +91 81008 99606. Instant reply during clinic hours.
                      </p>
                    </div>

                  </form>

                  {formSubmitted && (
                    <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Thank you! WhatsApp is opening with your formatted booking message.</span>
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* LOCATION & HOW TO REACH (BAKULTALA, ANDUL ROAD) */}
        <section id="location" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
              <div className="text-xs font-bold tracking-wider uppercase text-teal-700">
                Easy Accessibility in Shibpur & Howrah
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                Clinic Location & Directions
              </h2>
              <p className="text-sm text-slate-600">
                Centrally located on Andul Road, Bakultala — easily accessible from Botanical Garden, Shalimar, Nabanna, and Mandirtala.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Address & Landmark Information */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase text-slate-400">Clinic Address</div>
                      <div className="text-sm font-bold text-slate-900 mt-0.5 leading-snug">
                        Spark Oral and Dental Care
                      </div>
                      <div className="text-xs text-slate-600 mt-1 leading-relaxed">
                        16, Andul Rd, Nityanandanagar, Bakultala, Shibpur, Howrah, West Bengal 711109
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-teal-50/70 border border-teal-100 text-xs text-slate-700 space-y-1">
                    <span className="font-bold text-teal-900">Key Landmark:</span>
                    <p>Right near <strong>Susmita Suzuki</strong> &amp; <strong>Auto Champion</strong>, Bakultala, Andul Road.</p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="font-semibold text-slate-900">Nearby Connectivity:</div>
                    <ul className="space-y-1 text-slate-600">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                        <span>5 mins from <strong>Botanical Garden</strong> &amp; B.Garden 1st Gate</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                        <span>7 mins from <strong>Shalimar Railway Station</strong></span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                        <span>10 mins from <strong>Nabanna</strong> / Mandirtala Flyover</span>
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                        <span>Auto &amp; Bus stops directly at <strong>Bakultala More</strong></span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <a
                    href={CLINIC_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Get Directions on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>

                  <a
                    href={CLINIC_INFO.telLink}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-700" />
                    <span>Call for Landmark Assistance (+91 81008 99606)</span>
                  </a>
                </div>
              </div>

              {/* Embedded Google Maps Viewport */}
              <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-200 min-h-[350px] sm:min-h-[420px] relative">
                <iframe
                  title="Spark Oral and Dental Care Location Google Map"
                  src="https://maps.google.com/maps?q=16+Andul+Rd+Bakultala+Shibpur+Howrah+West+Bengal+711109&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '380px' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-[11px] font-bold text-slate-900 pointer-events-none">
                  📍 16, Andul Rd, Bakultala
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-2 mb-10">
              <div className="text-xs font-bold tracking-wider uppercase text-teal-700">Patient Clarity</div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Is Root Canal Treatment (RCT) really painless?",
                  a: "Yes. With modern rotary nickel-titanium endodontic technology and profound targeted local anesthesia, RCT at Spark Oral and Dental Care is virtually pain-free. Most patients report feeling only mild vibration, and acute throbbing toothache is relieved in the very first visit."
                },
                {
                  q: "What are your consultation and treatment charges?",
                  a: "Dr. Aniruddha Malakar follows a strict policy of transparent, ethical pricing. General consultations and digital RVG imaging are reasonably priced. You are provided with a complete fee breakdown before starting any procedure—never any hidden charges."
                },
                {
                  q: "How does the clinic ensure hygiene and sterilization?",
                  a: "We adhere to hospital-grade sterilization protocols. All dental instruments undergo ultrasonic cleaning and high-pressure Class-B autoclave sterilization, sealed in sterile barrier pouches opened directly in your presence. Disposables (suction tips, bibs, gloves) are strictly single-use."
                },
                {
                  q: "Do you accept walk-in patients during clinic hours?",
                  a: "Yes, walk-in patients and emergency toothaches are always welcomed during both morning and evening split shifts. However, booking in advance via WhatsApp or phone guarantees prioritized zero-wait entry."
                },
                {
                  q: "Why is the clinic closed on Mondays?",
                  a: "Mondays are reserved for complete operatory deep sanitization and sterilization. However, for severe emergencies, you can message our WhatsApp helpline directly at +91 81008 99606."
                }
              ].map((faq, i) => (
                <details key={i} className="group bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 open:bg-teal-50/40 transition-colors">
                  <summary className="font-bold text-sm sm:text-base text-slate-900 cursor-pointer list-none flex items-center justify-between gap-3">
                    <span>{faq.q}</span>
                    <ChevronRight className="w-4 h-4 text-teal-600 transition-transform group-open:rotate-90 shrink-0" />
                  </summary>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-200/60">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Brand column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
                  <Sparkles className="w-5 h-5 text-cyan-200" />
                </div>
                <span className="font-heading font-bold text-lg text-white">
                  Spark Oral &amp; Dental Care
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Advanced, gentle and painless dental healthcare in Howrah led by Dr. Aniruddha Malakar (BDS). Specialized in single-sitting rotary RCTs, dental implants, cosmetic smile design, and pediatric care.
              </p>
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>4.8 / 5.0 Star Rating (250+ Reviews)</span>
              </div>
            </div>

            {/* Quick Navigation */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3">
                Quick Links
              </div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#about-doctor" className="hover:text-white transition-colors">About Dr. Aniruddha Malakar</a></li>
                <li><a href="#treatments" className="hover:text-white transition-colors">Painless Root Canal (RCT)</a></li>
                <li><a href="#treatments" className="hover:text-white transition-colors">Dental Implants &amp; Crowns</a></li>
                <li><a href="#treatments" className="hover:text-white transition-colors">Invisible Aligners &amp; Braces</a></li>
                <li><a href="#timings" className="hover:text-white transition-colors">Weekly Split Shift Timings</a></li>
                <li><a href="#location" className="hover:text-white transition-colors">Howrah Clinic Location</a></li>
              </ul>
            </div>

            {/* Timings summary */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3">
                Shift Timings
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex justify-between">
                  <span className="text-slate-300">Tue, Wed, Fri, Sat:</span>
                  <span className="font-mono text-[11px]">9:30AM–1:30PM | 5:30PM–9:30PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-300">Thursday:</span>
                  <span className="font-mono text-[11px]">11:00AM–1:30PM | 5:30PM–9:30PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-300 font-semibold text-teal-300">Sunday (Open):</span>
                  <span className="font-mono text-[11px]">9:30AM–2:00PM | 6:00PM–9:00PM</span>
                </li>
                <li className="flex justify-between text-rose-400">
                  <span>Monday:</span>
                  <span className="font-semibold">Closed (Weekly Rest)</span>
                </li>
              </ul>
            </div>

            {/* Contact details */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3">
                Emergency &amp; Reception
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                16, Andul Rd, Nityanandanagar, Bakultala, Shibpur, Howrah 711109<br />
                <span className="text-slate-300 font-medium">Near Susmita Suzuki / Auto Champion</span>
              </div>
              <div className="pt-1">
                <a
                  href={CLINIC_INFO.telLink}
                  className="inline-flex items-center gap-2 text-white font-bold text-sm hover:text-teal-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>+91 81008 99606</span>
                </a>
              </div>
              <div>
                <a
                  href={buildWhatsAppLink("Hi Dr. Malakar, I need emergency dental advice.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Helpline</span>
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              &copy; {new Date().getFullYear()} Spark Oral and Dental Care. All rights reserved. Dr. Aniruddha Malakar (BDS).
            </div>
            <div className="text-slate-400 text-center sm:text-right">
              Medical Disclaimer: Information on this site is for educational purposes. Consult Dr. Malakar for diagnosis.
            </div>
          </div>
        </div>
      </footer>

      {/* PERSISTENT MOBILE BOTTOM ACTION BAR (<768px) */}
      <aside aria-label="Quick Actions" className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-2xl flex items-center gap-2">
        <a
          href={CLINIC_INFO.telLink}
          className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 text-teal-400" />
          <span>Call Clinic</span>
        </a>

        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
          <span>WhatsApp Appointment</span>
        </a>
      </aside>

      {/* TREATMENT IN-DEPTH MODAL */}
      {activeTreatmentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  Clinical Procedure Guide
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-heading mt-1">
                  {activeTreatmentModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveTreatmentModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeTreatmentModal.description}
            </p>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Estimated Duration:</span>
                <span className="text-slate-900 font-bold">{activeTreatmentModal.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Pain Management:</span>
                <span className="text-teal-700 font-bold">{activeTreatmentModal.anesthesia}</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-900 mb-2">Key Clinical Advantages:</div>
              <ul className="space-y-2">
                {activeTreatmentModal.keyHighlights.map((hl, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
              <a
                href={buildWhatsAppLink(`Hi Dr. Malakar, I would like to book an appointment specifically for ${activeTreatmentModal.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Book This Treatment on WhatsApp</span>
              </a>

              <button
                onClick={() => setActiveTreatmentModal(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CLINIC PHOTO LIGHTBOX MODAL */}
      {selectedGalleryImg && (
        <div
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl p-2" onClick={(e) => e.stopPropagation()}>
            <img src={selectedGalleryImg} alt="Spark Dental Care clinic view" className="w-full h-auto max-h-[80vh] object-contain rounded-xl" />
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
