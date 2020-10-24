import React from 'react'
import { Editor as Tiny } from '@tinymce/tinymce-react';


class Text extends React.Component{
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
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(text){
        const {index} = this.props
        this.props.updateBlock({text:text}, index)
    }
    
    render(){
        const {text} = this.props.data
        const settings = {
            min_height: 200,
            autoresize_bottom_margin: 0,
            menubar: false,
            statusbar: false,
            plugins: "autoresize",
            toolbar:'fontsizeselect forecolor bold italic alignment',
            color_rows: "1",
            fontsize_formats: '12pt 14pt 16pt 20pt',
            custom_colors: false,
            color_map: [
              "000000", "Black",
              "288dfa", "Blue",
              "0CF574", "Green",
              "DB162F", "Red",
            ],
            content_style: "body { font-family: sans-serif; font-size: 14pt;}",
            setup: function (editor) {
                editor.ui.registry.addGroupToolbarButton('alignment', {
                  icon: 'align-left',
                  tooltip: 'Alignment',
                  items: 'alignleft aligncenter'
                })
              }
          }
      
          return (
            <div className='Text'>
              <Tiny
                apiKey='8ptrsx447dlk4ao6neygjzezitwnxg7kq92uvgecf5jtpkur'
                onEditorChange={this.handleChange}
                value={text}
                init={settings}
                />
            </div>
          );
    }
}





///////////////////////////////////////////
// CONTENT
///////////////////////////////////////////

class Content extends React.Component{
    getInfo(content){
        // virtual element to make data collection easier
        let element = document.createElement("DIV")
        element.innerHTML = content

        let finalData = []

        const recursive = (element, type='', style={}) => {
            Array.from(element.childNodes).map(
                (child) =>  {
                    const {textContent, nodeType} = child

                    // text
                    if (nodeType === 3){
                        finalData.push({type:'text', text:textContent, style:style})
                    }

                    // element
                    else if (nodeType === 1 && child.childNodes.length > 0){
                        let newStyle = {...style}

                        // get inline styles
                        if(child.attributes && child.attributes.style){
                            const inlineStyle = child.attributes.style.value
                            
                            if (inlineStyle){
                                inlineStyle.split(';').map(
                                    styles => {
                                        const [key,val] = styles.split(':')
                                        if (key && val) newStyle[key.trim()] = val.trim()
                                    }
                                )
                            }
                        }

                        if (child.nodeName === 'P') {
                            finalData.push({type:'paragraph', style:newStyle})
                            newStyle = {...style}
                        }
                        
                        // add style data for <strong> and <em> elements
                        else if (child.nodeName === 'STRONG')    newStyle['font-weight'] = 'bold'
                        else if (child.nodeName === 'EM')   newStyle['font-style'] = 'italic'
                        
                        recursive(child, '', newStyle)
                    }
                }
            )
        }

        recursive(element)
        return finalData
    }

    


    render() {
        let content = []
        const {text} = this.props.data        
        this.getInfo(text).map(
            section => {
                const s = section.style
                let style = {}
                
                // make sure the style names are react compatable
                Object.keys(s).map(
                    key => {
                        let tmp = key.split('-')
                        for (let i=1; i<=tmp.length-1; ++i){
                            tmp[i] = tmp[i].charAt(0).toUpperCase() + tmp[i].substr(1)
                        }
                        let propName = tmp.join('')
                        style[propName] = s[key]
                    }
                )


                if (section.type === 'paragraph'){
                    content.push(
                        {style:style, elements:[]}
                    )
                }

                else {
                    section.style = style
                    content[content.length-1].elements.push( section )
                }
            }
        )



        const contentToRender = content.map(
            p => {
                const elements = p.elements.map( section => {
                    return <span style={section.style} key={section.text + `${Math.floor(Math.random()*9999)}`}>{section.text}</span>
                })
                return <p style={p.style} key={`${Math.floor(Math.random()*9999)}`}>{elements}</p>
            }
        )

        

        return (
          <div className='Text'>
                {contentToRender}
          </div>
        );
      } 
}


export default Text