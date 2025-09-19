import { useState } from 'react'

import { FlexBox } from '~/components/Base/FlexBox'
import { LoadingOverlay } from '~/components/Base/Loading'
import { PageHead } from '~/components/Head'

type Props = {
  children?: React.ReactNode
}

export const DefaultLayout = ({ children }: Props): React.ReactNode => {
  // recoilなどに移してローディングをグローバルで管理する
  const [isLoading] = useState<boolean>(false)

  return (
    <>
      <PageHead />

      <FlexBox
        style={{
          position: 'relative',
        }}
      >
        {isLoading && <LoadingOverlay />}
        <FlexBox px={32} py={16}>
          {children}
        </FlexBox>
      </FlexBox>
    </>
  )
}
