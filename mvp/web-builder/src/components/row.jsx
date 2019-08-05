import React, { Component } from 'react';
import Column from './column';

class Row extends Component {
    // state = {  }
    render() { 
        return (
            <div className="row">
                <Column />
            </div>
        );
    }
}
 
export default Row;