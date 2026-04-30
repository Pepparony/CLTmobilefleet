// app/home/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function FleetHomePage() {
  return (
    <div className="min-h-screen bg-[#edf2f4]" style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}>

      {/* ── Nav ── */}
      <nav className="fixed w-full bg-[#edf2f4]/95 backdrop-blur-sm z-50 px-6 md:px-24 py-4 flex items-center justify-between border-b border-black/5">
        <Image
          src="/CLTmobileLogoBg-White-removebg.png"
          alt="CLTmobile"
          width={130}
          height={36}
          className="object-contain"
        />
        <div className="flex items-center gap-4">
          <a href="tel:+17045869012" className="hidden md:block text-[#171818] text-sm font-medium hover:text-yellow-500 transition-colors">
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
      <section className="pt-44 pb-32 px-6 md:px-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 bg-yellow-300 bg-opacity-60 rounded-full px-5 py-2 mb-8">
          <span className="text-[#171818] text-sm font-medium">Premium Fleet Maintenance · Charlotte, NC</span>
        </div>

        <h1
          className="text-[52px] md:text-[82px] leading-[1.03] text-[#171818] mb-7 max-w-4xl"
          style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
        >
          White Glove <br />Comprehensive Fleet Maintenance
        </h1>

        <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
          No need to call or book, we inspect and service your vehicle on a regular scheduled basis. Ensure your team does not even have to think about their wiper fluid.
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
      </section>

      {/* ── Dark — the pitch ── */}
      <section className="bg-[#171818] py-28 px-6 md:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-yellow-300 text-xs uppercase tracking-[0.2em] font-semibold mb-5">The Experience</p>
          <h2
            className="text-[#edf2f4] text-[38px] md:text-[56px] leading-tight mb-8"
            style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          >
            Set it up once.{' '}
            <span className="text-yellow-400 italic">Never think about it again.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-16">
            No scheduling. No reminders. No chasing mechanics. We come to your vehicles on a regular scheduke — inspect everything, handle what's needed, and document every detail. White glove, start to finish.
          </p>

          <div className="grid md:grid-cols-3 gap-5 text-left">
            {[
              {
                icon: '📅',
                title: 'Regular visits on autopilot',
                desc: 'You set the schedule. Our technician shows up every month — no calls, no bookings, no reminders needed from your team.',
              },
              {
                icon: '🔧',
                title: 'Everything handled on the spot',
                desc: 'Oil change due? Done. Brakes getting low? Handled. Any service that\'s needed gets taken care of in the same visit. No additional charge.',
              },
              {
                icon: '📸',
                title: 'Full report, every time',
                desc: 'Before and after photos, inspection results, parts replaced — filed same day and waiting in your portal.',
              },
            ].map(item => (
              <div key={item.title} className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-[#edf2f4] font-bold text-base mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── App section ── */}
      <section className="py-28 px-6 md:px-24 bg-[#edf2f4]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-gray-400 text-xs uppercase tracking-[0.2em] mb-4">Built For You</p>
            <h2
              className="text-[#171818] text-[38px] md:text-[50px] leading-tight mb-6"
              style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
            >
              Your own fleet portal.{' '}
              <span className="text-yellow-400 italic">Our competitors can't say the same.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              Every fleet customer gets a private portal built specifically for them. Log in any time and see the full history of every vehicle — every visit, every photo, every service note. No phone calls. No PDFs in your inbox. Just a clean, organized dashboard that tells you exactly what's been done.
            </p>
            <div className="space-y-3">
              {[
                'Every vehicle in one place',
                'Full photo report per visit',
                'Inspection results — brakes, fluids, battery, tires',
                'Upcoming visits scheduled and visible',
                'Access for your whole team',
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

          {/* Fake portal preview card */}
          <div className="bg-[#171818] rounded-3xl p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-yellow-400 text-[10px] font-bold uppercase tracking-[0.15em] mb-0.5">CLTmobile</p>
                <p className="text-white font-bold text-base">Fleet Portal</p>
              </div>
              <div className="text-green-400 text-xs font-semibold bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
                ● Live
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { val: '6', label: 'Vehicles' },
                { val: '24', label: 'Services' },
                { val: 'May 12', label: 'Next Visit' },
              ].map(s => (
                <div key={s.label} className="bg-white/5 border border-white/8 rounded-xl p-3 text-center">
                  <p className="text-white font-bold text-xl">{s.val}</p>
                  <p className="text-gray-500 text-[10px] mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2.5">
              {[
                { name: 'Truck #1 — 2021 Ford Transit', status: 'completed', date: 'Apr 3' },
                { name: 'Truck #2 — 2020 Ram 1500', status: 'completed', date: 'Apr 3' },
                { name: 'Manager — 2022 Honda CR-V', status: 'scheduled', date: 'May 12' },
              ].map(v => (
                <div key={v.name} className="flex items-center justify-between bg-white/4 border border-white/6 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-white text-xs font-semibold">{v.name}</p>
                    <p className="text-gray-500 text-[10px] mt-0.5">{v.date}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    v.status === 'completed'
                      ? 'text-green-400 bg-green-500/10 border-green-500/20'
                      : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
                  }`}>
                    {v.status === 'completed' ? '✓ Done' : '● Upcoming'}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 text-[10px] mt-4">fleet.cltmobile.com · your private portal</p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[#171818] py-28 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-yellow-300/8 to-transparent pointer-events-none rounded-bl-full" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2
            className="text-[#edf2f4] text-[40px] md:text-[60px] leading-[1.05] mb-6"
            style={{ fontFamily: '"Instrument Serif", Georgia, serif' }}
          >
            One call.{' '}
            <span className="text-yellow-400 italic">We handle everything else.</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-10">
            Tell us how many vehicles you have. We'll set up your account, configure your schedule, and have your portal live within 24 hours.
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
            src="/823FA646-B658-4A93-9111-0218F6A397A0_1_201_a.jpeg"
            alt="CLTmobile"
            width={48}
            height={48}
            className="object-contain rounded-xl"
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