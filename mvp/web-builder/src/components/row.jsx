import React, { Component } from 'react';
import Column from './column';

class Row extends Component {

    rowStyles = {
        padding: "15px 0px",
        position: "relative",
        border: "2px dashed #ddd",
        marginTop: "5px"
    }

    render() { 
        const cols = [];
        // const columns = this.props.attr;
        // columns.width = 12 / columns.columns;
        // for (let i = 0; i < columns.columns; i++) {
        //     cols.push(<Column key={i} attr={columns}/>);
        // }
        console.log(this.props.attr);

        return (
            <div className="row" style={this.rowStyles}>
                { this.props.attr.columns.map(col => 
                    <Column 
                        key={col.id} 
                        attr={col}
                        />
                )}
                <div className="rowOptions">
                    <span 
                        className="badge badge-sm badge-secondary editRow" 
                        onClick={() => this.props.onEdit(this.props.attr.id)}
                        >Edit</span>
                    <span 
                        className="badge badge-sm badge-danger removeRow" 
                        onClick={() => this.props.onRemove(this.props.attr.id)}
                        >Remove</span>
                </div>
            </div>
        );
    }
}
 
export default Row;