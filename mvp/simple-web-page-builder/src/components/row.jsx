import React, { Component } from 'react';

class Row extends Component {

    rowStyles = {
        padding: "15px 0px",
        position: "relative",
        outline: "2px dashed #ddd",
        marginTop: "10px"
    }

    render() { 
        // const cols = [];
        // const columns = this.props.attr;
        // columns.width = 12 / columns.columns;
        // for (let i = 0; i < columns.columns; i++) {
        //     cols.push(<Column key={i} attr={columns}/>);
        // }

        return (
            <div className="row" style={this.rowStyles}>
                { this.props.children }
                <div className="rowOptions">
                    <span 
                        className="badge badge-sm badge-secondary editRow" 
                        elementtype="row"
                        onClick={() => this.props.onEdit(this.props.attr)}
                        >Edit</span>
                    <span 
                        className="badge badge-sm badge-danger removeRow" 
                        elementtype="row"
                        onClick={() => this.props.onRemove(this.props.attr)}
                        >Remove</span>
                </div>
            </div>
        );
    }
}
 
export default Row;