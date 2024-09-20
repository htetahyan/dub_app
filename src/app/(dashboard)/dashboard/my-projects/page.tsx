import { redirect } from 'next/navigation'
import React from 'react'
import { getCurrentUser } from '~/service/user.service'
import { prisma } from '~/utils/utils'

import { cookies } from 'next/headers'
import MyProjects from '~/components/dashboard/MyProjects'
const page = async () => {
  const accessToken=cookies().get('access_token')?.value
  const user = await getCurrentUser(accessToken)
  if (!user) redirect('/signin')

  const dubbingProjects = await prisma.dubbingProject.findMany(

    {
      take: 6,
      orderBy: { createdAt: 'desc' },
    where: { userId: user.id },
    select: {
      id: true,
      dubbingId: true,
      name: true,
      createdAt: true,
      uploadType: true,
      creditCost: true,
      voice: true,
      durationMinutes: true,
      translateTo: true,
      currentLanguage: true,
      youtubeUrl: true,
      url: true,
      projectType: true
    }
  })
  const data={...dubbingProjects,totalProjects:10}

  return (
 <MyProjects dubbingProjects={data} />
  )
}

export default page
