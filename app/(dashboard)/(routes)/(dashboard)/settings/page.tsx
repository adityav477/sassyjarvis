"use client"
import Heading from '@/components/myComponents/heading'
import { Settings } from 'lucide-react'
import SettingsServer from '@/components/myComponents/settingsServer'

function SettingsPage() {

  return (
    <div>
      <Heading
        label='Settings'
        subHeading="Manage Your profile Settings"
        icon={Settings}
        color='bg-gray-200'
        bgcolor='bg-gray-100/50'
      />
      <SettingsServer />
    </div>
  )
}

export default SettingsPage
