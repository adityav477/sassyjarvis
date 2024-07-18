"use client"
import { checkSubscription } from '@/lib/subscription'
import IsPro from '@/components/myComponents/isPro'
import IsNotPro from '@/components/myComponents/isNotPro'
import { useEffect, useState } from 'react'

function SettingsServer() {
  const [isPro, setIsPro] = useState(false);
  const [expiry, setExpiry] = useState<Date | null | undefined>();

  useEffect(() => {
    async function fetchIsPro() {
      // console.log("inside fetchIsPro");
      const { isPro, expiry } = await checkSubscription();

      setIsPro(isPro);
      setExpiry(expiry);
    }
    fetchIsPro();
  }, [])

  return (
    <div>
      {isPro ?
        <IsPro expiry={expiry} /> :
        <IsNotPro />
      }
    </div>
  )
}

export default SettingsServer;
