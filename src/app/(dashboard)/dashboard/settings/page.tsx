import React from 'react'
import Settings from '~/components/dashboard/Settings'

import { getCurrentUser } from '~/service/user.service'

const Page = async () => {
  const user = await getCurrentUser()

  return (
<Settings user={user}/>
  )
}

export default Page
