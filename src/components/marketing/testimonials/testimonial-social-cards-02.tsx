import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { VerifiedTick } from "@/components/base/avatar/base-components";
import { StarIcon } from "@/components/foundations/rating-stars";

const reviews = [
    {
        id: "review-01",
        quote: "I used to rebuild every listing from a PDF and still lose details. Now I pick up the developer's unit as-is and send it to the right group in minutes.",
        author: {
            name: "Layla Haddad",
            role: "Broker · Dubai Marina",
            imageUrl: "https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80",
        },
    },
    {
        id: "review-02",
        quote: "I only get units that actually match what I'm after — no more ten brokers spamming me the same irrelevant tower.",
        author: {
            name: "Omar Farouk",
            role: "Property investor",
            imageUrl: "https://www.untitledui.com/images/avatars/eduard-franz?fm=webp&q=80",
        },
    },
    {
        id: "review-03",
        quote: "Our brochures used to scatter across WhatsApp and come back distorted. On Asterio the listing stays exactly as we published it.",
        author: {
            name: "Nadia Rahman",
            role: "Sales Director, Ellington",
            imageUrl: "https://www.untitledui.com/images/avatars/amelie-laurent?fm=webp&q=80",
        },
    },
    {
        id: "review-04",
        quote: "The group routing and AI insights changed how I work — I know which investor to call and what to say before I pick up the phone.",
        author: {
            name: "Marco Bianchi",
            role: "Broker · Business Bay",
            imageUrl: "https://www.untitledui.com/images/avatars/marco-kelly?fm=webp&q=80",
        },
    },
    {
        id: "review-05",
        quote: "Everything lives in one place. I save the units I like and my broker actually follows up on the right ones.",
        author: {
            name: "Priya Nair",
            role: "Property investor",
            imageUrl: "https://www.untitledui.com/images/avatars/aliah-lane?fm=webp&q=80",
        },
    },
    {
        id: "review-06",
        quote: "Price, payment plan and permit stay locked, so a hundred brokers can post our project without a single number going wrong.",
        author: {
            name: "Sarah Lindholm",
            role: "Head of Sales, Binghatti",
            imageUrl: "https://www.untitledui.com/images/avatars/kari-rasmussen?fm=webp&q=80",
        },
    },
];

export const TestimonialSocialCards02 = () => {
    return (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
                {reviews.map((review) => (
                    <div key={review.id} className="flex flex-col items-start gap-8 rounded-xl bg-secondary p-6 lg:justify-between lg:p-8">
                        <div className="flex flex-col items-start gap-4">
                            <div aria-hidden="true" className="flex gap-1">
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                                <StarIcon />
                            </div>
                            <blockquote className="text-md font-medium text-primary">{review.quote}</blockquote>
                        </div>
                        <AvatarLabelGroup
                            border
                            size="lg"
                            src={review.author.imageUrl}
                            alt={review.author.name}
                            title={
                                <span className="relative flex items-center gap-1">
                                    {review.author.name}
                                    <VerifiedTick size="lg" />
                                </span>
                            }
                            subtitle={review.author.role}
                        />
                    </div>
                ))}
            </div>
    );
};
