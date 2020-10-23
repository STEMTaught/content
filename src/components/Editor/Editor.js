import React from 'react';
import AddBlock from './AddBlock'
import Block from './Block'



class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.removeBlock = this.removeBlock.bind(this)
        this.swapBlocks = this.swapBlocks.bind(this)
        this.moveBlock = this.moveBlock.bind(this)
        this.updateBlock = this.updateBlock.bind(this)
        this.addBlock = this.addBlock.bind(this)
    }


    componentDidMount() {
        const blocks = [
            {
                type: 'question',
                question:'', 
                answers:[''], 
                correctIndex:0
            }, {
                type: 'text',
                //text:`<p style="text-align: center;"><span style="font-size: 20pt;"><strong>This is a title</strong></span></p>\n<p><span style="font-family: 'Open Sans', Arial, sans-serif; font-size: 14pt; text-align: justify; background-color: #ffffff;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span></p>`
                text: `<p style="text-align: center;"><span style="font-size: 20pt;"><strong><span style="font-family: 'Open Sans', Arial, sans-serif; text-align: justify; background-color: #ffffff;">This is a Title</span></strong></span></p><p><span style="font-family: 'Open Sans', Arial, sans-serif; font-size: 18.6667px; text-align: justify; background-color: #ffffff;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum <strong>dolore</strong> eu fugiat nulla pariatur.</span></p>`
            }, {
                type: 'image',
                url: 'https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
            }, {
                type: 'text',
                text: `<p><span style="font-family: 'Open Sans', Arial, sans-serif; font-size: 14pt; text-align: justify; background-color: #ffffff;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span></p>`
            }, {
                type: 'image',
                url: 'https://images.pexels.com/photos/847393/pexels-photo-847393.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                description: 'Duis aute irure dolor in reprehenderit.'
            }, {
                type: 'text',
                text: `<p><span style="font-family: 'Open Sans', Arial, sans-serif; font-size: 14pt; text-align: justify; background-color: #ffffff;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</span></p>`
            },
        ]
        this.setState({ blocks: blocks })
        this.props.updateBlocks(blocks)
    }



    removeBlock(index) {
        let { blocks } = this.state
        blocks.splice(index, 1)
        this.setState({ blocks: blocks })
        this.props.updateBlocks(this.state.blocks)
    }

    swapBlocks(indexA, indexB) {
        let { blocks } = this.state
        let blockA = blocks[indexA]
        blocks[indexA] = blocks[indexB]
        blocks[indexB] = blockA
        this.setState({ blocks: blocks })
        this.props.updateBlocks(this.state.blocks)
    }

    moveBlock(direction, index) {
        let { blocks } = this.state
        const isFirst = index === 0
        const isLast = index === blocks.length - 1

        if (direction === 'up' && !isFirst) {
            this.swapBlocks(index, index - 1)
        }
        else if (direction === 'down' && !isLast) {
            this.swapBlocks(index, index + 1)
        }

    }

    updateBlock(data, index) {
        let { blocks } = this.state
        const updatedBlock = {
            ...blocks[index],
            ...data
        }
        blocks[index] = updatedBlock
        this.setState({ blocks: blocks })
        this.props.updateBlocks(this.state.blocks)
    }

    addBlock(data) {
        let { blocks } = this.state
        blocks.push(data)
        this.setState({ blocks: blocks })
        this.props.updateBlocks(this.state.blocks)
    }

    render() {
        let blocksToLoad
        const { blocks } = this.state

        const functionsToPass = {
            removeBlock: this.removeBlock,
            moveBlock: this.moveBlock,
            updateBlock: this.updateBlock,
        }

        if (blocks) {
            blocksToLoad = blocks.map(
                (block, index) => {
                    block.index = [index, blocks.length - 1]
                    return <Block data={block} functions={functionsToPass} key={index} />
                }
            )
        }

        return (
            <div className='Editor'>
                {blocksToLoad}
                <AddBlock addBlock={this.addBlock} />
            </div>
        )
    }
}


export default Editor;
