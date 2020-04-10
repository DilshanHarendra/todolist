import React, {Component, createRef} from "react";
import '../css/home.css'

class Home  extends Component{

    constructor() {
        super();
        this.state= {
            myEvent: "",
            error:"",
            updateId:"",
            eventName:"Add Event",
            isUpdate:false,
            toDoEvents: [],
            doneEvents: []
        }
        this.inputref= createRef();


    }

    deleteEvent(x){
        const index = this.state.toDoEvents.findIndex(allEvent => allEvent.id === parseInt(x));
        this.state.toDoEvents.splice(index,1);
        this.setState({
             toDoEvents: this.state.toDoEvents
         })

    }

    deleteDoneEvent(x){
        const index = this.state.doneEvents.findIndex(allDoneEvent => allDoneEvent.id === parseInt(x));
        this.state.doneEvents.splice(index,1);
        this.setState({
            doneEvents: this.state.doneEvents
        })

    }
    doneEvent(x){
        const index = this.state.toDoEvents.findIndex(allEvent => allEvent.id === parseInt(x));
        let doneEvent=this.state.toDoEvents.splice(index,1);
        this.setState({
            doneEvents:this.state.doneEvents.concat(doneEvent),
            toDoEvents: this.state.toDoEvents
        })
    }
    updateEvent(x,name){
        this.setState({
            isUpdate: true,
            updateId:x,
            eventName:"Update Event "+name
        })
    }

    updateBox(){
        if (this.state.isUpdate){
            return <div>
                    <button className="btn btn-success" type="submit">Update</button>
                    <div className="btn btn-danger" onClick={()=>{this.setState({isUpdate:false, error:"", eventName:"Add Event",myEvent: ""})}} type="submit">Cancel</div>
            </div>
        }else{
            return  <div><button className="btn btn-primary" type="submit">Add Event</button></div>;
        }


    }


    addNewEvent=e=>{
        this.setState({
            myEvent:e.target.value,
            error:""
        })

    }
    onSubmithandler=(e)=>{
        e.preventDefault();
        if (this.state.myEvent===""){
            this.setState({
                error:"Please Enter Event"
            })
            this.inputref.current.focus();
        }else{
            if (this.state.isUpdate){
                let updatedEvent={
                    name:this.state.myEvent,
                    id:parseInt(this.state.updateId)
                }
                var elementNumber = this.state.toDoEvents.findIndex(myevent=>myevent.id===parseInt(this.state.updateId));
                let tempEvents=this.state.toDoEvents;
                tempEvents[elementNumber]=updatedEvent;
                this.setState({
                    toDoEvents:tempEvents,
                    myEvent:"",
                    isUpdate:false,
                    eventName:"Add Event"
                })
                this.state.toDoEvents=updatedEvent;

            }else {
                let newEvent={
                    name:this.state.myEvent,
                    id:Date.now()
                }
                this.setState({
                    toDoEvents:[newEvent,...this.state.toDoEvents],
                    myEvent:""
                },()=>{ console.log("add"); console.log(this.state.toDoEvents);})
            }
        }





}

    render() {

        return <>
            <div className="jumbotron text-center">
                <h1>ToDo List</h1>
                <p>We will help you to mange your daily task.</p>
            </div>
            <div className="demo">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 box">
                            <form className="needs-validation" onSubmit={this.onSubmithandler} noValidate>
                                <div className="form-row">
                                    <label htmlFor="validationCustom01">{this.state.eventName}</label><br/>
                                    <input type="text" onChange={this.addNewEvent} className="form-control" id="validationCustom01"
                                           placeholder="Event" value={this.state.myEvent} ref={this.inputref} required/><br/>
                                    <label style={{'color':'red'}}>{this.state.error}</label><br/><br/>

                                </div>
                                {this.updateBox()}

                            </form>

                        </div>
                        <div className="col-md-4 box">
                            <label htmlFor="validationCustom01">ToDo</label><br/>
                            {this.state.toDoEvents.map(myevent=>(
                                <div className="polaroid" key={myevent.id} >

                                    <p className="event">{myevent.name} </p>
                                    <button className="donebtn" name="update"  onClick={()=>this.doneEvent(myevent.id)} >&#10003;</button>
                                    <button className="ebtn" name="update"  onClick={()=>this.updateEvent(myevent.id,myevent.name)} ><i className="fa fa-edit"></i></button>
                                    <button className="dbtn" name="delete" onClick={()=>this.deleteEvent(myevent.id)} ><i className="fa fa-trash"></i></button>
                                </div>
                            ))}

                        </div>
                        <div className="col-md-4 box">
                            <label htmlFor="validationCustom01">Done</label><br/>
                            {this.state.doneEvents.map(doneEvent=>(
                                <div className="polaroid" key={doneEvent.id} >

                                    <p className="event"><strike>{doneEvent.name} </strike></p>
                                    <p>&#128515;</p>
                                    <button className="dbtn" name="delete" onClick={()=>this.deleteDoneEvent(doneEvent.id)} ><i className="fa fa-trash"></i></button>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div><br/><br/><br/>
        </>;
    }
}
export default Home;