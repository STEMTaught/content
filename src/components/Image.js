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
        this.updateUrl = this.updateUrl.bind(this)
        this.updateDescription = this.updateDescription.bind(this)
    }

    updateUrl(event){
        let {index, data} = this.props
        data.url = event.target.value
        this.props.updateBlock(data, index)
    }

    updateDescription(event){
        let {index, data} = this.props
        data.description = event.target.value
        this.props.updateBlock(data, index)
    }
    
    render(){
        const {url, description} = this.props.data
        const image = url
            ? <img src={url} alt={description || ''}/>
            : ''

        return (
            <div className='Image'>
                {image}
                <div>
                    <input type='text' placeholder='Alt Text' onChange={this.updateDescription} value={description}/>    
                    <input className='url' type='url' placeholder='Photo URL' onChange={this.updateUrl} value={url}/>
                </div>
            </div>
        )
    }
}





///////////////////////////////////////////
// CONTENT
///////////////////////////////////////////

class Content extends React.Component{
    render(){
        const {url, description} = this.props.data

        const image = url
            ? <img src={url} alt={description || ''}/>
            : ''

        /*
        const desc = description
            ? <h5>{description}</h5>
            : ''
        */

        return (
            <div className='Image'>
                {image}
            </div>
        )
    }
}


export default Image