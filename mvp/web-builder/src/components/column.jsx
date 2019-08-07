import React, { Component } from 'react';

class Column extends Component {
    
    columnStyles = {
        border: "2px dashed #ddd",
        position: "relative"
    }

    render() { 
        return (
            <div className={"col-md-"+this.props.attr.width}>
                <div style={ this.columnStyles }>
                    Ken Avila
                    <div className="colOptions">
                        <span 
                            className="badge badge-sm badge-secondary editCol" 
                            onClick={() => this.props.onEdit(this.props.attr.id)}
                            ><i class="fas fa-edit"></i></span>
                        <span 
                            className="badge badge-sm badge-danger removeCol" 
                            onClick={() => this.props.onRemove(this.props.attr.id)}
                            ><i class="fas fa-minus"></i></span>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Column;