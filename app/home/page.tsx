// app/home/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function FleetHomePage() {
  return (
    <div className="min-h-screen bg-[#edf2f4]" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      {/* ── Nav ── */}
      <nav className="fixed w-full bg-[#edf2f4] z-50 px-6 md:px-24 py-4 flex items-center justify-between border-b border-black/5">
        <Image
          src="/CLTmobileLogoBg-White-removebg.png"
          alt="CLTmobile"
          width={130}
          height={36}
          className="object-contain"
        />
        <div className="flex items-center gap-4">
          <a
            href="tel:+17045869012"
            className="hidden md:block text-[#171818] text-sm font-medium hover:text-yellow-500 transition-colors"
          >
            704-586-9012
          </a>
          <Link
            href="/login"
            className="text-sm font-semibold text-[#171717] bg-yellow-300 hover:bg-yellow-400 px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            Fleet Login
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-40 pb-28 px-6 md:px-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-yellow-300 bg-opacity-60 rounded-full px-5 py-2 mb-8">
          <span className="text-[#171818] text-sm font-medium">Premium Fleet Maintenance · Charlotte, NC</span>
        </div>

        <h1
          className="text-[52px] md:text-[80px] leading-[1.05] text-[#171818] mb-6 max-w-4xl"
          style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
        >
          Fleet Maintenance,{' '}
          <span className="text-yellow-400 italic">Done Right.</span>
        </h1>

        <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
          One monthly visit per vehicle. Full inspection, any needed service included, photo-documented reports for your entire fleet — we come to you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:support@cltmobile.com"
            className="bg-[#171717] hover:bg-yellow-400 hover:text-[#171717] text-[#edf2f4] font-bold px-10 py-4 rounded-2xl transition-all duration-300 text-base"
          >
            Get a Fleet Quote
          </a>
          <a
            href="tel:+17045869012"
            className="border border-gray-300 hover:border-yellow-400 text-gray-600 hover:text-[#171717] font-semibold px-10 py-4 rounded-2xl transition-all duration-300 text-base"
          >
            (704) 586-9012
          </a>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 text-sm text-gray-400">
          {['1,000+ Repairs Completed', '4.87★ Average Rating', 'Photo-Verified Every Visit', '12-Month Warranty'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Dark divider section — what it is ── */}
      <section className="bg-[#171818] py-24 px-6 md:px-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-yellow-300 text-xs uppercase tracking-[0.2em] font-semibold mb-4">How It Works</p>
            <h2
              className="text-[#edf2f4] text-[40px] md:text-[52px] leading-tight mb-6"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
              We handle everything.{' '}
              <span className="text-yellow-400 italic">Every month.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              CLTmobile sets up your fleet account, schedules your visits, and keeps every report documented in your private portal. Your team never has to think about vehicle maintenance again.
            </p>
          </div>
          <div className="space-y-4">
            {[
              { step: '01', title: 'We Set You Up', desc: 'We create your fleet account, add all your vehicles, and schedule your monthly visits. You do nothing.' },
              { step: '02', title: 'We Come to You', desc: 'Our technician arrives on schedule. Full inspection, oil change when due, any needed service — all included.' },
              { step: '03', title: 'You See Everything', desc: 'Same-day photo report filed per vehicle. Log into your portal anytime to see exactly what was done.' },
            ].map(item => (
              <div key={item.step} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 flex gap-5 items-start">
                <span className="text-yellow-400/40 text-3xl font-black leading-none flex-shrink-0">{item.step}</span>
                <div>
                  <p className="text-[#edf2f4] font-bold text-base mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="py-24 px-6 md:px-24 bg-[#edf2f4]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-3">The Service</p>
            <h2
              className="text-[#171818] text-[40px] md:text-[52px] leading-tight"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
              Everything Included.{' '}
              <span className="text-yellow-400 italic">No Surprises.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '🔍', title: 'Full Inspection', desc: 'Brakes, fluids, battery, tires, engine — every vehicle gets a complete look every visit.' },
              { icon: '🔧', title: 'Service Included', desc: 'Oil changes, fluid top-offs, and any needed service at no additional labor cost. One flat rate.' },
              { icon: '📸', title: 'Photo Reports', desc: 'Before and after photos of every service, filed in your portal the same day it happens.' },
              { icon: '🖥️', title: 'Fleet Portal', desc: 'Your own private dashboard. View every vehicle, every report, every visit — any time.' },
              { icon: '⚡', title: 'Priority Scheduling', desc: 'Fleet accounts move to the front of the line. When something urgent comes up, we respond first.' },
              { icon: '🛡️', title: '12-Month Warranty', desc: 'Every repair covered for 12 months or 10,000 miles. We stand behind every job, every time.' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm shadow-black/[0.04] hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-[#171818] font-bold text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why CLTmobile ── */}
      <section className="py-24 px-6 md:px-24 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">Why Fleet Managers Choose Us</p>
            <h2
              className="text-[#171818] text-[40px] md:text-[48px] leading-tight"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
              You've got enough to{' '}
              <span className="text-yellow-400 italic">manage.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Fleet maintenance shouldn't be a phone tag exercise with mechanics who give you vague invoices. We built this service to be completely hands-off for your team — with full transparency on everything we do.
            </p>
            <div className="space-y-3">
              {[
                'No dropping vehicles off or arranging rides',
                'No chasing mechanics for status updates',
                'No surprise invoices or unexplained charges',
                'No guessing what was actually done on each vehicle',
                'No missed maintenance — we keep the schedule',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-yellow-300 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#171717] text-xs font-black">✓</span>
                  </div>
                  <span className="text-gray-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-[#171818] rounded-2xl p-7">
              <p className="text-yellow-300 text-xs uppercase tracking-widest font-semibold mb-3">Your Portal</p>
              <p className="text-[#edf2f4] font-bold text-xl mb-2">Every vehicle. Every visit. Every photo.</p>
              <p className="text-gray-400 text-sm leading-relaxed">Log in anytime and see your full fleet's service history — no phone calls needed to find out what was done and when.</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-7">
              <p className="text-yellow-700 text-xs uppercase tracking-widest font-semibold mb-3">White Glove Setup</p>
              <p className="text-[#171818] font-bold text-xl mb-2">One call. We handle the rest.</p>
              <p className="text-gray-500 text-sm leading-relaxed">Tell us your vehicles. We build your account, configure your schedule, and your portal is live within 24 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[#171818] py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-yellow-300/8 to-transparent pointer-events-none rounded-bl-full" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2
            className="text-[#edf2f4] text-[44px] md:text-[64px] leading-[1.05] mb-6"
            style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          >
            Ready to take fleet maintenance{' '}
            <span className="text-yellow-400 italic">off your plate?</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Tell us how many vehicles you have. We'll put together a fleet plan and have you set up within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:support@cltmobile.com"
              className="bg-yellow-300 hover:bg-yellow-400 text-[#171717] font-bold px-10 py-4 rounded-2xl transition-all duration-200 text-base"
            >
              Email Us to Get Started
            </a>
            <a
              href="tel:+17045869012"
              className="border border-gray-700 hover:border-yellow-300 text-gray-400 hover:text-yellow-300 font-semibold px-10 py-4 rounded-2xl transition-all duration-200 text-base"
            >
              Call (704) 586-9012
            </a>
          </div>
          <p className="text-gray-600 text-xs mt-10">
            Already a fleet customer?{' '}
            <Link href="/login" className="text-yellow-500 hover:text-yellow-400 font-semibold transition">
              Sign in to your portal →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#171818] border-t border-white/[0.06] py-10 px-6 md:px-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Image
            src="/CLTmobileLogoBg-White-removebg.png"
            alt="CLTmobile"
            width={110}
            height={30}
            className="object-contain opacity-60"
          />
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <a href="tel:+17045869012" className="hover:text-gray-400 transition">(704) 586-9012</a>
            <a href="mailto:support@cltmobile.com" className="hover:text-gray-400 transition">support@cltmobile.com</a>
            <a href="https://www.cltmobile.com" className="hover:text-gray-400 transition">cltmobile.com</a>
          </div>
          <p className="text-gray-700 text-xs">© 2025 CLTmobile LLC</p>
        </div>
      </footer>

    </div>
  );
}