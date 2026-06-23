import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/plans";

export function Testimonials() {
  return (
    <section className="flex flex-col gap-xl">
      <h2 className="text-display-xs font-semibold text-primary">
        Trusted by brokers across the UAE
      </h2>
      <div className="grid gap-xl md:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="flex flex-col gap-xl rounded-2xl bg-primary p-3xl shadow-[inset_0_0_0_1px_#e9eaeb]"
          >
            <div className="flex gap-xs">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-[#fec84b] text-[#fec84b]" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="text-md text-secondary">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-auto flex items-center gap-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={testimonial.avatar}
                alt=""
                className="size-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-primary">{testimonial.name}</span>
                <span className="text-sm text-tertiary">{testimonial.role}</span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
