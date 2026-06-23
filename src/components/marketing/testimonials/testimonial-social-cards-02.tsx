import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { VerifiedTick } from "@/components/base/avatar/base-components";
import { StarIcon } from "@/components/foundations/rating-stars";

const reviews = [
    {
        id: "review-01",
        quote: "We've been using Untitled to kick start every new project and can't imagine working without it.",
        author: {
            name: "Sienna Hewitt",
            username: "@siennahewitt",
            imageUrl: "https://www.untitledui.com/images/avatars/sienna-hewitt?fm=webp&q=80",
        },
    },
    {
        id: "review-02",
        quote: "From concept to completion, Untitled helps us deliver outstanding designs faster than ever.",
        author: {
            name: "Kari Rasmussen",
            username: "@itskari",
            imageUrl: "https://www.untitledui.com/images/avatars/kari-rasmussen?fm=webp&q=80",
        },
    },
    {
        id: "review-03",
        quote: "Every project starts with Untitled which has 10x'd our output. It saves us time while keeping the quality top-notch.",
        author: {
            name: "Amélie Laurent",
            username: "@alaurent_",
            imageUrl: "https://www.untitledui.com/images/avatars/amelie-laurent?fm=webp&q=80",
        },
    },
    {
        id: "review-04",
        quote: "Untitled has quickly become our go-to resource for every design project. The results are consistently amazing.",
        author: {
            name: "Aliah Lane",
            username: "@aliah_ux",
            imageUrl: "https://www.untitledui.com/images/avatars/aliah-lane?fm=webp&q=80",
        },
    },
    {
        id: "review-05",
        quote: "Untitled offers exactly what we need to get started quickly. It's helped us cut down on design time significantly!",
        author: {
            name: "Eduard Franz",
            username: "@eduardfranz",
            imageUrl: "https://www.untitledui.com/images/avatars/eduard-franz?fm=webp&q=80",
        },
    },
    {
        id: "review-06",
        quote: "Untitled offers everything we need to get started on UI projects quickly. We go from zero to one, insanely fast.",
        author: {
            name: "Lily-Rose Chedjou",
            username: "@lilyrose",
            imageUrl: "https://www.untitledui.com/images/avatars/lily-rose-chedjou?fm=webp&q=80",
        },
    },
];

export const TestimonialSocialCards02 = () => {
    return (
        <div className="flex flex-col items-center gap-16 bg-primary py-16 lg:py-24">
            <div className="flex max-w-container flex-col items-center gap-4 px-4 text-center lg:gap-5 lg:px-8">
                <h1 className="text-display-sm font-semibold text-primary lg:text-display-md">Wall of love</h1>
                <p className="text-lg text-tertiary lg:text-xl">Hear first-hand from our incredible community of customers.</p>
            </div>
            <div className="grid max-w-container grid-cols-1 gap-5 px-4 lg:grid-cols-3 lg:gap-6 lg:px-8">
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
                            subtitle={review.author.username}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
