import React from 'react';
import IconButton from '../IconButton'
import ResizableTextarea from '../ResizableTextArea'
//question:'', answers:[], correctIndex:0
class QuestionEditor extends React.Component{
    constructor(props){
        super(props)
        this.updateQuestion = this.updateQuestion.bind(this)
        this.updateAnswer = this.updateAnswer.bind(this)
        this.addAnswer = this.addAnswer.bind(this)
    }


    updateQuestion(event){
        const value = event.target.value
        this.props.updateBlock({question:value}, this.props.data.index[0])
    }

    updateAnswer(event, index){
        const newAnswer = event.target.value
        let newAnswers = this.props.data.answers

        const removeEmpty = () => newAnswers.splice(index, 1)

        if (newAnswer === ''){
            if (index <= newAnswers.length-1 && newAnswers.length > 1) removeEmpty()
            else newAnswers[index] = newAnswer
        }
        else newAnswers[index] = newAnswer
        
        this.props.updateBlock({answers:newAnswers}, this.props.data.index[0])
    }





    addAnswer(){
        let newAnswers = this.props.data.answers
        newAnswers.push('')
        console.log('adding answer')
        this.props.updateBlock({answers:newAnswers}, this.props.data.index[0])
    }

    render(){
        const {question, answers, correct} = this.props.data

        const answersToRender = answers.map(
            (text, index) => 
                <Answer 
                    text={text} 
                    updateAnswer={this.updateAnswer} 
                    index={index} 
                    addAnswer={this.addAnswer} 
                    key={index}/>
            )

        return (
            <div className='QuestionEditor'>
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
            this.props.addAnswer()
        }
        else if (key === 'Backspace') {
            if (event.target.value === '') event.preventDefault()
            this.props.updateAnswer(event, this.props.index)
        }
    }

    render(){
        const text = this.props.text || ''
        return (
            <div className='Answer'>
                <IconButton icon='radio_button_unchecked'/>
                <ResizableTextarea 
                    placeholder='Answer' 
                    onChange={event => this.props.updateAnswer(event, this.props.index)} 
                    value={text}
                    onKeyDown={this.handleKeyDown}
                    index={this.props.index}
                />  
            </div>
        )
    }
}




export default QuestionEditor;
