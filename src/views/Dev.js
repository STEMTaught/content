import React from 'react'
import BlockSet from '../components/BlockSet'

class Dev extends React.Component {
    

    render() {
        return (
            <div className='Dev'>
                <iframe src='http://localhost:3000/editor?view=editor'/>
                <iframe src='http://localhost:3000/editor?view=viewer'/>
            </div>
        )
    }
}

export default Dev