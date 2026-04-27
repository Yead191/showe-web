
export default function AboutShowe() {
  return (
    <section className="bg-[#F7F4EF] py-14 ">
      <div className=" px-4 2xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Meet SHOWE */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl lg:text-2xl font-bold text-[#1A1A1A]">Meet SHOWE</h2>
            <p className="text-[#4A4A4A] text-sm lg:text-base leading-relaxed">
              SHOWE is a digital platform that replaces traditional printed event
              programs with interactive, mobile-first experiences. Instead of using
              paper booklets, attendees can simply scan a QR code to access
              beautifully designed programs directly on their phone.
            </p>
          </div>

          {/* Powering Interactive Event Experiences */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl lg:text-2xl font-bold text-[#1A1A1A]">Powering Interactive Event Experiences</h2>
            <p className="text-[#4A4A4A] text-sm lg:text-base leading-relaxed">
              At an event, users scan a QR code to unlock a dynamic digital
              program. They can explore schedules, cast details, and multimedia
              content, all in a smooth, touch-friendly format. Organizers can also
              update content in real time, ensuring the program stays relevant
              throughout the event.
            </p>
          </div>

          {/* Why SHOWE */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl lg:text-2xl font-bold text-[#1A1A1A]">Why SHOWE</h2>
            <p className="text-[#4A4A4A] text-sm lg:text-base leading-relaxed">
              SHOWE goes beyond static content by turning programs into
              engaging experiences. It reduces printing costs, allows instant
              updates, and creates deeper audience interaction, while also
              providing organizers with valuable insights into user behavior.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
