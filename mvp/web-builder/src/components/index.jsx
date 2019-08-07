import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import jsonData from '../db.json';
import Row from './row';
import Column from './column';
import KenModal from './kenmodal';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            modalState: {
                styles: { display: "none" },
                title: "",
                body: ""
            },
            editorState: EditorState.createEmpty()
        }
           
        this.closeModal = this.closeModal.bind(this);
        this.addRow = this.addRow.bind(this);
        this.editRow = this.editRow.bind(this);
        this.removeRow = this.removeRow.bind(this);

        this.addColumn = this.addColumn.bind(this);
        this.editColumn = this.editColumn.bind(this);
        this.removeColumn = this.removeColumn.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.onEditorStateChange = this.onEditorStateChange.bind(this);
    }

    componentDidMount() {
        // fetch('https://my-json-server.typicode.com/kenavila11/mydb/db')
        //     .then(res => res.json())
        //     .then(data => {
        //         this.setState({ rows: data.rows });
        //     });
        this.setState({ rows: jsonData.rows });
    }

    render() { 

        console.log(this.state.rows);

        console.log(this.state.editorState);

        const convertToDom = (content) => {
            return <div className="content" dangerouslySetInnerHTML={{__html: content}}></div>;
        }

        const { editorState } = this.state
        return (
            <div className="container">
                <button onClick={ this.addRow }>Add Row</button>
                { this.state.rows.map(row => 
                    <Row 
                        key={row.id} 
                        attr={row}
                        onEdit={this.editRow}
                        onRemove={this.removeRow}>
                            {row.columns.map( col =>  
                                <Column 
                                    key={col.id} 
                                    attr={col}
                                    rowId={row.id}
                                    onEdit={this.editColumn}
                                    onRemove={this.removeColumn}>
                                        { convertToDom(col.content) }
                                </Column>    
                            )}
                    </Row>
                )}
                <KenModal 
                    styles={this.state.modalState.styles}
                    title={this.state.modalState.title}
                    onClose={this.closeModal}>
                        <Editor
                                editorState={editorState}
                                onEditorStateChange={this.onEditorStateChange}
                                wrapperClassName="wrapper-class"
                                editorClassName="editor-class"
                                toolbarClassName="toolbar-class"
                                editorStyle={ {backgroundColor: "#fff", padding: "0px 15px", maxHeight: "150px"} }
                                />
                        {this.state.modalState.body}
                </KenModal>
            </div>
        );
    }

    onEditorStateChange(editorState) {
        this.setState({
          editorState,
        });
    };

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

    editRow(row) {

        const rowId = row.id;
        const widthOpts = [];
        for(let i = 1; i <= 12; i++ ) { widthOpts.push(<option key={i} value={i}>{i}</option>) }
        this.setState({
            modalState: {
                styles: { display: "block" },
                title: <h4>Editing Row ID: {rowId}</h4>,
                body: <div>
                        <label>Column</label>
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label-sm">Width</label>
                            <div className="col-sm-2">
                                <select name="columnWidth" onChange={this.handleChange} defaultValue="1" className="form-control form-control-sm" id="columnWidth">
                                    {widthOpts}
                                </select>
                            </div>
                            <div className="col-sm-8">
                                <button 
                                    className="btn btn-sm btn-primary" 
                                    onClick={() => this.addColumn(rowId)}
                                    >Add Column</button>
                            </div>
                        </div>
                    </div>
            }
        })
    }

    removeRow(row) {

        const rowId = row.id;
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
    }

    editColumn(rowId, col) {
        
        const colId = col.id;
        const widthOpts = [];
        for(let i = 1; i <= 12; i++ ) { widthOpts.push(<option key={i} value={i}>{i}</option>) }

        const { editorState } = this.state;
        
        this.setState({
            modalState: {
                styles: { display: "block" },
                title: <h4>Editing Colum ID: {colId} of Row ID: {rowId}</h4>,
                body: <div>
                        <div className="form-group">
                            <label>Width</label>
                            <select name="columnWidth" onChange={this.handleChange} defaultValue={col.width} className="form-control form-control-sm" id="columnWidth">
                                {widthOpts}
                            </select>
                        </div>
                        <div className="form-group">
                            <button 
                                className="btn btn-sm btn-primary" 
                                onClick={() => {
                                    const colWidth = parseInt(document.getElementById("columnWidth").value);
                                    this.setState({
                                        rows: this.state.rows.map(row => {
                                            if(row.id === rowId){
                                                const cols = [...row.columns];
                                                const c = cols.filter(col => col.id === colId);
                                                const i = cols.indexOf(c.pop());
                                                cols[i]["width"] = colWidth;
                                                cols[i]["content"] = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
                                                return Object.assign({}, row, { "columns": [...cols] });
                                            }else{
                                                return row;
                                            }
                                        })
                                    })
                                }}
                                >Update Column</button>
                                {/* <button onClick={() => {
                                    console.log(draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())));
                                }}>KEN</button> */}
                        </div>
                    </div>
            }
        })
    }

    removeColumn(rowId, col) {

        const colId = col.id;
        this.setState({
            rows: this.state.rows.map(function(row) {
                if(row.id === rowId) {
                    let currentCols = (row.columns) ? row.columns : [];
                    let filteredCols = currentCols.filter(col => col.id !== colId);
                    return Object.assign({}, row, { "columns": [...filteredCols] });
                }else{
                    return row;
                }
            })
        })
    }

    handleChange() {

    }
}
 
export default Index;