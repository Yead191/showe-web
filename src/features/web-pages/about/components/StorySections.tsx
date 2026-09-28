import { QrCode } from "lucide-react";
export default function StorySections() {
  return (
    <section
      id="our-story"
      className="py-10 lg:py-16 relative overflow-hidden lg:scroll-mt-[60px]"
    >
      <div className="container ">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-accent-400/20 rounded-[60px] rotate-6 scale-95" />
              <div className="absolute inset-0 bg-primary-600 rounded-[60px] flex items-center justify-center overflow-hidden">
                <div className="p-12 text-white space-y-6">
                  <QrCode
                    size={80}
                    className="text-accent-400 opacity-20 absolute -top-4 -right-4"
                  />
                  <h5 className="text-3xl font-bold font-museo">
                    It all started with a simple question...
                  </h5>
                  <p className="text-white/70 italic leading-relaxed">
                    "Why are we still using paper programs in a digital world?"
                  </p>
                  <div className="pt-4 flex items-center gap-4">
                    <div className="h-1 w-12 bg-accent-400" />
                    <span className="text-sm font-bold tracking-widest uppercase">
                      The SHOWE Team
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-600 font-museo">
              Printed programmes haven't fundamentally changed for decades.
            </h2>
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                SHOWE started with the question of whether a programme could
                become something much more useful — something audiences could
                explore before, during and after an event, while giving
                organisations a way to understand what their audiences actually
                engage with.
              </p>
              <p className="font-semibold text-primary-600 pt-2 tracking-wide">
                People | Events | Better Together
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
