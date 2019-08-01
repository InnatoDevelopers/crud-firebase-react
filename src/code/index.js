import firebase from 'firebase';
import M from 'materialize-css';



export function addPerson(person) {

    let key = firebase.database().ref('/person').push().key;

    return new Promise((resolve, reject) => {
        firebase.database().ref(`/person/${key}`).set(person).then(() => {
            M.toast({ html: "Se guardo la persona", classes: "green accent-3" });
            resolve(true);
        }).catch((error) => {
            M.toast({ html: "Ocurrio un error al guardar la persona", classes: "red darken-3" });
            reject(false);
        });
    })
}


export function updatePerson(person) {

    let key = person.id;

    delete person.id;

    return new Promise((resolve, reject) => {
        firebase.database().ref(`/person/${key}`).update(person).then(() => {
            M.toast({ html: "Se actualizo la persona", classes: "green accent-3" });
            resolve(true);
        }).catch((error) => {
            M.toast({ html: "Ocurrio un error al actualizar la persona", classes: "red darken-3" });
            reject(false);
        });
    })
}


export function loginWithEmailAndPassword(email,pass){

    return new Promise((resolve,reject)=>{
        firebase.auth().signInWithEmailAndPassword(email,pass).then((user)=>{
            resolve(user);
        }).catch((error)=>{

            let message  = "Ocurrio un error al ingresar";

            if(error.code ==="auth/wrong-password"){
                message = error.message;
            }
            
            console.log(error);
    
            M.toast({ html: message, classes: "red darken-3" });
            reject(error);
        });
    })
    
}


