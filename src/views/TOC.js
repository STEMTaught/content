import React from 'react'
import IconButton from '../components/IconButton'

class TOC extends React.Component {
    constructor(props){
        super(props)

        this.updateSelected = this.updateSelected.bind(this)
    }
    
    addPage(grade, unit){
        console.log('add page', grade, unit)
    }



    updateSelected(grade, unit, page){
        this.props.updateData({
                pages:this.props.pages,
                selected:[grade, unit, page]
            })
    }


    render() {
        const {selected, pages} = this.props
        const [sgrade, sunit, spage] = selected
        
        const toReturn = Object.keys(pages).map(
            grade => {
                const label = `Grade ${grade}`
                
                const units = Object.keys(pages[grade]).map(
                    unit =>{
                        const pagesToRender = pages[grade][unit].map(page => {
                            const selected = (grade == sgrade && unit == sunit && page == spage)
                            const handleClick = () => this.updateSelected(grade, unit, page)
                            return <Page label={page} selected={selected} handleClick={handleClick}/>
                        })
                        
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
    const {label, selected, handleClick} = props
    return (
        <div className={'Page ' + (selected ? 'selected' : '')} onClick={() => handleClick()}>
            <p>{label}</p>
        </div>
    )
}






export default TOC
