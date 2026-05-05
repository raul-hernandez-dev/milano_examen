import { Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ManifiestosService } from '../../services/manifiestos';
import { Manifiesto } from '../../models/manifiesto.model.ts';

@Component({
  selector: 'app-manifiesto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manifiesto-form.html',
  styleUrls: ['./manifiesto-form.css']
})
export class ManifiestoFormComponent implements OnChanges {

  @Input()  manifiestoEditar: Manifiesto | null = null;
  @Output() manifiestoGuardado = new EventEmitter<void>();

  abierto   = false;
  guardando = false;
  exito     = '';
  error     = '';
  modoEdicion = false;

  tiposCamion = ['TRAILER', 'CAMIONETA', 'MUDANZA', 'URVAN'];
  estatuses   = ['PENDIENTE', 'AUTORIZADO', 'EN RUTA', 'COMPLETADO', 'CANCELADO'];

  form: any = this.formVacio();

  constructor(private manifiestosSvc: ManifiestosService) {}

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'F2') {
      event.preventDefault();
      this.abrirNuevo();
    }
    if (event.key === 'Escape') {
      this.cerrar();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['manifiestoEditar'] && this.manifiestoEditar) {
      this.form       = { ...this.manifiestoEditar };
      this.modoEdicion = true;
      this.exito      = '';
      this.error      = '';
      this.abierto    = true;
    }
  }

  abrirNuevo(): void {
    this.modoEdicion = false;
    this.form        = this.formVacio();
    this.exito       = '';
    this.error       = '';
    this.abierto     = true;
  }

  cerrar(): void {
    this.abierto        = false;
    this.modoEdicion    = false;
    this.form           = this.formVacio();
    this.manifiestoEditar = null;
  }

  validarCampos(): boolean {
    const obligatorios = [
      'manifiesto', 'transportista', 'fecha_apertura', 
      'tipo_camion', 'chofer', 'placas', 'destino', 'estatus'
    ];

    for (const campo of obligatorios) {
      const valor = this.form[campo];
      if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
        this.error = `Por favor rellena el campo: ${campo.replace('_', ' ')}`;
        return false;
      }
    }
    return true;
  }

  guardar(): void {
    if (!this.validarCampos()) return; // Detener si no es válido

    this.guardando = true;
    this.exito     = '';
    this.error     = '';

    const peticion = this.modoEdicion
      ? this.manifiestosSvc.actualizarManifiesto(this.form)
      : this.manifiestosSvc.crearManifiesto(this.form);

    peticion.subscribe({
      next: (res: any) => {
        this.guardando = false;
        this.exito     = res.message || (this.modoEdicion ? 'Manifiesto actualizado' : 'Manifiesto creado');
        this.manifiestoGuardado.emit();
        setTimeout(() => this.cerrar(), 1200);
      },
      error: () => {
        this.guardando = false;
        this.error     = 'Error al guardar el manifiesto';
      }
    });
  }

  formVacio() {
    return {
      manifiesto:     '',
      transportista:  '',
      fecha_apertura: '',
      fecha_cierre:   '',
      tipo_camion:    '',
      chofer:         '',
      placas:         '',
      destino:        '',
      estatus:        'PENDIENTE'
    };
  }
}