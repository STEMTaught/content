import React from 'react';


class TextBlock extends React.Component{
    getInfo(content){
        // virtual element to make data collection easier
        let element = document.createElement("DIV")
        element.innerHTML = content

        let finalData = []

        const recursive = (element, type='', style={}) => {
            //////console.log('STYLE:', style, element)
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
                        
                        //////console.log('NS',newStyle, child)
                        recursive(child, '', newStyle)
                    }
                }
            )
        }

        recursive(element)
        ////console.log(finalData)
        return finalData
    }

    


    render() {
        let content = []
        
        this.getInfo(this.props.data.text).map(
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
                    //console.log('style',style)
                    section.style = style
                    content[content.length-1].elements.push(
                        section
                    )
                }
            }
        )



        const contentToRender = content.map(
            p => {
                //console.log(p.style)
                const elements = p.elements.map( section => {
                    //console.log('style', section.style)
                    return <span style={section.style} key={section.text + `${Math.floor(Math.random()*9999)}`}>{section.text}</span>
                })
                return <p style={p.style} key={`${Math.floor(Math.random()*9999)}`}>{elements}</p>
            }
        )

        

        return (
          <div className='TextBlock'>
                {contentToRender}
          </div>
        );
      }
}



  

export default TextBlock;
