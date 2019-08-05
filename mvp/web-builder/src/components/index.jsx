import React, { Component } from 'react';
import Row from './row';

class Index extends Component {
    state = {
        rows: [
            { 
                id: 1,
                columns: 2,
                class: "My row"
            },{ 
                id: 2,
                columns: 4,
                class: "My row"
            },{ 
                id: 3,
                columns: 3,
                class: "My row"
            },
        ]
    }


    render() { 
        return (
            <div className="container">
                { this.state.rows.map(row => <Row key={row.id} />) }
            </div>
        );
    }
}
 
export default Index;