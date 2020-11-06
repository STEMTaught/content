import React from 'react'

class TOC extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            grade: '',
            unit: '',
            page: '',
        }
    }
    
    
    render() {
        const {_grade, _unit, _page} = this.state

        const data = {
            0: {
                'unit 1': [1,2,3,4,5],
                'unit 2': [1,2,3,4],
                'unit 3': [1,2,3,4,5,6,7],
            },
            1: {
                'unit 1': [1,2,3,4,5],
                'unit 2': [1,2,3,4],
                'unit 3': [1,2,3,4,5,6,7],
            },
            2: {
                'unit 1': [1,2,3,4,5],
                'unit 2': [1,2,3,4],
                'unit 3': [1,2,3,4,5,6,7],
            }
        }


        let toReturn


        toReturn = Object.keys(data).map(
            grade => {
                const label = `Grade ${grade}`

                const units = Object.keys(data[grade]).map(
                    unit =>{
                        const pages = data[grade][unit].map(page => <Page label={page}/>)
                        
                        return (
                            <Unit label={unit}>
                                {pages}
                            </Unit>
                        )
                    }
                )

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





function Grade(props){
    const {label} = props
    return (
        <div className='Grade'>
            <p>{label}</p>
            {props.children}
        </div>
    )
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
