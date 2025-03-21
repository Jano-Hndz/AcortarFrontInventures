import {AppAPI} from "../api"
import Swal from 'sweetalert2';

export const CreacionURLAcortar = async(data)=>{
    try {
        const res = await AppAPI.post(`/acortados/new`,data)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const RedirigirURL = async(data)=>{
    try {
        const res = await AppAPI.post(`/acortados/redirect`,data)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}


export const GetPanelControl = async(data)=>{
    try {
        const res = await AppAPI.post(`/acortados/auth/panelcontrol`,data)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const RenovarURL = async(data)=>{
    try {
        const res = await AppAPI.post(`/acortados/auth/renovar`,data)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}

export const DeleteURL = async(data)=>{
    try {
        const res = await AppAPI.post(`/acortados/auth/eliminar`,data)


        if(res.data.ok){
            return res.data
        }else{
            return "Error en peticion"
        }
        
    } catch (error) {
        console.log(error);
        Swal.fire('Error al buscar', error.response.data.msg, 'error');
    }
}


