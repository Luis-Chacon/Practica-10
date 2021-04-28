export class Reservacion
{
    constructor
    (
        public Id:string,
        public imgUrl: string,
        public restaurante: string,
        public nombre: string,
        public fecha: string,
        public usuarioId: string
    ){}
}