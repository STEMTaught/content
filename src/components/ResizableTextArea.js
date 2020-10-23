import React from 'react';

// https://codepen.io/liborgabrhel/pen/eyzwOx

class ResizableTextarea extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			rows: 1,
			lineHeight: 23
		};

		this.myRef = React.createRef()
		this.updateRows = this.updateRows.bind(this)
	}
	
	updateRows(event){
		const element = event ? event.target : this.myRef.current
		
		const previousRows = element.rows
  	    element.rows = 1
		const currentRows = ~~(element.scrollHeight / this.state.lineHeight)
		if (currentRows === previousRows) {
			element.rows = currentRows
		}

		this.setState({
			value: element.value,
			rows: currentRows
		})
	}


	handleChange = (event) => {
		this.updateRows(event)
		if (this.props.onChange) this.props.onChange(event)
	};

	componentDidMount(){
		this.updateRows()
	}
	
	render() {
		return (
			<textarea
				rows={this.state.rows}
				value={this.props.value || this.state.value}
				placeholder={this.props.placeholder || 'Enter your text here...'}
				className={'ResizableTextArea ' + (this.props.className || '')}
				onChange={this.handleChange}
				ref={this.myRef}
				onKeyDown={this.props.onKeyDown}
				index={this.props.index}
			/>
		)
	}
}

export default ResizableTextarea;