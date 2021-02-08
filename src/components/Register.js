import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import url from '../config/url'

export default class Register extends Component {
    constructor(props){
        super(props)

        this.state={
            passwordMatch: null,
            regConf: null
        }
        this.user={role: "customer"}
        this.fields={}
    }

    readInput(event, key){
        this.user[key]= event.target.value
        this.fields[key]=event.target

        if(key==="cpassword"){
            if(
                this.user.cpassword !== undefined &&
                this.user.password !== undefined &&
                this.user.cpassword === this.user.password
            ){
                this.setState({ passwordMatch :true })
            }else{ this.setState({ passwordMatch: false }) }
        }
    }

    

    register(){
        if(this.state.passwordMatch === true){
        delete this.user.cpassword

        fetch(url.BASE_URL + url.REGISTRATION_URL, {
            method: "POST",
            body: JSON.stringify(this.user),
            headers: {"Content-Type": "application/json"}
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({regConf: true})
            this.user={role: "customer"}
            this.fields.name.value = ""
            this.fields.email.value = ""
            this.fields.password.value = ""
            this.fields.cpassword.value = ""
            this.fields.country.value = ""
            this.fields.age.value = ""
            this.fields.weight.value = ""
            console.log(data)
            
        })
        .catch(err=>console.log(err))
        }
    }

    render() {
        return (
            <div className="container border rounded p-3" style={{marginTop: "3rem"}} >
                <h1>Register Page</h1>
                
                <div className="container-fluid mt-4 w-75 p-3">
                {
                    this.state.regConf ? (
                        <div className="alert alert-success">Registration Successful</div>
                    ): null
                }
                    <div className="form-group mt-3">
                        <input 
                        type="text" 
                        placeholder="Name" 
                        className="form-control"
                        onChange={(event)=> this.readInput(event, "name")}/>
                    </div>
                    <div className="form-group mt-3">
                        <input 
                        type="text" 
                        placeholder="Email" 
                        className="form-control"
                        onChange={(event)=> this.readInput(event, "email")}/>
                    </div>
                    <div className="form-group mt-3">
                        <input 
                        type="password" 
                        placeholder="Password" 
                        className="form-control"
                        onChange={(event)=> this.readInput(event, "password")}/>
                    </div>
                    <div className="form-group mt-3">
                        <input 
                        type="password" 
                        placeholder="Confirm Password" className="form-control"
                        onChange={(event)=> this.readInput(event, "cpassword")}/>
                    </div>
                    {
                        this.state.passwordMatch===false ? (
                            <div className="alert alert-danger">
                                Passwords dont match
                            </div>
                        ) : null
                    }
                    <div className="form-group mt-3">
                        <input 
                        type="number" 
                        placeholder="Age" 
                        className="form-control"
                        onChange={(event)=> this.readInput(event, "age")}/>
                    </div>
                    <div className="form-group mt-3">
                        <input 
                        type="text" 
                        placeholder="Country" 
                        className="form-control"
                        onChange={(event)=> this.readInput(event, "country")}/>
                    </div>
                    <div className="form-group mt-3">
                        <input 
                        type="number" 
                        placeholder="Weight" 
                        className="form-control"
                        onChange={(event)=> this.readInput(event, "weight")}/>
                    </div>
                    <div className="d-flex align-items-center justify-content-between p-2  ml-auto">
                        <button onClick={()=>this.register()} className="btn btn-primary">Register</button>
                        <div className="d-flex flex-column align-items-center  ">
                        Already an user? <Link to="/login">Login here.</Link>   
                        </div>
                        
                    </div>
                </div>

            </div>
        )
    }
}
