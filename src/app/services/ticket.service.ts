import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { environment } from 'src/environments/environment';
import { Ticket, TicketSinID } from '../models/ticket';

//const API= environment.urlBackend;
const ENDPOINT = 'tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private http: HttpClient
  ) { }
 //GET 
  getAllTicket(){
    return this.http.get<Ticket[]>(`https://appclaseticket.herokuapp.com/${ENDPOINT}`)
  }

  //post
  postTicket(ticket:TicketSinID){
    return this.http.post(`https://appclaseticket.herokuapp.com/${ENDPOINT}`,ticket);
  }

//put
  putTicket(id:string,ticket:TicketSinID){
  return this.http.put(`https://appclaseticket.herokuapp.com/${ENDPOINT}/${id}`,ticket);
}

patcTicket(id:string,ticket:TicketSinID){
  return this.http.patch(`https://appclaseticket.herokuapp.com/${ENDPOINT}/${id}`,ticket);
}

//delte
delteTicket(id:string){
  return this.http.delete(`https://appclaseticket.herokuapp.com/${ENDPOINT}/${id}`);
}
}
