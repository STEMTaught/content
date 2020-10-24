import React from 'react'
import IconButton from './IconButton'

class BlockControls extends React.Component{
    
    render(){
        const {index, blockCount, removeBlock, moveBlock} = this.props
        const upDisabled =  index === 0 ? ' disabled' : ''
        const downDisabled = index === blockCount ? ' disabled' : ''
        
        return (
            <div className='BlockControls'>
                <IconButton 
                    icon='keyboard_arrow_up' 
                    className={upDisabled}
                    handleClick={() => moveBlock('up', index)}
                />
                
                <IconButton 
                    icon='keyboard_arrow_down' 
                    className={downDisabled}
                    handleClick={() => moveBlock('down', index)}
                />
                
                <IconButton
                    icon='clear' 
                    className='clear' 
                    handleClick={() => removeBlock(index)}
                />
            </div>
        )
    }
}

export default BlockControls
