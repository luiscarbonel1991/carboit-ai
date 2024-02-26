import { createTransaction } from '@/lib/actions/transactions.action'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: Request) {

    const body = await req.text()
    const signature = req.headers.get('Stripe-Signature') as string
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SIGNING_SECRET as string
        )
    } catch (error) {
        return new NextResponse("webhook error", { status: 400 })
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const eventType = event.type
    
    if(eventType === 'checkout.session.completed') {
        // handle successful checkout
        const { id, amount_total, metadata } = session

        const transaction = {
            stripeId: id,
            amount: amount_total ? amount_total / 100 : 0,
            plan: metadata?.plan || '',
            credits: metadata?.credits ? Number(metadata.credits) : 0,
            buyerId: metadata?.buyerId || '',
            createdAt: new Date()   
        } as CreateTransactionParams

        const newTransaction = await createTransaction(transaction)
        return new NextResponse(JSON.stringify(newTransaction), { status: 200 })
    }
}