import React from 'react';
//import Content from './oldComponents/Content/Content'
//import Editor from './components/Editor/Editor'
import Page from './components/Page'

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

  updateBlocks(newBlocks){
    //console.log(newBlocks)
    this.setState({blocks:newBlocks})
  }
  
  //<Editor updateBlocks={this.updateBlocks}/>
  //<Content blocks={this.state.blocks}/>

  render() {
      return <Page/>
  }
}


export default App;
