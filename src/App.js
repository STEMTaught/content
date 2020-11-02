import React from 'react';
import Dev from './views/Dev'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.updateBlocks = this.updateBlocks.bind(this)
    }

    sendMessage(msg) {
        //console.log('[IFRAME] => wix:', msg)
        //window.parent.postMessage(msg, '*')
    }

    handleMessage(msg) {
        //let data = msg.data
        //console.log('wix => [IFRAME]:', data)
        //this.sendMessage('Message to Wix')
    }

    componentDidMount() {
        // listen for messages
        //window.addEventListener('message', (msg) => this.handleMessage(msg))
    }

    updateBlocks(newBlocks) {
        //console.log(newBlocks)
        this.setState({ blocks: newBlocks })
    }
   

    render() {
        const params = new URLSearchParams(window.location.search)
        const view = params.get('view') || 'dev'
        console.log('view',view)



        return <Dev />
    }
}


export default App;
