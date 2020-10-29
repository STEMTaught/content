import React from 'react'
import ResizableTextarea from './ResizableTextArea'

class Reader extends React.Component{
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
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        const {index} = this.props
        const {value} = event.target
        this.props.updateBlock({content:value}, index)
    }
    
    render(){
        const {content} = this.props.data
        return (
            <div className='Reader'>
                <input type='text' placeholder='Audio file url' className='url'/>
                <ResizableTextarea placeholder='Paste reader data here' onChange={this.handleChange} value={content}/>
            </div>
        )
    }
}





///////////////////////////////////////////
// CONTENT
///////////////////////////////////////////

class Content extends React.Component{
    render(){
        const {content} = this.props.data
        
        let json = JSON.parse('{"0":["",0,1]}')
        try{
            json = JSON.parse(content)
        }
        catch{

        }
        
        console.log(json)
        const contentToRender = Object.keys(json).map(
            i => {
                return <span>{json[i][0] + ' '}</span>
            }
        )
        
        return (
            <div className='Reader'>
                {contentToRender}
            </div>
        )
    }
}


export default Reader