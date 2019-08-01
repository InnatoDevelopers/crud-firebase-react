import React, { Component } from 'react'
import firebase from 'firebase';
import {loginWithEmailAndPassword} from './code';



class Login extends Component {

    state = {
        emailL: "",
        password: "",
        user:false
    }

    componentWillMount(){
        this.listenerAuth();
    }

    listenerAuth = () =>{
        firebase.auth().onAuthStateChanged((user)=>{
 
            if(user){
                this.setState({user,emailL:"",password:""});
            }else{
                this.setState({user:false,emailL:"",password:""});
            }
        });
    }


    onChangeValues = (event) => {
        let { id, value } = event.target;

        this.setState({ [id]: value });
    }

    loginWithFirebase = (event) => {
        event.preventDefault();


        loginWithEmailAndPassword(this.state.emailL,this.state.password).then((user)=>{
           
            console.log(user.user);
            this.setState({user:user.user});
        }).catch((error)=>{
            console.log(error);
        });
    }

    logout = ()=>{
        firebase.auth().signOut();
    }

    render() {

        if(this.state.user){
            return (
                <div className="row">
                <div className="col s12 green ">
                    <h5 className="white-text">{this.state.user.email}</h5>
                </div>
                <div className="col s12 green ">
                 <button className="waves-effect waves-light btn"
                 onClick={this.logout}
                 >Salir</button>
                </div>
                </div>
            );
        
        }
        return (
            <div className="row">
                <div className="col s12 green ">
                    <h5 className="white-text">Login</h5>
                </div>

                <form className="col s12" onSubmit={this.loginWithFirebase}>
                <div className="row">
                        <div className="input-field col s12">
                            <input id="emailL" type="text" className="validate"
                                value={this.state.emailL}
                                onChange={this.onChangeValues}
                            />
                            <label htmlFor="emailL">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate"
                                value={this.state.password}
                                onChange={this.onChangeValues}
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                   


                    <div className="row">
                        <button className="waves-effect waves-light btn">Ingresar</button>
                    </div>
                </form>
            </div>
        )
    }



}


export default Login;