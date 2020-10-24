import React from 'react'


class Image extends React.Component{
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
        this.props.updateBlock({text:value}, index)
    }
    
    render(){
        const {url, description} = this.props.data
        return <div className='Image'></div>
    }
}





///////////////////////////////////////////
// CONTENT
///////////////////////////////////////////

class Content extends React.Component{
    render(){
        return <div className='Image'></div>
    }
}


export default Image