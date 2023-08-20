import type { Handle } from '@sveltejs/kit'
import { prisma } from '$lib/server/database'

export const handle: Handle = async ({ event, resolve }) => {
  const session_id = event.cookies.get('session')

  if (!session_id) {
    return await resolve(event)
  }

  // const user = await prisma.users.findUnique({
  //   where: { session: session_id }
  // })
  const user = await prisma.users.findFirst({
    where: { sessions: {
      has: session_id
    } }
  })

  if (!user) {
    return await resolve(event);
  }

  event.locals.user = {
    id: user.id,
    username: user.username,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password_hash: user.password_hash,
    is_verified: user.is_verified ?? false,
    created_at: user.created_at ?? new Date(),
    tier: user.tier ?? '',
    role: user.role ?? '',
    profile_picture: user.profile_picture ?? '',
    last_login_at: user.last_login_at ?? new Date(),
    is_active: user.is_active ?? false,
    encryption_key: user.encryption_key ?? '',
    subscription: user.subscription ?? ''
  }

  return await resolve(event)
}
