import React from 'react'
import { Editor as Tiny } from '@tinymce/tinymce-react';



///////////////////////////////////////////
// EDITOR
///////////////////////////////////////////

class Test extends React.Component{
    constructor(props){
        super(props)
        
        this.state = {html:'<p><span style="color: #288dfa;"><span style="background-color: #ccc;">hello</span></span> </span>world</p>'}
        
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(event = 0){
        console.log(event)

        const words='"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'.split(' ')

        const toRender = words.map(
            (word, index) => {
                return (index === event)
                    ? '<span style="background-color: #288dfa;">'+word+'</span>'
                    : word
            }
        )

        this.setState({html:'<p>'+toRender.join(' ')+'</p>'})
        
        setTimeout(() => {
            this.handleChange(event+1)
        }, 1000);
    }



    componentDidMount(){
        this.handleChange(0)
    }
    
    render(){
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
                //onEditorChange={this.handleChange}
                value={this.state.html}
                init={settings}
                />
            </div>
          );
    }
}




export default Test