import React, { Component } from 'react';

class Register extends Component{

  constructor(props){
    super(props);
    this.state ={
      regName:'',
      regEmail: '',
      regPassword: ''
    };
  }

  onNameChange = (event) =>{
    this.setState({regName: event.target.value});
  }

  onEmailChange = (event) =>{
    this.setState({regEmail: event.target.value});
  }

  onPasswordChange = (event) =>{
    this.setState({regPassword: event.target.value});
  }

  onSubmitRegister= () =>{

    fetch('https://dry-beach-24784.herokuapp.com/register',{
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
          name: this.state.regName,
          email: this.state.regEmail,
          password: this.state.regPassword
      })
    })
      .then(response => response.json())
      .then(user =>{
          if(user.id){
            this.props.loadUser(user);
            this.props.onRouteChange('home')
          }
      })

    
  }

  render(){
      return(
         <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 black-80">
                  <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                      <legend className="f1 fw6 ph0 mh0">Register</legend>
                      <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="uname">Name</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="uname"  
                            id="uname"
                            onChange={this.onNameChange} 
                            />
                      </div>
                      <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address" 
                            onChange={this.onEmailChange}
                            />
                      </div>
                      <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password" 
                            onChange= {this.onPasswordChange}
                            />
                      </div>
                    </fieldset>
                    <div className="">
                      <input 
                        onClick={this.onSubmitRegister}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register"/>
                    </div>
                  </div>
                </main>
            </article>
    );
  }

}

export default Register;