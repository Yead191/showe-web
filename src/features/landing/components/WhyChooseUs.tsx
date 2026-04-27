import React from 'react'

const FEATURES_DATA = [
  {
    title: 'From Print to Digital Experience',
    description:
      'We transform traditional printed event programs into interactive digital experiences that are easier to access, update, and share in real time.',
  },
  {
    title: 'Always Up-to-Date Content',
    description:
      'Unlike static brochures, your event program can be updated instantly, ensuring attendees always see the latest agenda, speakers, and sessions.',
  },
  {
    title: 'Seamless Mobile Experience',
    description:
      'Fully responsive layouts ensure smooth access on mobile, tablet, and desktop, so users can explore the event anytime, anywhere.',
  },
  {
    title: 'Better Audience Engagement',
    description:
      'Interactive elements like speaker profiles, clickable sessions, and live updates increase participation and overall event engagement.',
  },
  {
    title: 'Sustainable & Cost-Efficient',
    description:
      'Eliminate printing costs and reduce environmental impact by switching to a fully digital, reusable event program system.',
  },
  {
    title: 'Smart Navigation & Structure',
    description:
      'Clear layout and intuitive navigation help users quickly discover schedules, speakers, and sessions without confusion or delay.',
  },
]

export default function WhyChooseUs() {
  return (
    <section id='why-choose-us' className="bg-white py-12 pt-24 lg:py-16 ">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">
            Why Choose Our Platform
          </h2>
          <p className="section-subtitle ">
            A smarter way to present, manage, and experience event information
            in real time
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES_DATA.map((feature, index) => (
            <div
              key={index}
              className="bg-[#E9EEF0] p-8 lg:p-12 rounded-xl flex flex-col justify-center items-center text-center gap-4 min-h-[280px]"
            >
              <h3 className="text-xl lg:text-xl font-bold text-[#0F4C5C] leading-tight">
                {feature.title}
              </h3>
              <p className="text-[#676767] text-sm lg:text-[16px] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
