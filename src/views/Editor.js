import React from 'react'
import BlockSet from '../components/BlockSet'

class Editor extends React.Component {
    componentDidMount(){
        //window.parent.postMessage('editor loaded', '*')
    }

    render() {
        return (
            <div className='Editor'>
                <BlockSet
                    blocks={this.props.blocks}
                    updateData={this.props.updateData}
                    edit={true}
                />
            </div>
        )
    }
}


export default Editor


