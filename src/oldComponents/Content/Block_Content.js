import React from 'react';
import TextContent from './TextBlock'
import ImageContent from './ImageBlock'



class Block extends React.Component{
  render(){
      return (
          <div className='Block'>
              <BlockContent data={this.props.data}/>
          </div>
      )
  }
}



class BlockContent extends React.Component{
    render(){
        const {type} = this.props.data
        let content

        if (type === 'text') content = <TextContent data={this.props.data}/>
        if (type === 'image') content = <ImageContent data={this.props.data}/>

        return (
            <div className='Block_Content'> 
                {content || <p>Type Not Recognized</p>}
            </div>
        )
    }
}

export default Block;
