import React from 'react'
import ResizableTextarea from './ResizableTextArea'

class Prompt extends React.Component{
    render(){
        const {edit, index, data, updateBlock} = this.props

        return edit
            ? <Editor data={data} index={index} updateBlock={updateBlock}/>
            : <Content data={data}/>
    }  
}


///////////////////////////////////////////
// EDITOR
///////////////////////////////////////////

class Editor extends React.Component{
    constructor(props){
        super(props)
        this.updateText = this.updateText.bind(this)
    }

    updateText(event){
        let {index, data} = this.props
        data.text = event.target.value
        this.props.updateBlock(data, index)
    }
    

    handleKeyDown(event){
        // disable enter key
        if (event.key === 'Enter') event.preventDefault()
    }



    render(){
        const {text} = this.props.data

        return (
            <div className='Prompt'>
                <ResizableTextarea className='promptText' placeholder='Prompt' onChange={this.updateText} onKeyDown={this.handleKeyDown} value={text}/>
            </div>
        )
    }
}





///////////////////////////////////////////
// CONTENT
///////////////////////////////////////////

class Content extends React.Component{
    render(){
        const {text} = this.props.data



        return (
            <div className='Prompt'>
                <p>{text || ''}</p>
                <ResizableTextarea className='userInput' placeholder='Write your response here.' />
            </div>
        )
    }
}


export default Prompt