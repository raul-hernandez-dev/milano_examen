import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManifiestosService } from '../../services/manifiestos';
import { Manifiesto } from '../../models/manifiesto.model.ts';
import { ManifiestoFormComponent } from '../manifiesto-form/manifiesto-form';

@Component({
  selector: 'app-manifiestos-tabla',
  standalone: true,
  imports: [CommonModule, FormsModule, ManifiestoFormComponent],
  templateUrl: './manifiestos-tabla.html',
  styleUrls: ['./manifiestos-tabla.css']
})
export class ManifiestosTablaComponent implements OnInit {
  @ViewChild('form') form!: ManifiestoFormComponent;
  @ViewChild('busquedaInput') busquedaInput!: ElementRef<HTMLInputElement>;

  manifiestos: Manifiesto[] = [];
  cargando = true;
  error = '';
  buscarId: number | null = null;
  manifiestoSeleccionado: Manifiesto | null = null;

  constructor(private manifiestosSvc: ManifiestosService) {}

  ngOnInit() { this.cargarTodos(); }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'F3') {
      event.preventDefault();
      this.busquedaInput.nativeElement.focus();
    }
    if (event.key === 'F2') {
      event.preventDefault();
      this.form.abrirNuevo();
    }
  }

  cargarTodos() {
    this.cargando = true;
    this.manifiestosSvc.getManifiestos().subscribe({
      next: (res) => { this.manifiestos = res.data; this.cargando = false; },
      error: () => { this.error = 'Error al cargar'; this.cargando = false; }
    });
  }

  filtrarPorId() {
    if (!this.buscarId) return this.cargarTodos();
    this.manifiestosSvc.getManifiestoPorId(this.buscarId).subscribe({
      next: (res) => this.manifiestos = res.data ? [res.data] : [],
      error: () => this.error = 'No encontrado'
    });
  }

  getBadgeClass(estatus: string): string {
    return 'badge-' + (estatus || '').toLowerCase().replace(/ /g, '-');
  }

  seleccionarEditar(m: Manifiesto) { this.manifiestoSeleccionado = { ...m }; }

  eliminar(m: Manifiesto) {
    if (confirm(`¿Eliminar manifiesto ${m.manifiesto}?`)) {
      this.manifiestosSvc.eliminarManifiesto(m.id).subscribe(() => this.cargarTodos());
    }
  }
}