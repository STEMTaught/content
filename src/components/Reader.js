import React from 'react'
import ResizableTextarea from './ResizableTextArea'
import IconButton from './IconButton'

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
        this.updateContent = this.updateContent.bind(this)
        this.updateUrl = this.updateUrl.bind(this)
    }

    updateContent(event){
        const {index} = this.props
        const {value} = event.target
        this.props.updateBlock({content:value}, index)
    }

    updateUrl(event){
        const {index} = this.props
        const {value} = event.target
        this.props.updateBlock({url:value}, index)
    }
    
    render(){
        const {content, url} = this.props.data
        return (
            <div className='Reader'>
                <input type='text' placeholder='Audio file url' className='url' onChange={this.updateUrl} value={url}/>
                <ResizableTextarea placeholder='Paste reader data here' onChange={this.updateContent} value={content}/>
            </div>
        )
    }
}





///////////////////////////////////////////
// CONTENT
///////////////////////////////////////////

class Content extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            position: -1,
            playing: false,
            audio: new Audio(props.data.url)
        }

        this.updateAudioLocation = this.updateAudioLocation.bind(this)
        this.togglePlay = this.togglePlay.bind(this)
        this.restartAudio = this.restartAudio.bind(this)
    }


    // change audio playing state
    togglePlay() {
        this.state.playing ? this.state.audio.pause() : this.state.audio.play()
        this.setState({ playing: !this.state.playing })
    }

    restartAudio() {
        this.setState({
            playing: false,
            position: -1
        })
        this.state.audio.pause()
        this.state.audio.currentTime = 0
    }

    updateAudioLocation() {
        // update the current audio playback position
        this.setState({ position: this.state.audio.currentTime })

        // reset once audio ends
        this.state.audio.currentTime === this.state.audio.duration && this.restartAudio()
    }

    // recursive function to update audio location
    trackAudioPosition() { setTimeout(() => this.state.playing && this.updateAudioLocation(), 50) }
    componentDidUpdate() { this.trackAudioPosition() }


    render(){
        const {content} = this.props.data
        const {playing, position, audio} = this.state
        
        let json
        try { json = JSON.parse(content) }
        catch {json = [["Title",[["Error, verify reader data!",-1,-1]]]]}

        
        let words = json.map(
            (textData, i) => {
                const [type, text] = textData

                return <Words
                    position={this.state.position}
                    type={type}
                    text={text}
                    key={i}
                />
            }
        )
        


        
        return (
            <div className='Reader'>
                <AudioButtons playing={playing} position={position} togglePlay={this.togglePlay} restartAudio={this.restartAudio} />
                <div className='ReaderText'>
                    {words}
                </div>
            </div>
        )
    }
}









function AudioButtons(props){
    const {playing, position, togglePlay, restartAudio} = props

    
    const restart = position > 0 && <IconButton icon='replay' handleClick={restartAudio}/>

    return (
        <div className='AudioButtons'>
            <IconButton icon={playing ? 'pause' : 'play_arrow'} handleClick={togglePlay}/>  
            {restart}
        </div>
    )
}















function Words(props) {
    let type = props.type || 'hidden'
    type = type === 'Audio Only' ? 'hidden' : type

    let words = props.text.map(
        (word, i) => {
            let key = i
            let timingPadding = 0.05
            let start = word[1] - timingPadding
            let end = word[2] + timingPadding

            // highlight text if the current playback position is within this word's bounds
            let highlight = (start <= props.position && props.position <= end).toString()
            word = word[0]

            return <p start={start} end={end} highlight={highlight} key={key}>{word}</p>;
        }
    )

    // prepend bullet character if type === bullet
    let prepend = type === 'bullet' ? <p>&#8226;</p> : ''

    return <div className={type}>{prepend}{words}</div>
}


export default Reader