import React from 'react';

class ImageEditor extends React.Component{
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
        //console.log('data',this.props.data)

        const image = this.props.data.url
            ? <img src={this.props.data.url} alt={this.props.data.description || ''}/>
            : ''

        return (
            <div className='ImageEditor'>
                {image}
                <div>
                    <input type='text' placeholder='Description' onChange={this.handleChange} value={this.props.data.description}/>    
                    <input className='url' type='url' placeholder='Photo URL' onChange={this.handleChange} value={this.props.data.url}/>
                </div>
            </div>
        )
    }
}

export default ImageEditor;
