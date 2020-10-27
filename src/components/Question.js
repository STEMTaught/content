import React from 'react'
import IconButton from './IconButton'
import ResizableTextarea from './ResizableTextArea'

class Question extends React.Component{
    render(){
        const {edit, index, data, updateBlock} = this.props

        return edit
            ? <Editor data={data} index={index} updateBlock={updateBlock}/>
            : <Content data={data}/>
    }  
}


///////////////////////////////////////////
// EDITOR
///////////////////////////////////////////

class Editor extends React.Component{
    constructor(props){
        super(props)
        this.updateQuestion = this.updateQuestion.bind(this)
        this.updateAnswer = this.updateAnswer.bind(this)
        this.addAnswer = this.addAnswer.bind(this)
        this.markCorrect = this.markCorrect.bind(this)
    }

    updateQuestion(event){
        const {index} = this.props
        const {value} = event.target
        this.props.updateBlock({question:value}, index)
    }

    updateAnswer(event, answerIndex){
        const {index} = this.props
        let {answers} = this.props.data
        const {value} = event.target

        if (value === '' && index <= answers.length-1 && answers.length > 1) answers.splice(answerIndex, 1)
        else answers[answerIndex] = value
        
        this.props.updateBlock({answers:answers}, index)
    }

    addAnswer(event, answerIndex){
        const {index} = this.props
        let {answers} = this.props.data
        answers.splice(answerIndex+1, 0, '')
        this.props.updateBlock({answers:answers}, index)
    }

    markCorrect(answerIndex){
        const {index} = this.props
        this.props.updateBlock({correctIndex:answerIndex}, index)
    }
    
    
    render(){
        const {question, answers, correctIndex} = this.props.data
        
        const answersToRender = answers.map(
            (answer, answerIndex) => {
                return <Answer answer={answer} updateAnswer={this.updateAnswer} addAnswer={this.addAnswer} markCorrect={this.markCorrect} correctIndex={correctIndex} answerIndex={answerIndex}/>
            }
        )
        
        return ( 
            <div className='Quiz'>
                <ResizableTextarea className='Question' placeholder='Question' onChange={this.updateQuestion} value={question}/>
                {answersToRender}
            </div>
        )
    }
}


class Answer extends React.Component{
    constructor(props){
        super(props)
        this.handleKeyDown = this.handleKeyDown.bind(this)
    }

    handleKeyDown(event){
        const {key} = event
        if (key === 'Enter') {
            event.preventDefault()
            this.props.addAnswer(event, this.props.answerIndex)
        }
        else if (key === 'Backspace') {
            if (event.target.value === '') {
                event.preventDefault()
                this.props.updateAnswer(event, this.props.answerIndex)
            }
        }
    }

    render(){
        const {answer, updateAnswer, answerIndex, correctIndex, markCorrect} = this.props
        const icon = correctIndex === answerIndex ? 'radio_button_checked' : 'radio_button_unchecked'

        return (
            <div className='Answer'>
                <IconButton icon={icon} handleClick={() => markCorrect(answerIndex)}/>
                <ResizableTextarea placeholder='Answer' onChange={event => updateAnswer(event,answerIndex)} value={answer} onKeyDown={this.handleKeyDown}/>
            </div>
            
        )
    }
}


///////////////////////////////////////////
// CONTENT
///////////////////////////////////////////

class Content extends React.Component{
    render(){
        const {question, answers} = this.props.data

        const answersToRender = answers.map(
            answer => {
                return (
                    <div className='Answer'>
                        <IconButton icon='radio_button_unchecked'/>
                        <p>{answer}</p>
                    </div>
                )
            }
            )
            
            return (
                <div className='Quiz'>
                <h3>{question}</h3>
                <br/>
                {answersToRender}
            </div>
        )
    }
}


export default Question