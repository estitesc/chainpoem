import React from 'react';
import _ from 'lodash';

const Navbar = ({account}) => {
    return (
      <nav style={{backgroundColor: '#150F09', fontFamily: 'monospace'}}>
        <div style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'right'}}>
          <a style={{color: "#F9F7F5", padding: "16px 24px"}}><span >{_.truncate(account, {length: 12, omission: '…'})}</span></a>
        </div>
      </nav>
    );
}

export default Navbar;