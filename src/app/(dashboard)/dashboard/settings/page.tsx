import { cookies } from 'next/headers'
import React from 'react'
import Settings from '~/components/dashboard/Settings'

import { getCurrentUser } from '~/service/user.service'

const Page = async () => {
  const accessToken=cookies().get('access_token')?.value
  const user = await getCurrentUser(accessToken)

  return (
<Settings user={user}/>
  )
}

export default Page
export const dynamic = 'force-dynamic'