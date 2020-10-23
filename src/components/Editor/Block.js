import React from 'react';
import TextEditor from './TextEditor'
import ImageEditor from './ImageEditor'
import QuestionEditor from './QuestionEditor'

class Block extends React.Component{
  render(){
      const {index} = this.props.data

      return (
          <div className='Block'>
              <BlockContent data={this.props.data} updateBlock={this.props.functions.updateBlock}/>
              <BlockControls index={index} functions={this.props.functions}/>
          </div>
      )
  }
}

class BlockControls extends React.Component{
    render(){
        const [index, blockCount] = this.props.index
        const upDisabled =  index === 0 ? ' disabled' : ''
        const downDisabled = index === blockCount ? ' disabled' : ''
        const {removeBlock, moveBlock} = this.props.functions

        return (
            <div className='BlockControls'>
                <i className={"material-icons arrow" + upDisabled} onClick={()=>{moveBlock('up', index)}}>keyboard_arrow_up</i>
                <i className={"material-icons arrow" + downDisabled} onClick={()=>{moveBlock('down', index)}}>keyboard_arrow_down</i>
                <i className="material-icons clear" onClick={()=>{removeBlock(index)}}>clear</i>
            </div>
        )
    }
}

class BlockContent extends React.Component{
    render(){
        const {type} = this.props.data
        let content

        if (type === 'text') content = <TextEditor data={this.props.data} updateBlock={this.props.updateBlock}/>
        if (type === 'image') content = <ImageEditor data={this.props.data} updateBlock={this.props.updateBlock}/>
        if (type === 'question') content = <QuestionEditor data={this.props.data} updateBlock={this.props.updateBlock}/>

        return (
            <div className='BlockContent'> 
                {content || <p>Type Not Recognized</p>}
            </div>
        )
    }
}

export default Block;
