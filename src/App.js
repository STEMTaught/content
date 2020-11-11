import React from 'react';
import Viewer from './views/Viewer'
import Editor from './views/Editor'
import TOC from './views/TOC'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            type: undefined,
            data: undefined
        }

        this.updateData = this.updateData.bind(this)
        //this.handleInit = this.handleInit.bind(this)
        this.attemptConnect = this.attemptConnect.bind(this)
      
    }
    
    sendMessage(type, data) {
        const msg = {type:type, data:data}
        //console.log('msg to parent:', msg)
        window.parent.postMessage(msg, '*')
    }
    /*
    handleInit(_data){
        const {type, data} = _data
        this.setState({type:type,data:data})
        //console.log('state', this.state)
    }
    */


    handleMessage(msg) {
        const {type, data} = msg.data
        console.log('msg from parent', msg.data.data)

        if (type === 'init'){
            this.setState({type:data.type,data:data.data})
        }

        if (type === 'update'){
            this.setState({data:data})
        }
    }
    
    attemptConnect(){
        if (!this.state.type){
            //console.log('try to connect')
            setTimeout(() => {
                this.sendMessage('hello', '')
                this.attemptConnect()
            }, 500);
        }
    }

    componentDidMount() {
        window.addEventListener('message', (msg) => this.handleMessage(msg))
        this.attemptConnect()
    }
    
    updateData(data) {
        //this.sendMessage({'blockUpdate':newData})
        this.sendMessage('update', data)
        const newData = {...this.state.data, ...data}
        this.setState({data:newData})
    }
   

    render() {
        const {type, data} = this.state

        console.log('state',this.state)

        if (type === 'editor') return <Editor blocks={data.blocks} updateData={this.updateData}/>
        if (type === 'viewer') return <Viewer blocks={data.blocks}/>
        if (type === 'toc') return <TOC selected={data.selected} pages={data.pages} updateData={this.updateData}/>


        return <p>Loading...</p>
    }
}


export default App;
