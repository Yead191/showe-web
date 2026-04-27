import { Feature } from '@/constants/landing/landing-features'
import React from 'react'


interface WhyChooseUsProps {
  title?: string
  subtitle?: string
  features?: Feature[]
}



export default function WhyChooseUs({
  title = 'Why Choose Our Platform',
  subtitle = 'A smarter way to present, manage, and experience event information in real time',
  features = [],
}: WhyChooseUsProps) {
  return (
    <section id="why-choose-us" className="bg-white py-12 pt-24 lg:py-16">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#E9EEF0] p-8 lg:p-12 rounded-xl flex flex-col justify-center items-center text-center gap-4 min-h-[280px]"
            >
              <h3 className="text-xl font-bold text-[#0F4C5C] leading-tight">
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