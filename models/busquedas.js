import axios, {isCancel, AxiosError} from 'axios';
import {writeFileSync, readFileSync} from 'node:fs'

class Busquedas{
    historial = []; 
    dbPath = './db/db.json';

    constructor(){
        //TODO: leer DB si existe
    }

    get paramsMapbox(){
        return {
            'access_token' : process.env.MAPBOX_KEY,
            'limit':5, 
            'language':'es'
        }
    }

    get paramsOpenWeather(){
        return {
            appid:process.env.APP_ID, 
            lang:'es', 
            units:'metric'
        }
    }

    async ciudad(lugar = ''){
        try{
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const {data} = await instance.get(); 
            return data.features.map(place => ({
                id:place.id, 
                name:place.place_name, 
                lng:place.center[0], 
                lat:place.center[1]
            }))
        }
        catch(e){

        }

    }

    async climaLugar(lat,long){
        try{
            const instanceReq = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params:{
                    ...this.paramsOpenWeather, 
                    lat:lat, 
                    lon:long
                }
            }); 
            const {data} = await instanceReq.get(); 
            return {
                temp:data.main.temp, 
                min:data.main.temp_min, 
                max:data.main.temp_max
            };  
        }
        catch(e){
            console.log('error',e); 
        }
    }

    agregarHistorial(lugar = ''){
        if(this.historial.includes(lugar))return; 
        this.historial.unshift(lugar); 
        this.guardarDB(); 
    }

    guardarDB(){
        
        const payLoad = {
            historial : this.historial
        }

        writeFileSync(this.dbPath, JSON.stringify(payLoad)); 
    }

    loadDB(){
        try{
            const dataRecovered = readFileSync(this.dbPath,'utf-8'); 
            const {historial} = JSON.parse(dataRecovered); 
            historial?.forEach(data=>this.agregarHistorial(data));  
        }
        catch(e){

        }
        
    }
}

export default Busquedas; 