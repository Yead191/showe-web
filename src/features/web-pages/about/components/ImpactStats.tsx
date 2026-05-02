import React from 'react'

export default function ImpactStats() {
  return (
    <section className="py-20 bg-[#014B52] text-white">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: "500+", label: "Events Hosted" },
            { value: "25k+", label: "Daily Scans" },
            { value: "10k+", label: "Active Artists" },
            { value: "98%", label: "Satisfaction" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold font-museo text-[#F5A800]">{stat.value}</div>
              <div className="text-white/60 text-sm font-medium uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
