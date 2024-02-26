import ByCreditCheckoutButton from "@/components/buy-credits-checkout"
import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { findUserBy } from "@/lib/actions/user.action"
import { cn } from "@/lib/utils"
import { auth } from "@clerk/nextjs"
import { ArrowRight, Check, HelpCircle, Minus } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

const STRIPE_PLANS = [
    {
        name: 'Free',
        slug: 'free',
        quota: 200,
        price: {
            amount: 0,
            currency: 'USD',
            priceIds: {
                test: 'price_',
                production: 'price_'
            }
        }
    },
    {
        name: 'Pro',
        slug: 'pro',
        quota: 500,
        price: {
            amount: 14.99,
            currency: 'USD',
            priceIds: {
                test: 'price_',
                production: 'price_'
            }
        }
    },
    {
        name: 'Premium',
        slug: 'premium',
        quota: 900,
        price: {
            amount: 40,
            currency: 'USD',
            priceIds: {
                test: 'price_',
                production: 'price_'
            }
        }
    },
]

const pricingItems = [
    {
        enabled: true,
        plan: "Free",
        tagline: "For small projects",
        quota: STRIPE_PLANS.find((plan) => plan.slug === 'free')?.quota ?? 0,
        features: [
            {
                text: '200 Free Credits',
                footnote: 'Free credits',
                negative: false
            },
            {
                text: "Basic Access",
                footnote: "Basic Access",
                negative: false
            },
            {
                text: "Priority Customer Support",
                footnote: "Unlimited Access",
                negative: true
            },
            {
                text: "Priority Updates",
                footnote: "Priority Updates",
                negative: true
            },
        ]
    },
    {
        enabled: true,
        plan: "Pro",
        tagline: "For growing businesses",
        quota: STRIPE_PLANS.find((plan) => plan.slug === 'pro')?.quota ?? 0,
        features: [
            {
                text: '500 Free Credits',
                footnote: 'Free credits',
                negative: false
            },
            {
                text: "Basic Access",
                footnote: "Basic Access",
                negative: false
            },
            {
                text: "Priority Customer Support",
                footnote: "Unlimited Access",
                negative: false
            },
            {
                text: "Priority Updates",
                footnote: "Priority Updates",
                negative: true
            },
        ]
    },
    {
        enabled: true,
        plan: "Premium",
        tagline: "For large businesses",
        quota: STRIPE_PLANS.find((plan) => plan.slug === 'premium')?.quota || 0,
        features: [
            {
                text: '1000 Free Credits',
                footnote: 'Free credits',
                negative: false
            },
            {
                text: "Basic Access",
                footnote: "Basic Access",
                negative: false
            },
            {
                text: "Priority Customer Support",
                footnote: "Unlimited Access",
                negative: false
            },
            {
                text: "Priority Updates",
                footnote: "Priority Updates",
                negative: false
            },
        ]
    }

]

const PricingPage = async () => {

    const { userId } = auth()

    if (!userId) redirect('/sign-in')

    const user = await findUserBy(userId)

    return (
        <MaxWidthWrapper className='mb-8 mt-24 text-center max-w-5xl'>
            <div className='mx-auto mb-10 sm:max-w-lg'>
                <h1 className='text-6xl font-bold sm:text-7xl'>
                    Pricing
                </h1>
                <p className='mt-5 text-gray-600 sm:text-lg'>
                    Whether you&apos;re just trying out our service
                    or need more, we&apos;ve got you covered.
                </p>
            </div>

            <article className='pt-12 grid grid-cols-1 gap-10 lg:grid-cols-3'>
                <TooltipProvider>
                    {pricingItems.filter(data => data.enabled).map(
                        ({ plan, tagline, quota, features }) => {
                            const price =
                                STRIPE_PLANS.find(
                                    (p) => p.slug === plan.toLowerCase()
                                )?.price.amount ?? 0

                            return (
                                <div
                                    key={plan}
                                    className={cn(
                                        'relative rounded-2xl bg-white shadow-lg',
                                        {
                                            'border-2 border-blue-600 shadow-blue-200':
                                                plan === 'Pro',
                                            'border border-gray-200':
                                                plan !== 'Pro',
                                        }
                                    )}>
                                    {plan === 'Pro' && (
                                        /*<div
                                            className='absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-slate-600 to-blue-400 px-3 py-2 text-sm font-medium text-white'>
                                            Upgrade now
                                        </div>*/
                                        <Button className={"absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full"} size={"lg"}>
                                            Most Popular
                                        </Button>
                                    )}

                                    <div className='p-5'>
                                        <h3 className='my-3 text-center font-display text-3xl font-bold'>
                                            {plan}
                                        </h3>
                                        <p className='text-gray-500'>
                                            {tagline}
                                        </p>
                                        {
                                            plan !== "Enterprise" && (
                                                <>
                                                    <p className='my-5 font-display text-6xl font-semibold'>
                                                        ${price}
                                                    </p>

                                                </>
                                            )
                                        }
                                    </div>

                                    <div
                                        className='flex h-20 items-center justify-center border-b border-t border-gray-200 bg-gray-50'>
                                        <div className='flex items-center space-x-1'>
                                            <p>
                                                {quota.toLocaleString()} credits
                                            </p>

                                            <Tooltip delayDuration={300}>
                                                <TooltipTrigger className='cursor-default ml-1.5'>
                                                    <HelpCircle className='h-4 w-4 text-zinc-500' />
                                                </TooltipTrigger>
                                                <TooltipContent className='w-80 p-2'>
                                                    Credits are used to process images and Chat PDF.
                                                    Images processing cost 5 credit per image transformation
                                                    Chat PDF processing cost 1 credits per PDF.
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>

                                    <ul className='my-10 space-y-5 px-8'>
                                        {features.map(
                                            ({ text, footnote, negative }) => (
                                                <li
                                                    key={text}
                                                    className='flex space-x-5'>
                                                    <div className='flex-shrink-0'>
                                                        {negative ? (
                                                            <Minus className='h-6 w-6 text-gray-300' />
                                                        ) : (
                                                            <Check className='h-6 w-6 text-blue-500' />
                                                        )}
                                                    </div>
                                                    {footnote ? (
                                                        <div className='flex items-center space-x-1'>
                                                            <p
                                                                className={cn(
                                                                    'text-start',
                                                                    'text-gray-600',
                                                                    {
                                                                        'text-gray-400':
                                                                            negative,
                                                                    }
                                                                )}>
                                                                {text}
                                                            </p>
                                                            <Tooltip
                                                                delayDuration={300}>
                                                                <TooltipTrigger className='cursor-default ml-1.5'>
                                                                    <HelpCircle className='h-4 w-4 text-zinc-500' />
                                                                </TooltipTrigger>
                                                                <TooltipContent className='w-80 p-2'>
                                                                    {footnote}
                                                                </TooltipContent>
                                                            </Tooltip>
                                                        </div>
                                                    ) : (
                                                        <p
                                                            className={cn(
                                                                'text-gray-600',
                                                                {
                                                                    'text-gray-400':
                                                                        negative,
                                                                }
                                                            )}>
                                                            {text}
                                                        </p>
                                                    )}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <div className='border-t border-gray-200' />
                                    <div className='p-5'>
                                        {plan === 'Free' ? (
                                            <Link
                                                href={
                                                    userId ? '/profile' : '/sign-in'
                                                }
                                                className={buttonVariants({
                                                    className: 'w-full',
                                                    variant: 'secondary',
                                                })}>
                                                {userId ? 'Free Consumable' : 'Sign up'}
                                                <ArrowRight className='h-5 w-5 ml-1.5' />
                                            </Link>
                                        ) : userId ? (
                                            <ByCreditCheckoutButton
                                                transaction={{
                                                    plan: plan,
                                                    amount: price,
                                                    credits: quota,
                                                    buyerId: user._id
                                                }}
                                            />

                                        ) : (
                                            <Link
                                                href='/sign-in'
                                                className={buttonVariants({
                                                    className: 'w-full',
                                                })}>
                                                {userId ? 'By Credit Now' : 'Sign up'}
                                                <ArrowRight className='h-5 w-5 ml-1.5' />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                    )}
                </TooltipProvider>
            </article>
        </MaxWidthWrapper>
    )
}

export default PricingPage