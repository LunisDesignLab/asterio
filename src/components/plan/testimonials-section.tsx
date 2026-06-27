import { TestimonialAbstractImage } from "@/components/marketing/testimonials/testimonial-abstract-image";
import { TestimonialSocialCards02 } from "@/components/marketing/testimonials/testimonial-social-cards-02";

/**
 * One white, full-width testimonials section: "Wall of love" heading on top,
 * then the abstract-image testimonial, then the social cards grid.
 */
export function TestimonialsSection() {
  return (
    <section className="bg-primary">
      <div className="mx-auto flex max-w-container flex-col gap-4xl px-4 pt-7xl pb-7xl md:px-8">
        <div className="flex flex-col items-center gap-sm text-center">
          <h2 className="text-display-sm font-semibold text-primary lg:text-display-md">
            Wall of love
          </h2>
          <p className="text-lg text-tertiary lg:text-xl">
            Hear first-hand from our incredible community of customers.
          </p>
        </div>

        <TestimonialAbstractImage />
        {/* +32px on top of the section gap, between the carousel and the cards grid */}
        <div className="mt-8">
          <TestimonialSocialCards02 />
        </div>
      </div>
    </section>
  );
}
