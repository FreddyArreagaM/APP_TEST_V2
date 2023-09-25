import { Respuesta } from "./Respuesta";

export class Pregunta {
    titulo: string;
    puntos: number;
    segundos: number;
    listadoRespuestas: Respuesta[];

    constructor(titulo: string, puntos: number, segundos: number, listrespuesta: Respuesta[]){
        this.titulo = titulo;
        this.puntos = puntos;
        this.segundos = segundos;
        this.listadoRespuestas=listrespuesta;
    }

}