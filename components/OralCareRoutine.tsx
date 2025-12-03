import Image from "next/image";

export default function OralCareRoutine() {
  const problems = [
    "YELLOW TEETH",
    "BAD BREATH",
    "IRRITATED GUMS",
    "PLASTIC TUBES",
    "PLAQUE BUILDUP",
    "WEAK ENAMEL",
  ];

  const features = [
    {
      icon: "/images/icons/ni.png",
      title: "NATURAL INGREDIENTS",
      description: "No harsh chemicals, just clean ingredients that work.",
    },
    {
      icon: "/images/icons/ntw.png",
      title: "NATURAL TEETH WHITENER",
      description:
        "No bleach, no harsh chemicals, just powerful plant-based whitening.",
    },
    {
      icon: "/images/icons/srt.png",
      title: "STRENGTHENS & PROTECTS TEETH",
      description: "Our BRIGHTABS protect and fortify with every brush.",
    },
    {
      icon: "/images/icons/tr.png",
      title: "TISSUE REPAIR",
      description:
        "Our BRIGHTABS promote natural tissue repair for healthier gums.",
    },
  ];

  return (
    <div className="min-h-screen py-6 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h2 className="w-full md:max-w-[600px] mx-auto text-2xl md:text-3xl font-bold bg-linear-to-r from-[#0D2628] via-[#32999E] to-[#0D2628] bg-clip-text text-transparent mb-2 md:mb-4">
            Simplify Your Oral Care Routine Without Compromising On Results.
          </h2>
        </div>

        {/* Say Goodbye To Section */}
        <div className="mb-6 md:mb-16">
          <h4 className="text-center text-sm font-bold text-gray-900 mb-8">
            SAY GOODBYE TO:
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
            {problems.map((problem, index) => (
              <div key={index} className="relative">
                {/* X Circle */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
                  <Image
                    src="/images/icons/cross.png"
                    alt="cross"
                    className="object-cover"
                    width={32}
                    height={32}
                  />
                </div>

                {/* Card */}
                <div className="border-2 border-[#32999E] rounded-xl p-6 pt-8 bg-white text-center">
                  <p className="text-xs font-semibold text-black">{problem}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teal Section */}
        <div className="bg-[#32999E] rounded-3xl p-12 shadow-xl">
          <h3 className="text-2xl md:text-3xl font-semibold text-white text-center mb-16">
            Tanit Is Changing The Way You Brush Your Teeth
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                 <Image
                 src={feature.icon}
                 alt={feature.title}
                 className="object-cover"
                 width={90}
                 height={90}
                 />
                </div>

                {/* Title */}
                <h4 className="text-lg font-semibold text-white mb-3 tracking-wide">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-white leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
