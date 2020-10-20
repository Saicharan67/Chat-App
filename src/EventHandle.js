import React, { Component } from 'react'

 class EventHandle extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             msg:"hello"
        }
    }
     eventclick =  () => {
       console.log(this)
        
       
       
    }
    render() {
        console.log(this)
        return (
            <div>
                <p>{this.state.msg}</p>
                <button onClick={this.eventclick}>btn</button>
            </div>
        )
    }
}

export default EventHandle
