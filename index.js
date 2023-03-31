import {leerInput, inquireMenu, pause, ListarLugares} from './helpers/inquirer.js'
import Busquedas from './models/busquedas.js';
import * as dotenv from 'dotenv';

dotenv.config()


const main = async()=>{
    
    let opt; 
    const busquedas = new Busquedas(); 
    busquedas.loadDB(); 

    do{
        opt = await inquireMenu();
        
        switch( opt ){
            case 1:
                const lugar = await leerInput('Ciudad: '); 
                const lugares = await busquedas.ciudad(lugar); 
                const selectedID = await ListarLugares(lugares); 
                if(selectedID === -1) continue; 

                
                const selectedPlace = lugares.find(place => place.id === selectedID); 
                busquedas.agregarHistorial(selectedPlace.name); 
                const weatherPlace = await busquedas.climaLugar(selectedPlace.lat, selectedPlace.lng)
                console.log('\nInformación');
                console.log('Ciudad: ',selectedPlace.name);
                console.log('Lat',selectedPlace.lat);
                console.log('Lng',selectedPlace.lng);
                console.log('Temperatura', weatherPlace.temp);
                console.log('Mínima',weatherPlace.min); 
                console.log('Máxima', weatherPlace.max);
                break; 
            case 2: 
            
            busquedas.historial.forEach((place,index)=>console.log(`${index + 1}.- ${place}`)); 
        }  
        if(opt !== 0 )await pause();  

    }while(opt!==0)



}
main(); 