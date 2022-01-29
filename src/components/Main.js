import * as React from 'react';
import ConsoleInput from './ConsoleInput';
import BasicInput from './BasicInput';

const width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;
const isDesktop = width >= 768;

const Main = ({lines, addLine}) => {
    const [content, setContent] = React.useState("");

    const submitLine = React.useCallback(() => {
      addLine(content);
    },[addLine, content]);

    return (
      <div 
        id="content" 
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection:'column', 
          width: '100%'
        }}>
        <div>
        <div id="poem">
          { lines.map((line, key) => {
            return(
              <div key={key}>{line.content}</div>
            )
          })}
        </div>
        {
          isDesktop ?
          <>
            <ConsoleInput onChange={(value)=>{setContent(value)}} onSubmit={submitLine} />
            <div style={{fontSize: 10, marginTop: 24}}>
              Press "Enter" to submit line
            </div>
          </>
          :
          <div style={{display: 'flex', flexDirection: 'column', marginTop: 12}}>
            <BasicInput onChange={(value)=>{setContent(value)}} />
            <button 
              onClick={submitLine} 
              style={{
                marginTop: 12, 
                backgroundColor: '#7A401F', 
                borderWidth: 0, 
                borderRadius: 4,
                color: '#F9F7F5',
                fontWeight: 'bold',
                padding: '6px 0',
                }}
              >
                Submit Line
              </button>
          </div>
        }
        </div>
      </div>
    );
}

export default Main;