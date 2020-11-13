import React from 'react'
import IconButton from '../components/IconButton'

class TOC extends React.Component {
    constructor(props){
        super(props)
        this.updateSelected = this.updateSelected.bind(this)
        
    }
    
    addPage(grade, unit){
        const {pages} = this.props
        let newPages = pages
        newPages[grade][unit] += 1 
        this.props.updateData({pages:pages})
    }



    updateSelected(grade, unit, page){
        this.props.updateData({selected:[grade,unit,page]})
    }


    render() {
        const {selected, pages} = this.props
        const [sgrade, sunit, spage] = selected
        


        // grades
        const toReturn = Object.keys(pages).map(
            grade => {
                

                // units
                const units = Object.keys(pages[grade]).map(
                    unit => {

                        // pages
                        let pagesToRender = []
                        for (let page = 1; page <= pages[grade][unit]; page++){
                            const isSelected = (grade == sgrade && unit == sunit && page == spage)
                            const handleClick = () => this.updateSelected(grade, unit, page)
                            pagesToRender.push(
                                <Page label={page} selected={isSelected} handleClick={handleClick} key={unit+'-'+page}/>
                            )
                        }
                        
                        // add unit
                        return (
                            <Unit label={unit} key={unit}>
                                {pagesToRender}
                                <IconButton icon='add' className='addPage' handleClick={() => this.addPage(grade, unit)}/>
                            </Unit>
                        )
                    }
                )

            
                // add grade
               return <Grade label={'Grade ' + grade} key={grade}> {units} </Grade>
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
