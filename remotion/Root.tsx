import React from 'react'
import { Composition } from 'remotion'
import { InvestorShowcase } from './InvestorShowcase'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InvestorShowcase"
        component={InvestorShowcase}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={600}
      />
    </>
  )
}
