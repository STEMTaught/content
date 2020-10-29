import React from 'react'
import IconButton from './IconButton'

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
            reader: {content:''}
        }

        const type = this.state.type
        
        // add a new block of the specified type
        if (Object.keys(defaultBlocks).includes(type)){
            let block = {
                type: type,
                data: defaultBlocks[type]
            }
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
            'Question': 'question',
            'Reader': 'reader',
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
                <IconButton icon='add' handleClick={this.handleClick}/>
            </div>
        )
    }
}

export default AddBlock