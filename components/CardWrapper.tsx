import React from 'react';
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import CardHeaders from "@/components/CardHeaders";
import Social from "@/components/Social";
import BackButton from "@/components/BackButton";

type CardWrapperProps = {
    children: React.ReactNode;
    headerLabel: string;
    subHeaderLabel?: string;
    showBackButton: boolean;
    backButtonLabel?: string;
    backButtonHref?: string;
    showSocialMedia: boolean;
    cardWidth: string;
}

const CardWrapper = (
    {
        children,
        headerLabel,
        subHeaderLabel,
        showBackButton,
        backButtonLabel,
        backButtonHref,
        showSocialMedia,
        cardWidth
    }: CardWrapperProps
) => {
    return (
        <Card className={cn("w-full p-0 lg:p-5 m-2", cardWidth)}>
            <CardHeader>
                <CardHeaders label={headerLabel} subHeaderLabel={subHeaderLabel} />
            </CardHeader>
            <CardContent>{children}</CardContent>
            {showSocialMedia && (
                <CardFooter className="flex flex-col">
                    <div className="flex gap-2 w-full py-3 justify-center items-center">
                        <div className="w-full h-0.5 bg-gray-400 rounded-md"/>
                        <p>or</p>
                        <div className="w-full h-0.5 bg-gray-400 rounded-md"/>
                    </div>
                    <Social />
                </CardFooter>
            )}
            {
                showBackButton && (
            <CardFooter>
                <BackButton label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
                )
            }
        </Card>
    );
};

export default CardWrapper;