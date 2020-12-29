import React from 'react';
import {firebase} from './firebase'


function App() {

  const [tareas , setTareas] = React.useState([])
  const [tarea , setTarea]  = React.useState('')
  const [modoEdicion , setModoEdicion] = React.useState(false)
  const [id , setId] = React.useState('')

  //obtener datos 
  React.useEffect(() =>{
    
    const obtenerDatos = async () =>{
      try {
        const db = firebase.firestore()
        const data = await db.collection('tareas').get()
        const arrayData = data.docs.map( (doc) => ({id: doc.id ,  ...doc.data()}))

        setTareas(arrayData)
        
      } catch (error) {
        console.log(error) 
      }
    }
    obtenerDatos()
  }, []) //se agrega corchete paraa no repetir la peticion

  const agregar = async (e) =>{

    e.preventDefault()

    if(!tarea.trim()){
      console.log('esta vacio')
      return
    }

    try {

      const db = firebase.firestore()
      const nuevaTarea = {
        name: tarea,
        fecha: Date.now()
      }

      const data = await db.collection('tareas').add(nuevaTarea)
      //mostrar listado con las nuevas tareas
      setTareas([
        ...tareas,
        {...nuevaTarea , id: data.id}
      ])

      setTarea('')
    }catch{

    }
    console.log(tarea)
  }

  //eliminar tarea
  const eliminar = async (id) => {

    try{

      const db = firebase.firestore()
      await db.collection('tareas').doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)

    }catch (error){
      console.log(error)
    }
  }

  //Editar tarea
  const activarEdicion= (item) => {
    setModoEdicion(true)
    setTarea(item.name)
    setId(item.id)
  }

  const editar = async (e) =>{
    e.preventDefault()

    if(!tarea.trim()){
      console.log('esta vacio')
      return
    }

    try{

      const db = firebase.firestore()
      await db.collection('tareas').doc(id).update({
        name : tarea
      })

      const arrayEditado = tareas.map(item => (
        item.id === id ? {id : item.id , fecha: item.fecha , name:tarea} : item
      ))
      setTareas(arrayEditado)

      setModoEdicion(false)
      setTarea('')
      setId('')

    }catch (error){
      console.log(error)
    }
  }

  return (
    <div className="container mt-3">
     <div className="row">
       <div className="col-md-6">
         <h6>Lista de tareas</h6>
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                    {item.name} - {item.fecha}
                    <button 
                      className="btn btn-danger btn-sm float-right"
                      onClick={() => eliminar(item.id)}
                      >
                        Eliminar
                    </button>
                    <button 
                      className="btn btn-warning btn-sm float-right mr-2"
                      onClick={()=> activarEdicion(item)}
                    >
                      Editar
                    </button>
                </li>
              ))
            }
          </ul>
       </div>
       <div className="col-md-6">
         <h6>
           {
             modoEdicion ? 'Editar tarea' : 'Agregar tarea'
           }
         </h6>
         <form action="" onSubmit={ modoEdicion ? editar : agregar}>
            <input type="text"
            placeholder="Ingrese tarea"
            className="form-control mb-2"
            onChange={e => setTarea(e.target.value)}
            value= {tarea}
            />

            <button type="submit" 
              className={ modoEdicion ? 'btn btn-warning btn-block':'btn btn-dark btn-block'}
            >
              {
                modoEdicion ? 'Editar' : 'Agregar'
              }
            </button>
         </form>
         
       </div>
     </div>
    </div>
  );
}

export default App;
