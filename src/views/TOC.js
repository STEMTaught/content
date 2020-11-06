import React from 'react'
import IconButton from '../components/IconButton'

class TOC extends React.Component {
    constructor(props){
        super(props)
    }
    
    addPage(grade, unit){
        console.log('add page', grade, unit)
    }

    render() {
        const {selected, pages} = this.props    
        
        const toReturn = Object.keys(pages).map(
            grade => {
                const label = `Grade ${grade}`
                
                const units = Object.keys(pages[grade]).map(
                    unit =>{
                        const pagesToRender = pages[grade][unit].map(page => <Page label={page}/>)
                        
                        return (
                            <Unit label={unit}>
                                {pagesToRender}
                                <IconButton icon='add' className='addPage' handleClick={() => this.addPage(grade, unit)}/>
                            </Unit>
                        )
                })
                
                return (
                    <Grade label={label}>
                    {units}
                </Grade>
            )
        }
        )
        
            

        return (
            <div className='TOC'>
                {toReturn || ''}
            </div>
        )
    }
}





class Grade extends React.Component{
    render(){
        const {label, children} = this.props
        return (
            <div className='Grade'>
                <p>{label}</p>
                {children}
            </div>
        )
    }
}

function Unit(props){
    const {label} = props
    return (
        <div className='Unit'>
            <p>{label}</p>
            {props.children}
        </div>
    )
}



function Page(props){
    const {label} = props
    return (
        <div className='Page'>
            <p>{label}</p>
        </div>
    )
}






export default TOC
