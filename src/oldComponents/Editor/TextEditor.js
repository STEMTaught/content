import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class TextEditor extends React.Component{
    constructor(props) {
        super(props)
        this.state = { content: '' }
        this.handleEditorChange = this.handleEditorChange.bind(this)
    }

    handleEditorChange(content, editor) {
        this.setState({ content })
        this.props.updateBlock({text:content}, this.props.data.index[0])
    }

    componentDidMount(){
        this.setState({content:this.props.data.text})
    }

    render() {
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
          setup: function (editor) {
              editor.ui.registry.addGroupToolbarButton('alignment', {
                icon: 'align-left',
                tooltip: 'Alignment',
                items: 'alignleft aligncenter'
              })
            }
        }
    
        return (
          <div className='TextEditor'>
            <Editor
              apiKey='8ptrsx447dlk4ao6neygjzezitwnxg7kq92uvgecf5jtpkur'
              onEditorChange={this.handleEditorChange}
              initialValue={this.props.data.text}
              init={settings}
              />
          </div>
        );
      }
}



  

export default TextEditor;
