import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ticket, TicketSinID } from '../models/ticket';

const API= environment.urlBackend;
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
    return this.http.get<Ticket[]>(`${API}/${ENDPOINT}`)
  }

  //post
  postTicket(ticket:TicketSinID){
    return this.http.post(`${API}/${ENDPOINT}`,ticket);
  }

//put
  putTicket(id:string,ticket:TicketSinID){
  return this.http.put(`${API}/${ENDPOINT}/${id}`,ticket);
}

patcTicket(id:string,ticket:TicketSinID){
  return this.http.patch(`${API}/${ENDPOINT}/${id}`,ticket);
}

//delte
delteTicket(id:string){
  return this.http.delete(`${API}/${ENDPOINT}/${id}`);
}
}
