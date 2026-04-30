// app/home/page.tsx  — public marketing homepage for fleet.cltmobile.com
// Route: update app/page.tsx to show this when not logged in

import Link from 'next/link';
import Image from 'next/image';

export default function FleetHomePage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Nav ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Image
            src="/CLTmobileLogoBg-White-removebg.png"
            alt="CLTmobile"
            width={140}
            height={38}
            className="object-contain"
          />
          <div className="flex items-center gap-4">
            <a href="tel:+17045869012" className="text-gray-600 text-sm font-medium hidden sm:block hover:text-gray-900 transition">
              (704) 586-9012
            </a>
            <Link
              href="/login"
              className="bg-yellow-500 hover:bg-[#171717] hover:text-yellow-500 text-[#171717] font-bold text-sm px-5 py-2.5 rounded-lg transition-all duration-300"
            >
              Fleet Login
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-[#171717] text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-500/15 border border-yellow-500/25 rounded-full px-4 py-1.5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">CLTmobile Fleet Services</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Monthly Fleet Maintenance.<br />
              <span className="text-yellow-400">We Come To You</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              One monthly visit per vehicle. Full inspection, any needed service included, photo-documented reports for every vehicle in your fleet — all managed through a dedicated portal.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:support@cltmobile.com"
                className="bg-yellow-500 hover:bg-yellow-400 text-[#171717] font-bold px-8 py-4 rounded-lg transition-all duration-300 text-sm"
              >
                Get a Fleet Quote
              </a>
              <a
                href="tel:+17045869012"
                className="border border-white/20 hover:border-white/40 text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 text-sm"
              >
                (704) 586-9012
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '1,000+', label: 'Repairs Completed' },
              { value: '4.87★', label: 'Average Rating' },
              { value: 'Monthly', label: 'Dedicated Visits' },
              { value: '100%', label: 'Photo Documented' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-yellow-400 text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-gray-900 text-3xl font-bold mb-3">How Fleet Service Works</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Simple, consistent, and completely hands-off for your team.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '🤝', title: 'We Set You Up', desc: 'CLTmobile creates your fleet account, adds all your vehicles, and configures your monthly schedule. You do nothing.' },
              { step: '02', icon: '📅', title: 'Monthly Visit', desc: 'Our technician comes to your location on a set schedule. Every vehicle gets a full inspection and any needed service.' },
              { step: '03', icon: '📸', title: 'Photo Reports', desc: 'After every visit, a detailed report with photos is filed for each vehicle — visible in your portal the same day.' },
              { step: '04', icon: '🖥️', title: 'Your Portal', desc: 'Log in anytime to view service history, inspection results, and upcoming visits for your entire fleet in one place.' },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl border border-gray-200 p-6 relative">
                <span className="absolute top-4 right-4 text-gray-100 text-4xl font-black">{item.step}</span>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-gray-900 text-3xl font-bold mb-4">
                Everything Included.<br />Every Month.
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                One flat monthly rate per vehicle covers your inspection and any service that's needed. No surprise invoices. No nickel-and-diming. Just consistent, professional maintenance handled for you.
              </p>
              <div className="space-y-3">
                {[
                  'Full vehicle inspection every visit',
                  'Oil change included when due',
                  'Fluid top-offs and checks',
                  'Brake, battery, and tire assessment',
                  'Any needed service at no additional labor cost',
                  'Photo-verified report filed same day',
                  'Dedicated fleet portal — view everything, any time',
                  'Priority scheduling — your vehicles come first',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-[#171717] text-xs font-black">✓</span>
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#171717] rounded-2xl p-6 text-white">
                <p className="text-yellow-400 text-xs font-bold uppercase tracking-wider mb-2">Your Fleet Portal</p>
                <p className="text-white font-bold text-lg mb-1">Everything in one place</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Log in anytime and see every vehicle, every visit, every photo report. Share access with your operations manager. No phone calls needed to find out what was done.
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <p className="text-yellow-800 text-xs font-bold uppercase tracking-wider mb-2">White Glove Setup</p>
                <p className="text-gray-900 font-bold text-lg mb-1">We handle everything</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You give us your vehicle list. We set up your account, schedule your visits, and keep your portal updated. Your team never has to think about it.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Accountability</p>
                <p className="text-gray-900 font-bold text-lg mb-1">Photo proof, every time</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Every service is photo-documented. You can see exactly what was done on every vehicle, on every visit — no guessing, no taking our word for it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why CLTmobile ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-gray-900 text-3xl font-bold mb-3">Why Fleets Choose CLTmobile</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              We built this service because fleet managers deserve better than chasing mechanics and reviewing vague invoices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🚐', title: 'We Come to You', desc: 'No dropping vehicles off, no coordinating rides, no lost productivity. We work around your schedule, at your location.' },
              { icon: '📋', title: 'Real Documentation', desc: 'Every vehicle gets a detailed service report with before/during/after photos. You always know exactly what was done.' },
              { icon: '🔧', title: 'Certified Technicians', desc: 'ASE-certified mechanics who do this full time. Not a side hustle — a professional team dedicated to quality work.' },
              { icon: '💰', title: 'Predictable Cost', desc: 'One monthly rate. No surprise labor charges, no haggling. Budget your fleet maintenance with confidence.' },
              { icon: '⚡', title: 'Priority Service', desc: 'Fleet accounts get priority scheduling. When something urgent comes up mid-month, you\'re first in line.' },
              { icon: '🛡️', title: '12-Month Warranty', desc: 'Every repair is covered for 12 months or 10,000 miles. We stand behind our work — always.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-200 p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-gray-900 font-bold text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#171717] py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl font-bold mb-4">
            Ready to take fleet maintenance off your plate?
          </h2>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Tell us how many vehicles you have and we'll put together a fleet plan. Setup takes one call.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:support@cltmobile.com"
              className="bg-yellow-500 hover:bg-yellow-400 text-[#171717] font-bold px-10 py-4 rounded-lg transition-all duration-300 text-sm"
            >
              Email Us to Get Started
            </a>
            <a
              href="tel:+17045869012"
              className="border border-white/20 hover:border-white/40 text-white font-bold px-10 py-4 rounded-lg transition-all duration-300 text-sm"
            >
              Call (704) 586-9012
            </a>
          </div>
          <p className="text-gray-600 text-xs mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-500 hover:text-yellow-400 font-semibold transition">
              Sign in to your fleet portal →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Image
            src="/CLTmobileLogoBg-White-removebg.png"
            alt="CLTmobile"
            width={120}
            height={32}
            className="object-contain"
          />
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            <a href="tel:+17045869012" className="hover:text-gray-600 transition">(704) 586-9012</a>
            <a href="mailto:support@cltmobile.com" className="hover:text-gray-600 transition">support@cltmobile.com</a>
            <a href="https://www.cltmobile.com" className="hover:text-gray-600 transition">cltmobile.com</a>
          </div>
          <p className="text-gray-400 text-xs">© 2025 CLTmobile LLC</p>
        </div>
      </footer>

    </div>
  );
}