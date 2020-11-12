import React from 'react'
import Block from './Block'
import BlockControls from './BlockControls'
import Image from './Image'
import AddBlock from './AddBlock'
import Text from './Text'
import Question from './Question'
import Reader from './Reader'
import Prompt from './Prompt'

class BlockSet extends React.Component{
    constructor(props){
        super(props)

        this.updateBlocks = (blocks) => this.props.updateData({blocks:blocks})

        this.updateBlock = this.updateBlock.bind(this)
        this.removeBlock = this.removeBlock.bind(this)
        this.swapBlocks = this.swapBlocks.bind(this)
        this.moveBlock = this.moveBlock.bind(this)
        this.addBlock = this.addBlock.bind(this)
    }

    


    updateBlock(data, index){
        let blocks = this.props.blocks

        blocks[index].data = {...blocks[index].data, ...data}
        this.updateBlocks(blocks)
    }
    
    removeBlock(index) {
        let blocks = this.props.blocks
        blocks.splice(index, 1)
        this.updateBlocks(blocks)
    }

    swapBlocks(indexA, indexB) {
        let blocks = this.props.blocks
        let blockA = blocks[indexA]
        blocks[indexA] = blocks[indexB]
        blocks[indexB] = blockA
        this.updateBlocks(blocks)
    }

    moveBlock(direction, index) {
        let blocks = this.props.blocks
        const isFirst = index === 0
        const isLast = index === blocks.length - 1

        if (direction === 'up' && !isFirst) {
            this.swapBlocks(index, index - 1)
        }
        else if (direction === 'down' && !isLast) {
            this.swapBlocks(index, index + 1)
        }

    }

    addBlock(data) {
        let blocks = this.props.blocks
        blocks.push(data)
        this.updateBlocks(blocks)
    }
    
    
    
    
    render(){
        const {blocks, edit} = this.props

        const blocksToRender = blocks.map(
            (block, index) => {
                const {type, data} = block
                
                const elements = {
                    'text': <Text edit={edit} data={data} index={index} updateBlock={this.updateBlock}/>,
                    'image': <Image edit={edit} data={data} index={index} updateBlock={this.updateBlock}/>,
                    'question': <Question edit={edit} data={data} index={index} updateBlock={this.updateBlock}/>,
                    'reader': <Reader edit={edit} data={data} index={index} updateBlock={this.updateBlock}/>,
                    'prompt': <Prompt edit={edit} data={data} index={index} updateBlock={this.updateBlock}/>,
                }

                const controls = edit
                    ? <BlockControls 
                        index={index} 
                        blockCount={blocks.length-1} 
                        removeBlock={this.removeBlock}
                        moveBlock={this.moveBlock}
                        />
                    : ''

                return(
                    <Block edit={edit}>
                        {elements[type]}
                        {controls}
                    </Block>
                ) 
            }
        )

        const addBlock = edit ? <AddBlock addBlock={this.addBlock}/> : ''

        return(
            <div className='BlockSet'>
                {blocksToRender}
                {addBlock}
            </div>
        )
    }
}

export default BlockSet