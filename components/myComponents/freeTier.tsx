import { checkLimit } from '@/lib/apiLimit'
import React, { useState, useEffect } from 'react'
import FreeCounter from './freeCounter';

function FreeTier() {
  const [isUpgraded, setIsUpgraded] = useState<boolean>(false);
  const [leftGenerations, setLeftGenerations] = useState<number>(0);

  //didn't used dependency array because it not gets updated on re render only gets called on mounting if used empty dependency array for the useEffect
  useEffect(() => {
    console.log("inside useEffect");
    async function upgrade() {
      const response = await checkLimit();
      if (response?.plan) {
        console.log("upgraded user");
        setIsUpgraded(true);
      } else {
        setLeftGenerations(response?.leftGenerations || 0);
      }
    }
    upgrade();
  })


  return (
    <div>
      {isUpgraded ?
        null
        :
        <div>
          <FreeCounter leftGenerations={leftGenerations} />
        </div>
      }
    </div>
  )
}

export default FreeTier;
