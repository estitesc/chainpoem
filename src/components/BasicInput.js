import * as React from 'react';

const BasicInput = ({onChange}) => {
    const [val, setVal] = React.useState("");
    
    return (
        <input 
            value={val}
            onChange={(e) => {
                const value = e.target.value;
                setVal(value);
                onChange(value);
            }} 
        />
    );
}

export default BasicInput;