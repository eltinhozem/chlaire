import { render } from '@testing-library/react'
import 'jest-styled-components'
import MediaMatch from '.'
import styled from 'styled-components'

// Criando um wrapper para forçar a renderização dentro de styled-components
const TestWrapper = styled.div`
  display: block;
`

describe('<MediaMatch />', () => {
  it('should show or hide based on the media passed', () => {
    const { container } = render(
      <>
        <TestWrapper>
          <MediaMatch greaterThan="medium">
            <h1 data-testid="desktop">Desktop</h1>
          </MediaMatch>
        </TestWrapper>
        <TestWrapper>
          <MediaMatch lessThan="medium">
            <h1 data-testid="mobile">Mobile</h1>
          </MediaMatch>
        </TestWrapper>
      </>
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
