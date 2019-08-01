import React, { Component } from 'react';
import firebase from 'firebase';
import M from 'materialize-css';


class ListUsers extends Component {

    state = {
        users: []
    }

    componentWillMount() {
        this.listenerUsers();
        this.listenerRemove();
        this.listenerUpdate();
    }

    getIndexPerson(snapshot){
        let users = this.state.users;
            let person = snapshot.val();
            person.id = snapshot.key;

            let indice = -1;
           
            users.forEach((value,index)=>{
                if(value.id === person.id){
                    indice = index;
                }
            }); 

            let obj ={
                indice,
                users,
                person
            }
        return obj;
    }

    listenerUpdate=()=>{
        firebase.database().ref('/person').on('child_changed', (snapshot) => {           
            
            let {indice,users,person} = this.getIndexPerson(snapshot);
            if(indice >= 0){
                users[indice] = person; 
                this.setState({users});
            }
          
        });
    }

    listenerRemove=()=>{
        firebase.database().ref('/person').on('child_removed', (snapshot) => {

            let {indice,users} = this.getIndexPerson(snapshot);
            if(indice >= 0){
                users.splice(indice,1);
                this.setState({users});
            }
        });
    }


    listenerUsers = () => {

        firebase.database().ref('/person').on('child_added', (snapshot) => {
          //  console.log(snapshot);
            let users = this.state.users;

            let person = snapshot.val();
            person.id = snapshot.key;

            users.push(person)

            this.setState({ users });
        });
    }

    deleteUser = (id) =>{
        firebase.database().ref(`/person/${id}`).remove().then(()=>{
            M.toast({ html: "Se elimino la persona", classes: "green accent-3" });
        }).catch((error)=>{
            console.log(error);
            M.toast({ html: "Ocurrio un error al eliminar la persona", classes: "red darken-3" });
        });
    }

    render() {

        return (
            <div className="row">
                <div className="col s12">
                    <table className="highlight">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Acción</th>
                                <th>Editar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                this.state.users.map((value, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{value.nombre}</td>
                                            <td>{value.apellido}</td>
                                            <td>{value.telefono}</td>
                                            <td>{value.email}</td>
                                            <td>
                                                <button className="btn waves-effect red waves-light"
                                                    onClick={this.deleteUser.bind(this,value.id)}
                                                >
                                                 <i className="material-icons">delete_forever</i>
                                                </button>

                                            </td>
                                            <td>
                                                <button className="btn waves-effect blue waves-light"
                                                    onClick={this.props.metodUpdate.bind(this,value)}
                                                >
                                                 <i className="material-icons">edit</i>
                                                </button>

                                            </td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        )
    }


}


export default ListUsers;