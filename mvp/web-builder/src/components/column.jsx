import React, { Component } from 'react';

class Column extends Component {
    
    columnStyles = {
        ...this.props.attr.styles
    }

    render() { 
        return (
            <div className={"col-md-"+this.props.attr.width}>
                <div style={ this.columnStyles } className="columnInner">
                    { this.props.children }
                    <div className="colOptions">
                        <span 
                            className="badge badge-sm badge-secondary editCol"
                            elementtype="column" 
                            onClick={() => this.props.onEdit(this.props.rowId, this.props.attr)}
                            ><i className="fas fa-edit"></i></span>
                        <span 
                            className="badge badge-sm badge-danger removeCol" 
                            elementtype="column"
                            onClick={() => this.props.onRemove(this.props.rowId, this.props.attr)}
                            ><i className="fas fa-minus"></i></span>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Column;