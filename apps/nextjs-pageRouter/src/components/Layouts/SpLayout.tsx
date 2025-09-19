import { FlexBox } from '~/components/Base/FlexBox'
import { PageHead } from '~/components/Head'

type Props = {
  children?: React.ReactNode
}

export const SpLayout = ({ children }: Props): React.ReactNode => (
  <FlexBox>
    <PageHead />
    <FlexBox
      style={{
        minHeight: '100vh',
        width: 500,
        maxWidth: 500,
      }}
    >
      {children}
    </FlexBox>
  </FlexBox>
)
