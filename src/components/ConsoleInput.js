import React from 'react';
import './ConsoleInput.css';

const ConsoleInput = ({onChange, onSubmit}) => {
    const [value, setValue] = React.useState("");

    const handleKeyPress = (e) => {
        if(e.code === 'Enter') {
            onSubmit();
            return;
        }

        let newVal = value;

        if(e.code === 'Backspace') {
            newVal = value.substring(0, value.length - 1);
        }

        if(value.length <= 36) {
            if(e.key.length === 1) {
                newVal = `${value}${e.key}`;
            }
            
            if(e.code === 'Space') {
                newVal = `${value} `
            }
        }

        if(newVal !== value) {
            setValue(newVal);
            onChange(newVal);
        }
      }

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);
    
    return (
      <div style={{display: 'flex', height: 20}}>
          <span style={{whiteSpace: 'pre'}}>{value}</span>
        <div className='blinking' style={{ width: 10, height: 20, backgroundColor: 'white'}} />
      </div>
    );
}

export default ConsoleInput;