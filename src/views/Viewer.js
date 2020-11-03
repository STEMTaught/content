import React from 'react'
import BlockSet from '../components/BlockSet'

class Viewer extends React.Component {

    componentDidMount(){
        //window.parent.postMessage('viewer loaded', '*')
    }

    render() {
        return (
            <div className='Viewer'>
                <BlockSet
                    blocks={this.props.blocks}
                    edit={false}
                />
            </div>
        )
    }
}


export default Viewer


