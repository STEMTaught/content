import React from 'react';
import Viewer from './views/Viewer'
import Editor from './views/Editor'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blocks: [/*
                {
                    type: 'reader',
                    data: {
                        url: 'https://static.wixstatic.com/mp3/01b81b_3aa47ab31ef0414c864f060cd9c9daed.wav',
                        content: `[["Title",[["The",0,0.4],["Three",0.4,0.8],["Little",0.8,1],["Birds",1,1.3]]],["Subtitle",[["Making",1.3,2.4],["Shade",2.4,2.9]]]]`
                    }
                }, {
                    type: 'image',
                    data: {
                        url: 'https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                        description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                    }
                }, {
                    type: 'text',
                    data: {
                        text: `<p style="text-align: center;"><span style="font-size: 20pt;"><strong><span style="font-family: 'Open Sans', Arial, sans-serif; text-align: justify; background-color: #ffffff;">This is a Title</span></strong></span></p><p><span style="font-family: 'Open Sans', Arial, sans-serif; font-size: 18.6667px; text-align: justify; background-color: #ffffff;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum <strong>dolore</strong> eu fugiat nulla pariatur.</span></p>`
                    }
                }, {
                    type: 'question',
                    data: {
                        question: '________ is a combination of materials that are physically mixed together.',
                        answers: ['A Mixture', 'A Solute', 'A Solvent', 'An Element'],
                        correctIndex: 0
                    }
                }, {
                    type: 'text',
                    data: {
                        text: `<p><span style="font-family: 'Open Sans', Arial, sans-serif; font-size: 14pt; text-align: justify; background-color: #ffffff;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span></p>`
                    }
                }, {
                    type: 'image',
                    data: {
                        url: 'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                        description: 'Duis aute irure dolor in reprehenderit.'
                    }
                }, {
                    type: 'text',
                    data: {
                        text: `<p><span style="font-family: 'Open Sans', Arial, sans-serif; font-size: 14pt; text-align: justify; background-color: #ffffff;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span></p>`
                    }
                },*/
            ]
        }

        this.updateData = this.updateData.bind(this)
    }
    
    sendMessage(msg) {
        console.log('Sending msg to parent', msg)
        window.parent.postMessage(msg, '*')
    }
    
    handleMessage(msg) {
        const data = msg.data
        console.log('msg recieved from parent:', data)
        if ('blocks' in data){
            this.setState({'blocks':data['blocks']} )
            console.log('blocks', data['blocks'])
        }
        //this.sendMessage('Message to Wix')

    }
    
    componentDidMount() {
        // listen for messages
        window.addEventListener('message', (msg) => this.handleMessage(msg))
        
    }
    
    updateData(newData) {
        this.sendMessage({'blockUpdate':newData})
        this.setState(newData)
    }
   

    render() {
        const params = new URLSearchParams(window.location.search)
        const view = params.get('view') || 'viewer'

        const {blocks} = this.state

        return (view === 'editor') 
            ? <Editor blocks={blocks} updateData={this.updateData}/>
            : <Viewer blocks={blocks}/>
    }
}


export default App;
