import React from 'react';

class ImageContent extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        const {value, type} = event.target

        if (type === 'text'){
            this.props.updateBlock({description:value}, this.props.data.index[0])
        }

        else if (type === 'url'){
            this.props.updateBlock({url:value}, this.props.data.index[0])
        }
        //console.log(event.target.type)
    }

    render(){

        const image = this.props.data.url
            ? <img src={this.props.data.url} alt={this.props.data.description || ''}/>
            : ''

        const desc = this.props.data.description
            ? <h5>{this.props.data.description}</h5>
            : ''

        return (
            <div className='ImageBlock'>
                {image}
                {desc}
            </div>
        )
    }
}

export default ImageContent;
