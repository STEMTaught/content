import React from 'react'

class AddBlock extends React.Component{
    constructor(props){
        super(props)
        this.state = {type:''}
        this.handleClick = this.handleClick.bind(this)
        this.updateType = this.updateType.bind(this)
    }

    handleClick(event){
        const defaultBlocks = {
            text: {text:''},
            image: {url:'', description:''},
            question: {question:'', answers:[''], correct:''},
        }

        const type = this.state.type
        
        // add a new block of the specified type
        if (Object.keys(defaultBlocks).includes(type)){
           let block = defaultBlocks[type]
           block.type = type
           console.log('adding block:', block)
           this.props.addBlock(block)
        }
    }

    updateType(event){
        const newType = event.target.value
        this.setState({type:newType})
    }
    
    render(){
        const types = {
            'Text': 'text',
            'Image': 'image',
            'Question': 'question'
        }

        const options = Object.keys(types).map(
            type => <option value={types[type]} key={types[type]}>{type}</option>
        )

        return (
            <div className='AddBlock'>
                <select onChange={this.updateType} defaultValue='default'>
                    <option value="default" disabled="disabled">Choose a block type</option>
                    {options}
                </select>
                <i className="material-icons" onClick={this.handleClick}>add</i>
            </div>
        )
    }
}

export default AddBlock