import axios from "axios"
import { TerrorEvent } from "../interface/TerrorEvent"

export const getData = async (url: string) => {
    const response = await axios.get(url)
    return response.data
}


export const addEvent = async (event: Partial<TerrorEvent>) : Promise<Partial<TerrorEvent> | null> => {
    try {
        console.log(event);
        
        const response = await axios.post<Partial<TerrorEvent>>(`http://localhost:3222/api/addEvent`, event);
        return response.data;
    } catch (error) {
        console.error(error);
        return null
    }
}


export const deleteEvent = async (eventId: string) => {
    try {
        const response = await axios.delete(`http://localhost:3222/api/deleteEvent/${eventId}`);   
        return response.data;
    } catch (error) {
        console.error(error);
        return null
    }
}


export const editEvent = async (newEvent: Partial<TerrorEvent>): Promise<boolean> => {
    const response = await axios.put(`http://localhost:3222/api/updateEvent/`, newEvent )
    console.log(response.data);
    console.log(response);
    if (response.data) {
        return true;
    };
    return false
}