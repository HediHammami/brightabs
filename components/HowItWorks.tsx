export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Detox & Reset",
      description:
        "BRIGHTABS begin by gently cleansing your mouth without harsh chemicals or synthetic foaming agents. Your oral microbiome starts to rebalance, reducing irritation and dryness from conventional toothpaste.",
    },
    {
      number: 2,
      title: "Strengthen Enamel",
      description:
        "Mineral-rich ingredients like hydroxyapatite help remineralize tooth enamel, reinforcing your teeth against daily wear, sensitivity, and acid erosion.",
    },
    {
      number: 3,
      title: "Soothe & Protect Gums",
      description:
        "Botanical extracts and natural anti-inflammatories calm irritated gums, support tissue repair, and help prevent bleeding or swelling. Your gums feel healthier and stronger.",
    },
    {
      number: 4,
      title: "Whiten Gently",
      description:
        "BRIGHTABS use gentle polishing agents (no bleach) to lift surface stains from coffee, tea, or wine — revealing a naturally brighter smile over time, without damaging enamel.",
    },
    {
      number: 5,
      title: "Long-Term Oral Health",
      description:
        "With consistent use, BRIGHTABS help maintain a balanced oral environment. You'll notice fresher breath, reduced plaque buildup, and a long-lasting clean — all while supporting your mouth's natural defense systems.",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left side - Video */}
          <div className="lg:sticky lg:top-12 w-full">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover aspect-4/3"
              >
                <source src="/videos/how-it-works.mp4" type="video/mp4" />
                {/* Fallback gradient for demo */}
              </video>
              {/* Fallback gradient overlay for demo purposes */}
              <div className="absolute inset-0 bg-linear-to-br from-pink-200 via-yellow-100 to-blue-200 -z-10"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="lg:pt-8">
            <h2 className="text-3xl font-semibold text-[#101828] mb-4">
              How it Works
            </h2>

            <p className="text-[#4A5565] mb-8 leading-relaxed">
              Our unique formula activates as you chew, delivering benefits for
              your teeth and gums—all naturally and effortlessly.
            </p>

            <h3 className="text-base font-medium text-[#364153] mb-6 tracking-wide">
              HERE&apos;S WHAT HAPPENS:
            </h3>

            {/* Steps */}
            <div className="relative">
              {/* Continuous vertical line behind all steps */}
              <div className="absolute left-5 top-10 bottom-10 w-0.5 bg-teal-600"></div>

              <div className="space-y-6">
                {steps.map((step) => (
                  <div key={step.number} className="flex gap-4 relative">
                    {/* Number Circle */}
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold relative z-10">
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-1">
                      <h4 className="text-lg font-semibold text-[#32999E] mb-2">
                        {step.title}
                      </h4>
                      <p className="text-[#4A5565] leading-relaxed text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
