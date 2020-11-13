import React from 'react'
import ResizableTextarea from './ResizableTextArea'

class Video extends React.Component{
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
        this.updateVideoID = this.updateVideoID.bind(this)
    }

    updateVideoID(event){
        let {index, data} = this.props
        data.videoID = event.target.value
        this.props.updateBlock(data, index)
    }
    




    render(){
        const {videoID} = this.props.data

        return (
            <div className='Video'>
                <input type='text' placeholder='Youtube Video ID' onChange={this.updateVideoID} value={videoID}/>
            </div>
        )
    }
}





///////////////////////////////////////////
// CONTENT
///////////////////////////////////////////

class Content extends React.Component{
    render(){
        const {videoID} = this.props.data



        return (
            <div className='Video'>
                <iframe width="560" height="315" src={'https://www.youtube.com/embed/' + videoID} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>            
            </div>
        )
    }
}


export default Video