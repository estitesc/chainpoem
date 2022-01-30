import React from 'react';
import _ from 'lodash';
import {
  Link
} from "react-router-dom";

const Navbar = ({account, poemCount, poemId}) => {
  const poems = new Array(poemCount).fill(undefined);

  const renderPoemList = React.useCallback(() => {
    return poems.map((_poem, index) => {
      return (
        poemId == index ?
        <span>{index}</span>
        :
        <Link to={`/${index}`}>{index}</Link>
      );
    });
  }, [poems]);

    return (
      <nav style={{backgroundColor: '#150F09', fontFamily: 'monospace'}}>
        <div style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: "16px 24px"}}>
          <div>{renderPoemList()}</div>
          <a style={{color: "#F9F7F5"}}><span >{_.truncate(account, {length: 12, omission: '…'})}</span></a>
        </div>
      </nav>
    );
}

export default Navbar;