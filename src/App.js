import React, { Component } from 'react';
import M from 'materialize-css';
import { addPerson, updatePerson } from './code';
import ListUsers from './ListUsers';
import Login from './login.cmpt';


class App extends Component {

  state = {
    apellido: "",
    nombre: "",
    email: "",
    telefono: "",
    id: false
  }


  componentDidMount() {
    M.updateTextFields();
  }


  onChangeValues = (event) => {
    let { id, value } = event.target;

    this.setState({ [id]: value });
  }

  submitPerson = (event) => {
    event.preventDefault();

    console.log(this.state);


    if (this.state.id) {
      updatePerson(this.state).then((succes) => {
        this.setState({
          apellido: "",
          nombre: "",
          email: "",
          telefono: "",
          id: false
        });
      }).catch((error) => {
        console.log("No se actualizo");
      });
    } else {
      addPerson(this.state).then((succes) => {
        this.setState({
          apellido: "",
          nombre: "",
          email: "",
          telefono: ""
        });
      }).catch((error) => {
        console.log("No se guardo");
      });
    }



  }

  updatePerson = (person) => {
    this.setState({
      apellido: person.apellido,
      nombre: person.nombre,
      email: person.email,
      telefono: person.telefono,
      id: person.id
    }, () => {
      M.updateTextFields();
    });
  }



  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12" onSubmit={this.submitPerson}>
            <div className="row">
              <div className="input-field col s6">
                <input placeholder="Placeholder" id="nombre" type="text" className="validate"
                  value={this.state.nombre}
                  onChange={this.onChangeValues}
                />
                <label htmlFor="nombre">Nombre</label>
              </div>
              <div className="input-field col s6">
                <input id="apellido" type="text" className="validate"
                  onChange={this.onChangeValues}
                  value={this.state.apellido}
                />
                <label htmlFor="apellido">Apellido</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="telefono" type="text" className="validate"
                  value={this.state.telefono}
                  onChange={this.onChangeValues}
                />
                <label htmlFor="telefono">Teléfono</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input id="email" type="email" className="validate"
                  value={this.state.email}
                  onChange={this.onChangeValues}
                />
                <label htmlFor="email">Corre Eléctronico</label>
              </div>
            </div>

            <div className="row">
              <button className="waves-effect waves-light btn">Enviar</button>
            </div>
          </form>
        </div>
        <ListUsers metodUpdate={this.updatePerson} />
        <Login />
      </div>
    )
  }

}

export default App;
