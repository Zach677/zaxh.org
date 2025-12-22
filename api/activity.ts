import { Redis } from '@upstash/redis'

const ACTIVITY_KEY = 'current_activity'
const ACTIVITY_TTL = 30

interface ActivityData {
  processName: string
  timestamp: number
}

export const config = {
  runtime: 'edge',
}

// Initialize Redis client
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

export default async function handler(request: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-API-Key',
  }

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  // GET: Fetch current activity
  if (request.method === 'GET') {
    try {
      const data = await redis.get<ActivityData>(ACTIVITY_KEY)

      if (!data) {
        return new Response(JSON.stringify({ online: false }), {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        })
      }

      // Check if data is stale (older than 5 minutes)
      const isOnline = Date.now() - data.timestamp < ACTIVITY_TTL * 1000

      return new Response(
        JSON.stringify({
          online: isOnline,
          processName: isOnline ? data.processName : null,
          timestamp: data.timestamp,
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    } catch {
      return new Response(
        JSON.stringify({ online: false, error: 'Failed to fetch activity' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    }
  }

  // POST: Update activity (ProcessReporter payload, requires API key)
  if (request.method === 'POST') {
    try {
      const body = (await request.json()) as {
        process?: { name?: string }
        key?: string
      }

      const apiKey = body.key
      const expectedKey = process.env.ACTIVITY_API_KEY

      if (!expectedKey || apiKey !== expectedKey) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        })
      }

      const processName = body.process?.name

      if (!processName) {
        return new Response(
          JSON.stringify({ error: 'process.name is required' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          },
        )
      }

      const data: ActivityData = {
        processName,
        timestamp: Date.now(),
      }

      await redis.set(ACTIVITY_KEY, data, { ex: ACTIVITY_TTL })

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    } catch {
      return new Response(
        JSON.stringify({ error: 'Failed to update activity' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        },
      )
    }
  }

  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}
