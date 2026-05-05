import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
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
  manifiestosFiltrados: Manifiesto[] = [];

  estatusList: string[] = [];
  destinosList: string[] = [];

  filtroEstatus = '';
  filtroDestino = '';

  cargando = true;
  error = '';
  buscarId: number | null = null;
  manifiestoSeleccionado: Manifiesto | null = null;

  constructor(
    private manifiestosSvc: ManifiestosService,
    private cdr: ChangeDetectorRef   
  ) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'F3') {
      event.preventDefault();
      this.busquedaInput.nativeElement.focus();
    }
  }

  ngOnInit(): void {
    this.cargarTodos();
    this.cargarCatalogos();
  }

  cargarCatalogos(): void {
    this.manifiestosSvc.getEstatus().subscribe({
      next: (res) => {
        this.estatusList = res.data;
        this.cdr.detectChanges();
      },
      error: () => {}
    });

    this.manifiestosSvc.getDestinos().subscribe({
      next: (res) => {
        this.destinosList = res.data;
        this.cdr.detectChanges();
      },
      error: () => {}
    });
  }

  cargarTodos(): void {
    this.cargando = true;
    this.error = '';
    this.buscarId = null;             
    this.manifiestosSvc.getManifiestos().subscribe({
      next: (res) => {
        this.manifiestos = res.data;
        this.aplicarFiltros();       
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al cargar los manifiestos';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  aplicarFiltros(): void {
    this.manifiestosFiltrados = this.manifiestos.filter(m => {
      const matchEstatus = this.filtroEstatus ? m.estatus === this.filtroEstatus : true;
      const matchDestino = this.filtroDestino ? m.destino === this.filtroDestino : true;
      return matchEstatus && matchDestino;
    });
    this.cdr.detectChanges();
  }

  limpiarFiltros(): void {
    this.filtroEstatus = '';
    this.filtroDestino = '';
    this.buscarId = null;            
    this.manifiestosFiltrados = [...this.manifiestos];
    this.cdr.detectChanges();
  }

  filtrarPorId(): void {
    if (!this.buscarId) {
      this.aplicarFiltros();
      return;
    }

    this.cargando = true;
    this.error = '';

    this.manifiestosSvc.getManifiestoPorId(this.buscarId).subscribe({
      next: (res) => {
        this.manifiestosFiltrados = res.data ? [res.data] : [];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se encontró el manifiesto';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  seleccionarEditar(m: Manifiesto): void {
    this.manifiestoSeleccionado = { ...m };
    this.cdr.detectChanges();
  }

  eliminar(m: Manifiesto): void {
    const confirmar = confirm(`¿Eliminar el manifiesto ${m.manifiesto}?`);
    if (!confirmar) return;

    this.manifiestosSvc.eliminarManifiesto(m.id).subscribe({
      next: () => this.cargarTodos(),
      error: () => alert('Error al eliminar el manifiesto')
    });
  }

  getBadgeClass(estatus: string): string {
    return 'badge-' + (estatus || '').toLowerCase().replace(/ /g, '-');
  }
}