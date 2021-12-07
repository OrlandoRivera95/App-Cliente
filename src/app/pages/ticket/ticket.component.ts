import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  form!: FormGroup;
  listOfTicket: Ticket[] = [];  
  visible = false;
  accion:boolean=true;
  idModificar:string='';

  constructor(
    private TicketService:TicketService,
    private nzMessageService:NzMessageService,
    private formBuilder: FormBuilder
    
  ) { this.buildForm();
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      eventoId: [null],
      fecha: [''],
      hora: [null],
      duracion: [null],
      precio: [null],
      silla: [null]
      });
    } 
  ngOnInit(): void {
    this.TicketService.getAllTicket().toPromise().then(
      (data: Ticket[])=>this.listOfTicket = data
    )
  }
  delete(id: string) {
    this.TicketService.delteTicket(id).toPromise().then(() => {
        this.listOfTicket = this.listOfTicket.filter(x => x.id !== id);
    }, (error) => {
      this.nzMessageService.error('El ticket no se ha eliminado, por favor intente de nuevo');
      console.error(error);
    })
  }

  cancel(): void {
    this.nzMessageService.info('La operacion fue cancelada')
  }

  open(): void {
    this.visible = true;
    this.accion=true;
  }

  close(): void {
    this.visible = false;
    this.buildForm();
  }
  

    guardar(): void {
      if (this.accion) {
        this.TicketService.postTicket(this.form.value).toPromise().then((data: any) => {
          this.nzMessageService.success('Se ingreso el Ticket');
          this.listOfTicket = [...this.listOfTicket, data]
          this.buildForm();
          this.visible = false;
        }, (error) => {
          this.nzMessageService.error('El ticket no se ingreso, por favor intente de nuevo');
          console.error(error);
        })
      }else{
        this.TicketService.putTicket(this.idModificar,this.form.value).toPromise().then(()=>{
          for(let elemento of this.listOfTicket.filter(x=>x.id===this.idModificar)){
            elemento.eventoId=this.form.value.eventoId;
            elemento.fecha= this.form.value.fecha;
            elemento.hora= this.form.value.hora;
            elemento.duracion= this.form.value.duracion;
            elemento.precio=this.form.value.precio;
            elemento.silla=this.form.value.silla;
            }
          this.visible = false;
          this.nzMessageService.success('Se actualizo el ticket');
        }, (error) => {
          this.nzMessageService.error('No se pudo actualizar el ticket, por favor intente de nuevo');
          console.error(error);
        })
      }
    }
    modificar(item:Ticket):void{
      this.accion=false;
      this.idModificar=item.id;
      this.visible = true;
      this.form=this.formBuilder.group({
        eventoId: [item.eventoId],
        fecha: [item.fecha],
        hora: [item.hora],
        duracion: [item.duracion],
        precio: [item.precio],
        silla: [item.silla]
      })
    }
    submitForm(): void {
      for (const i in this.form?.controls) {
        this.form?.controls[i].markAsDirty();
        this.form?.controls[i].updateValueAndValidity();
      }
    }
}
