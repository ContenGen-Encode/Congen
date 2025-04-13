import { clerkClient } from '@clerk/nextjs/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { v4 as uuidv4} from "uuid"

export async function POST(req:Request) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    if (eventType =="user.created" && id) {
      const client = await clerkClient()
      await client.users.updateUserMetadata(id, {
        privateMetadata: {
          container: uuidv4()
        }
      })
    }
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}