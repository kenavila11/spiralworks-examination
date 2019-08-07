import React, { Component } from 'react';
import Row from './row';
import KenModal from './kenmodal';
import { parse } from '@babel/core';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            modalState: {
                styles: { display: "none" },
                activeRow: ""
            }
        }
           
        this.closeModal = this.closeModal.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.removeRow = this.removeRow.bind(this);

        this.addColumn = this.addColumn.bind(this);
    }

    componentDidMount() {
        fetch('https://my-json-server.typicode.com/kenavila11/mydb/db')
            .then(res => res.json())
            .then(data => {
                this.setState({ rows: data.rows });
            });
    }

    render() { 

        console.log(this.state.rows);
        return (
            <div className="container">
                <button onClick={ this.addRow }>Add Row</button>
                { this.state.rows.map(row => <Row 
                    key={row.id} 
                    attr={row}
                    onEdit={this.editRow}
                    onRemove={this.removeRow}
                />) }
                <KenModal 
                    styles={this.state.modalState.styles}
                    title={<h4>Editing Row ID: {this.state.modalState.activeRow}</h4>}
                    onClose={this.closeModal}>
                        <label>Column</label>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label-sm">Width</label>
                            <div className="col-sm-2">
                                <select name="columnWidth" className="form-control form-control-sm" id="columnWidth">
                                    <option value="12">12</option>
                                    <option value="6">6</option>
                                    <option value="4">4</option>
                                    <option value="3">3</option>
                                    <option value="2">2</option>
                                    <option value="1">1</option>
                                </select>
                            </div>
                            <div className="col-sm-8">
                                <button 
                                    className="btn btn-sm btn-primary" 
                                    onClick={() => this.addColumn(this.state.modalState.activeRow)}
                                    >Add Column</button>
                            </div>
                        </div>
                </KenModal>
            </div>
        );
    }

    closeModal() {
        this.setState({
            modalState: {
                styles: {
                    display: "none"
                }
            }
        });
    }

    addRow() {

        // fetch('https://my-json-server.typicode.com/kenavila11/mydb/rows', {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             "columns": document.getElementById("selectColumns").value,
        //             "class": "My row"
        //         }),
        //         headers: {
        //             "Content-type": "application/json; charset=UTF-8"
        //         }
        //     })
        //     .then(res => res.json())
        //     .then(data => {
        //         const d = data;
        //         this.setState(state => state.rows.push(d));
        //     })
        const lastRow = this.state.rows.slice(-1)[0];
        this.setState(state => state.rows.push({
            "id": ((lastRow) ? lastRow.id : 0) + 1,
            "columns": [],
            "class": "My row"
        }))
    }

    editRow(rowId) {
        this.setState({
            modalState: {
                styles: { display: "block" },
                activeRow: rowId
            }
        })
    }

    removeRow(rowId) {
        const newRows = this.state.rows.filter( row => row.id !== rowId );
        this.setState({ rows: newRows })
    }


    addColumn(rowId) {
        const colWidth = parseInt(document.getElementById("columnWidth").value);

        this.setState({
            rows: this.state.rows.map(function(row) {
                if(row.id === rowId) {
                    let currentCols = (row.columns) ? row.columns : [];
                    currentCols.push({
                        "id": ( currentCols.length ) ? currentCols.slice(-1)[0]["id"]+1 : 1, 
                        "width": colWidth
                    })
                    return Object.assign({}, row, { "columns": currentCols });
                }else{
                    return row;
                }
            })
        });
        
        // columns.width = 12 / columns.columns;
        // for (let i = 0; i < columns.columns; i++) {
        //     cols.push(<Column key={i} attr={columns}/>);
        // }
    }
}
 
export default Index;