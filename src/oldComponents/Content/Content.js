import React from 'react';
import Block from './Block_Content'

class Content extends React.Component {

  render() {
    let blocksToLoad
    const { blocks } = this.props

    if (blocks) {
      blocksToLoad = blocks.map(
        (block, index) => {
          return <Block data={block} key={index} />
        }
      )
    }

    return (
      <div className='Content'>
        {blocksToLoad}
      </div>
    )
  }
}





export default Content;
