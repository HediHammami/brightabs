import Image from "next/image";

export default function ConsumerStudyResults() {
  return (
    <div className="mx-auto flex max-w-7xl py-6 px-4 md:py-8 md:px-12">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        {/* Left Side - Study Results */}
        <div className="shadow-md rounded-md p-4 md:p-12">
          <h2 className="text-center text-2xl md:text-left md:text-3xl font-bold mb-8 bg-linear-to-r from-[#0D2628] via-[#32999E] to-[#0D2628] bg-clip-text text-transparent">
            ConsumerStudy Results
          </h2>

          <div className="space-y-6">
            {/* Result 1 */}
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-full border-6 border-teal-600 flex items-center justify-center">
                  <span className="text-lg font-bold text-teal-600">95%</span>
                </div>
              </div>
              <div className="flex-1 pt-2">
                <p className="text-[#364153] text-sm md:text-base leading-relaxed">
                  95% of participants reported a significant{" "}
                  <span className="font-bold">
                    improvement in the strength of their teeth and enamel
                  </span>{" "}
                  after consistent use, noticing visible results and a
                  healthier, more resilient smile.
                </p>
              </div>
            </div>

            {/* Result 2 */}
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-full border-6 border-teal-600 flex items-center justify-center">
                  <span className="text-lg font-bold text-teal-600">89%</span>
                </div>
              </div>
              <div className="flex-1 pt-2">
                <p className="text-[#364153] text-sm md:text-base leading-relaxed">
                  89% of users noticed a{" "}
                  <span className="font-bold">
                    natural whitening of their teeth within the first two weeks
                  </span>
                  , along with a visible reduction in surface stains, resulting
                  in a cleaner, brighter smile.
                </p>
              </div>
            </div>

            {/* Result 3 */}
            <div className="flex items-center gap-4">
              <div className="shrink-0">
                <div className="w-18 h-18 md:w-20 md:h-20 rounded-full border-6 border-teal-600 flex items-center justify-center">
                  <span className="text-lg font-bold text-teal-600">95%</span>
                </div>
              </div>
              <div className="flex-1 pt-2">
                <p className="text-[#364153] text-sm md:text-base leading-relaxed">
                  95% of users experienced{" "}
                  <span className="font-bold">
                    long-lasting freshness and a noticeable reduction in bad
                    breath
                  </span>
                  , all without the use of artificial flavors or harsh
                  additives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Before/After Image */}
        <div className="relative">
          <Image
            src="/images/before-vs-after.png"
            alt="Visibly Brightens Teeth In 30 Days - Before and After Results"
            className="w-full h-full object-contain rounded-lg"
            width={440}
            height={440}
          />
        </div>
      </div>
    </div>
  );
}
