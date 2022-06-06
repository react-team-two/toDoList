import React from "react";
import attach from "../images/attach.png";

class ListTasks extends React.Component{
    constructor(props){
        super(props);
        this.state={
            taskValue:this.props.element,
            isEdit:false
        }
    }
    handelEdit=()=>{
        this.setState({isEdit:true})
    }
    handelCancel=()=>{
        this.setState({isEdit:false});
        console.log(this.props.tasks);
    }
    handleChange=(event)=>{
        this.setState({taskValue: event.target.value});
        console.log(this.state.taskValue)
    }
    handelUpdate=()=>{
        this.setState({isEdit:false});
        this.props.changeTasks(this.state.taskValue,this.props.index);
    }
    render(){
        return(
            <div className="listItem">
               {this.state.isEdit?
                    <div className="box">
                    <div>
                    <input value={this.state.taskValue} onChange={(event)=>this.handleChange(event)}/> 
                    </div>
      
                    <div>
                    <button className="btnUpdate" onClick={this.handelUpdate}>Update</button>
                    <button className="btnCancel" onClick={this.handelCancel}>Cancel</button>
                    </div>
                    
                  </div>
                  
                  :
                  <div className="box">
                  <div>
                    <p>
                      <input type={"checkbox"} /> { this.state.taskValue}
                    </p>
                  </div>
    
                  <div>
                    <button className="btnEdit" onClick={this.handelEdit} >edit</button>
                    <button className="btnDelete" onClick={() =>{this.props.delete(this.props.index)} }>delete</button>
                  </div>
                  
                </div>          
                } 
            <img className="attach" src={attach} alt="attach" />
          </div>            
        );
    }
}

export default ListTasks;