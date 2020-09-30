import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Tarea } from 'src/app/models/tarea';
import { TareaService } from 'src/app/services/tarea.service';

@Component({
  selector: 'app-list-tareas',
  templateUrl: './list-tareas.component.html',
  styleUrls: ['./list-tareas.component.css']
})

export class ListTareasComponent implements OnInit {

  id = 0;
  nombre = '';
  finalizada = false;
  listTareas: Tarea[];

  constructor(public tareaService: TareaService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.tareaService.obtenerTareas();
  }

  agregarTarea() {
    const tarea = {
      nombre: this.nombre,
      finalizada: false
    };

    this.tareaService.guardarTarea(tarea).subscribe(data => {
      this.toastr.success('Registro Agregado', 'La tarea fue agregada satisfactoriamente');
      this.tareaService.obtenerTareas();
      this.nombre = '';
    });
  }

  actualizarTarea(id: number, tarea: Tarea) {
    tarea.finalizada = !tarea.finalizada;

    this.tareaService.actualizarTarea(id, tarea).subscribe(data => {
      this.toastr.success('Registro Actualizado', 'La tarea fue actualizada satisfactoriamente');
      this.tareaService.obtenerTareas();
      this.nombre = '';
    }); 
  }

  eliminarTarea(id: number) {
    if (confirm('¿Está seguro que desea eliminar el registro?')) {
      this.tareaService.eliminarTarea(id).subscribe(data => {
        this.toastr.warning('Registro eliminado', 'La tarea fue eliminada satisfactoriamente');
        this.tareaService.obtenerTareas();
      });
    }
  }
}
