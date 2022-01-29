import React from 'react';
import './ConsoleInput.css';

const ConsoleInput = ({onChange, onSubmit}) => {
    const [value, setValue] = React.useState("");

    const handleKeyPress = (e) => {
        if(e.key.length === 1) {
            setValue(`${value}${e.key}`);
        }
        if(e.code === 'Backspace') {
            setValue(value.substring(0, value.length - 1));
        }
        if(e.code === 'Space') {
            setValue(`${value} `);
        }

        if(e.code === 'Enter') {
            onSubmit();
        } else {
            onChange(value);
        }
      }

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

          return () => document.removeEventListener('keydown', handleKeyPress);
    }, [value, setValue]);
    
    return (
      <div style={{display: 'flex', height: 20}}>
          <span style={{whiteSpace: 'pre'}}>{value}</span>
        <div className='blinking' style={{ width: 10, height: 20, backgroundColor: 'white'}} />
      </div>
    );
}

export default ConsoleInput;