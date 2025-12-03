import Image from "next/image";

export default function TestimonialCard() {
  return (
    <div className="w-full">
      {/* Header */}
      <h2 className="text-lg font-medium mb-4">
        What our <span className="font-bold text-[#002325]">BRIGHTABS</span>{" "}
        Customers are saying
      </h2>

      {/* Testimonial Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[#E4E4E4] p-6">
        {/* Star Rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className="w-4 h-4 fill-yellow-400"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold mb-3">Great results!</h3>

        {/* Review Text */}
        <p className="text-[#364153] italic mb-6 leading-relaxed text-sm">
          &quot;I love these toothpaste tabs. They have actually hardened my
          teeth, something no other toothpaste has ever done for me. I love that
          they just arrive in my mailbox for me and I can compost the packaging.
          I can&apos;t say enough great things about them! They clean my teeth
          and mouth so well, and they&apos;re plastic free!&quot;
        </p>

        {/* Customer Info */}
        <div className="flex items-center gap-3">
          <Image
            src="/images/client.png"
            alt="Hania O."
            className="rounded-full object-cover"
            width={48}
            height={48}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#101828]">Hania O.</span>
              <svg className="w-4 h-4 fill-green-500" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm text-[#6A7282]">Verified Customer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
