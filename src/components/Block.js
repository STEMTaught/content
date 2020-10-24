import React from 'react'

class Block extends React.Component{
    render(){
        const edit = this.props.edit ? 'edit' : ''
        return <div className={'Block ' + edit}>{this.props.children}</div>
    }
}

export default Block