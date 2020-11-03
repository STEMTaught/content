import React from 'react'
import BlockSet from '../components/BlockSet'

class Viewer extends React.Component {
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


