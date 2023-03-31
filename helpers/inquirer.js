import inquirer from 'inquirer'; 
import colors from "colors";


const inquireMenu = async() => {
    const questions = [
        {
            type:'list', 
            name:'opcion', 
            message:'Qué desea hacer?', 
            choices:[
                {
                    value:1, 
                    name:`${'1.'.green} Buscar ciudad`
                },
                {
                    value:2, 
                    name:`${'2.'.green} Historial`
                },
                {
                    value:0, 
                    name:`${'0.'.green} Salir`
                }
            ]
        }
    ]; 


    console.clear(); 
    console.log("========================".green); 
    console.log(" Seleccione una opción  ".green); 
    console.log("========================\n".green); 

    const {opcion} = await inquirer.prompt(questions); 

    return opcion; 
}

const ListarLugares = async(places = []) =>{
    console.clear(); 
    const choices = places?.map((place,index) => ({value:place.id, name:`${index+1}. ${place.name}`})); 

    const questions = [
        {
            type:'list', 
            name:'id', 
            message:'Selecciona un lugar', 
            choices : [...choices,{value:-1, name:'Salir'}]
        }
    ]; 

    const {id} = await inquirer.prompt(questions); 
    return id; 

}

const MostrarListadoChecklist = async(tareas) =>{
    console.clear(); 
    const choices = tareas.map((task,index) => ({value:task.id, name:`${index+1}. ${task.desc}`, checked:!!task.completadoEn ?? false})); 

    const questions = [
        {
            type:'checkbox', 
            name:'ids', 
            message:'Selecciones', 
            choices
        }
    ]; 

    const {ids} = await inquirer.prompt(questions); 
    return ids; 

}
const confirm = async(message)=>{
    const confirmVal = [
        {
            type:'confirm',
            name:'confirmation', 
            message:message, 
            default:true
        }
    ]
    const {confirmation} = await inquirer.prompt(confirmVal); 
    return confirmation; 
}
const pause = async()=>{
    const confirmVal = [
        {
            type:'input',
            name:'pause', 
            message:`\nPresione ${'Enter'.green} para continuar\n`, 
        }
    ]
    await inquirer.prompt(confirmVal); 
}
const leerInput = async(message)=>{
    const question = [
        {
            type:'input', 
            name:'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return "porfavor ingrese un valor"
                }
                return true; 
            }
        }
    ]

    const {desc} = await inquirer.prompt(question)
    return desc; 
}


export {leerInput, pause,inquireMenu, ListarLugares , confirm, MostrarListadoChecklist}; 