import React, { Component } from 'react';

class KenModal extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() { 
        return (
            <div className="kenModal" style={this.props.styles}>
                <div className="kenModal-inner">
                    <div className="km-title">
                        { this.props.title }
                    </div>
                    <div className="km-body">
                        { this.props.children }
                    </div>
                    <div className="km-footer">
                        <p>{ this.props.footer }</p>
                    </div>
                    <i className="fas fa-times-circle km-close" onClick={this.props.onClose}></i>
                </div>
            </div>
        );
    }
}
 
export default KenModal;