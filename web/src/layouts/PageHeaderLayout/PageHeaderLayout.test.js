import { render } from '@redwoodjs/testing/web'

import PageHeaderLayout from './PageHeaderLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PageHeaderLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PageHeaderLayout />)
    }).not.toThrow()
  })
})
