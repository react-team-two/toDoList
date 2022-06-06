import React from "react";
import './App.css'

class Task extends React.Component  {
    constructor(props) {
        super(props);
       
      }
    render() { 
        if (this.props.selected){
        return (
            <p style={{textDecoration:"line-through"}}>{this.props.element} </p>

        );
    }else{
        return( <p >{this.props.element} </p>)
    }
    }
}
 
export default Task;




