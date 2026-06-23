"use client";

import type { FC, ReactNode } from "react";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { isReactComponent } from "@/utils/is-react-component";

interface RoundButtonProps {
    icon?: FC<{ className?: string }>;
    onClick?: () => void;
    className?: string;
    children?: ReactNode;
}

export const RoundButton = ({ icon: Icon, onClick, className, children }: RoundButtonProps) => {
    return (
        <Button
            onClick={onClick}
            color="link-gray"
            className={cx(
                "group flex size-12 items-center justify-center rounded-full bg-primary ring-1 ring-secondary backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-secondary md:size-14",
                className,
            )}
        >
            {children ??
                (isReactComponent(Icon) ? (
                    <Icon className="size-5 text-fg-quaternary transition-inherit-all group-hover:text-fg-quaternary_hover md:size-6" />
                ) : null)}
        </Button>
    );
};
