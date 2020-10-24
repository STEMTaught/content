import React from 'react'
import BlockSet from './BlockSet'


class Page extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            blocks: [
                {
                    type:'image',
                    data:{
                        url:'',
                        description:''
                    }
                }, {
                    type:'text',
                    data:{
                        text:''
                    }
                }, 
            ]
        }
        this.updateData = this.updateData.bind(this)
    }


    updateData(newData){
        this.setState(newData)
    }


    render(){
        return(
            <div className='Page'>
                <BlockSet 
                    blocks={this.state.blocks}
                    updateData={this.updateData}
                    edit={true}
                />

                <BlockSet 
                    blocks={this.state.blocks}
                    edit={false}
                />
            </div>
        )
    }
}


export default Page


