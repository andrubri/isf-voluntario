import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input, ViewChildren, QueryList, ElementRef, AfterViewInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Subject} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {FuseUtils} from '@fuse/utils';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {formatDate} from '@angular/common';
import {ISFService} from '../../../services/isf.service';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {AccionConfirmarComponent} from '../../modal/AccionConfirmar/accionconfirmar.component';
import {AddvoluntarioComponent} from '../../modal/AddVoluntario/addvoluntario.component';
import {AddjornadaComponent} from '../../modal/AddJornada/addjornada.component';
import {EmailComponent} from '../../modal/Email/email.component';
import {AutocompleteService} from 'app/services/autocomplete-service';
import {isObject} from 'util';

@Component({
    selector: 'formequipos',
    templateUrl: './formequipos.component.html',
    styleUrls: ['./formequipos.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class FormequiposComponent implements OnInit, OnDestroy, AfterViewInit {
    pageType: string;
    equipoForm: FormGroup = null;
    perfiles: any;
    equipo: any;
    equipo_coordinadores: any[];
    jornada_act: any[];
    personas_act: any[];
    coordinador_act: any[];
    equipoLocation: any = {};
    now: Date = new Date();
    public dataSource: MatTableDataSource<any> = new MatTableDataSource();
    public dataPersonas: MatTableDataSource<any> = new MatTableDataSource();
    public dataJornadas: MatTableDataSource<any> = new MatTableDataSource();
    public displayedColumnsCoordinador = ['nombre', 'apellido'];
    public displayedColumnsVoluntario = ['nombre', 'apellido'];
    public displayedColumnsJornada = ['fecha', 'descripcion', 'accion'];
    @ViewChildren('search') public searchElement: QueryList<ElementRef>;
    @ViewChild('tabGroup') tabGroup;

    constructor(
        private _isfService: ISFService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private _dialog: MatDialog,
        private _autocompleteService: AutocompleteService
    ) {
        this.perfiles = [];
        this._fuseProgressBarService.show();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    async ngOnInit(): Promise<void> {
        if (this._route.snapshot.paramMap.get('equipo') && this._route.snapshot.paramMap.get('equipo') !== 'new') {
            this.pageType = 'edit';
            const idAct = Number(this._route.snapshot.paramMap.get('equipo'));
            this.equipo = await this._isfService.getEquipoById(idAct);
            this.dataSource.data = await this._isfService.getCoordinadoresAct(idAct);
            this.dataPersonas.data = await this._isfService.getPersonasAct(idAct);
            this.coordinador_act = await this._isfService.getCoordinadores();
            this.personas_act = await this._isfService.getPersonas();

            this._isfService.getJornadasAct(idAct).then(jornadas => {
                for (const jornada of jornadas) {
                    jornada.fecha = new Date(Date.parse(jornada.fecha));
                }
                this.dataJornadas.data = jornadas;
            });
        } else {
            this.pageType = 'new';
            this.equipo = {
                idEquipo: null,
                nombre: '',
                descripcion: '',
                estado: '',
                direccion: '',
                categoria: '',
                inicio: '',
                fin: ''
            };
            this.dataSource.data = [];
        }

        this.equipoForm = this.createEquipoForm();
        this._fuseProgressBarService.hide();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
        if (this.pageType === 'edit') {
            this.searchElement.changes.subscribe(val => this._autocompleteService.autocompleteAdress(val.first.nativeElement, this.equipoLocation));
        } else {
            this._autocompleteService.autocompleteAdress(document.getElementsByName('direccion')[0], this.equipoLocation);
        }
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createEquipoForm(): FormGroup {
        return this._formBuilder.group({
            nombre: [this.equipo.nombre],
            descripcion: [this.equipo.descripcion],
            estado: [this.equipo.estado],
            direccion: [this.equipo.direccion],
            categoria: [this.equipo.categoria],
            inicio: [this.equipo.inicio],
            fin: [this.equipo.fin],
            idEquipo: [this.equipo.idEquipo],
            fechaInicio: [this.equipo.fechaInicio],
            fechaFin: [this.equipo.fechaFin]
        });
    }

    /**
     * Save equipo
     */
    async saveEquipo(): Promise<void> {
        this._fuseProgressBarService.show();

        const data = this.equipoForm.getRawValue();

        data.handle = FuseUtils.handleize(data.nombre);

        const infoDir = this.searchElement.first.nativeElement.value.split(',');
        if (infoDir.length > 1 && this.equipoLocation.lat) {
            data.coordenadas = this.equipoLocation.lat + '&' + this.equipoLocation.lng;
            data.direccion = this.searchElement.first.nativeElement.value;
            data.provincia = (infoDir.length >= 4) ? infoDir[2].trim() : infoDir[1].trim();
            data.ciudad = (infoDir.length >= 4) ? infoDir[1].trim() : infoDir[1].trim();

            await this._isfService.saveEquipo(data, this.dataSource.data);

            this._matSnackBar.open('Equipo grabada', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            this._fuseProgressBarService.hide();
            this._router.navigate(['equipos']);
        } else {
            this._matSnackBar.open('Debe ingresar una dirección valida', 'Aceptar', {
                verticalPosition: 'top',
                duration: 2000
            });
        }
    }

    /**
     * Add Equipo
     */
    async addEquipo(): Promise<void> {
        this._fuseProgressBarService.show();
        try {
            const data = this.equipoForm.getRawValue();
            data.handle = FuseUtils.handleize(data.nombre);
            const infoDir = this.searchElement.first.nativeElement.value.split(',');
            if (infoDir.length > 1 && this.equipoLocation.lat) {
                data.coordenadas = this.equipoLocation.lat + '&' + this.equipoLocation.lng;
                data.direccion = this.searchElement.first.nativeElement.value;
                data.provincia = (infoDir.length >= 4) ? infoDir[2].trim() : infoDir[1].trim();
                data.ciudad = (infoDir.length >= 4) ? infoDir[1].trim() : infoDir[1].trim();

                await this._isfService.addEquipo(data, this.dataSource.data);

                // Show the success message
                this._matSnackBar.open('Equipo grabada', 'OK', {
                    verticalPosition: 'top',
                    duration: 2000
                });

                // Change the location with new one
                this._router.navigate(['equipos']);
            } else {
                this._matSnackBar.open('Debe ingresar una dirección valida', 'Aceptar', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        } catch (e) {
            if (e.error) {
                this._matSnackBar.open(e.error, 'Aceptar', {
                    verticalPosition: 'top',
                    panelClass: 'errorSnackBar',
                    duration: 2000
                });
            } else {
                this._matSnackBar.open('Ocurrio un error al grabar la equipo!. Intente más tarde.', 'Aceptar', {
                    verticalPosition: 'top',
                    duration: 2000
                });
            }
        }
        this._fuseProgressBarService.hide();
    }

    private openDialogAdd(datos: any) {
        this._dialog.open(AddvoluntarioComponent, {
            width: datos.anchoModal ? datos.anchoModal : '50%',
            height: datos.altoModal ? datos.altoModal : '17%',
            data: datos,
            panelClass: 'popup'
        });
    }

    private openEmailDialog(datos: any) {
        this._dialog.open(EmailComponent, {
            width: datos.anchoModal ? datos.anchoModal : '50%',
            height: datos.altoModal ? datos.altoModal : '17%',
            data: datos,
            panelClass: 'popup'
        });
    }


    private openDialogAddJornada(datos: any) {
        this._dialog.open(AddjornadaComponent, {
            width: datos.anchoModal ? datos.anchoModal : '50%',
            height: datos.altoModal ? datos.altoModal : '17%',
            data: datos,
            panelClass: 'popup'
        });
    }

    addCoordinador(): void {

        this.openDialogAdd({
            etiqueta: 'AddVoluntario',
            txtBoton: 'Seleccionar',
            label: 'Coordinador',
            items: this.coordinador_act,
            callback: async (item) => {
                const info = this.dataSource.data;
                if (this.equipo.idEquipo) {
                    try {
                        const newItem: any = {};
                        await this._isfService.addEquipoCoordinador(this.equipo.idEquipo, item.idPersona);
                        newItem.nombre = item.nombre;
                        newItem.apellido = item.apellido;
                        info.push(newItem);
                    } catch (e) {
                        if (e.error && !isObject(e.error)) {
                            this._matSnackBar.open(e.error, 'Aceptar', {
                                verticalPosition: 'top',
                                panelClass: 'errorSnackBar',
                                duration: 2000
                            });
                        } else {
                            this._matSnackBar.open('Ocurrio un error al grabar el coordinador!. Intente más tarde.', 'Aceptar', {
                                verticalPosition: 'top',
                                panelClass: 'errorSnackBar',
                                duration: 2000
                            });
                        }
                    }
                }
                this.dataSource.data = info;
            },
            altoModal: '300px',
            anchoModal: '450px'
        });
    }

    sendEmail(): void {

        this.openEmailDialog({
            etiqueta: 'SendEmail',
            txtBoton: 'Enviar',
            label: 'Mensaje a enviar',
            callback: async (item) => {
                if (this.equipo.idEquipo) {
                    this._isfService.sendEmailToEquipo(this.equipo, item);
                    this._matSnackBar.open('Se envio correctamente el email!', 'Aceptar', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                }
            },
            altoModal: '500px',
            anchoModal: '450px'
        });
    }

    sendEmailConvocatoria(jornada: any, e: Event): void {
        e.stopPropagation();
        this.openEmailDialog({
            etiqueta: 'SendEmail',
            txtBoton: 'Enviar',
            label: 'Mail',
            tipo: 'convocatiria',
            callback: async (item) => {
                if (jornada.idJornadas) {
                    const newItem: any = this._isfService.sendEmailToJornada(jornada, item);
                    this._matSnackBar.open('Se envio correctamente el email!', 'Aceptar', {
                        verticalPosition: 'top',
                        duration: 2000
                    });
                }
            },
            altoModal: '500px',
            anchoModal: '450px'
        });
    }

    addVoluntario(): void {

        this.openDialogAdd({
            etiqueta: 'AddVoluntario',
            txtBoton: 'Seleccionar',
            label: 'Voluntario',
            items: this.personas_act,
            callback: async (item) => {
                const info = this.dataPersonas.data;
                if (this.equipo.idEquipo) {
                    try {
                        const newItem: any = {};
                        await this._isfService.addEquipoVoluntario(this.equipo.idEquipo, item.idPersona);
                        newItem.nombre = item.nombre;
                        newItem.apellido = item.apellido;
                        info.push(newItem);
                    } catch (e) {
                        if (e.error && !isObject(e.error)) {
                            this._matSnackBar.open(e.error, 'Aceptar', {
                                verticalPosition: 'top',
                                panelClass: 'errorSnackBar',
                                duration: 2000
                            });
                        } else {
                            this._matSnackBar.open('Ocurrio un error al grabar el voluntario!. Intente más tarde.', 'Aceptar', {
                                verticalPosition: 'top',
                                panelClass: 'errorSnackBar',
                                duration: 2000
                            });
                        }
                    }
                }
                this.dataPersonas.data = info;
            },
            altoModal: '300px',
            anchoModal: '450px'
        });
    }

    addJornada(): void {

        this.openDialogAddJornada({
            etiqueta: 'AddJornada',
            txtBoton: 'Agregar',
            callback: async (item) => {
                const info = this.dataJornadas.data;
                if (this.equipo.idEquipo) {
                    try {
                        const newItem: any = {};
                        await this._isfService.addEquipoJornada(this.equipo.idEquipo, item);
                        newItem.fecha = item.fecha;
                        newItem.descripcion = item.descripcion;
                        info.push(newItem);
                    } catch (e) {
                        console.log(e.error);
                        if (e.error && !isObject(e.error)) {
                            this._matSnackBar.open(e.error, 'Aceptar', {
                                verticalPosition: 'top',
                                panelClass: 'errorSnackBar',
                                duration: 2000
                            });
                        } else {
                            this._matSnackBar.open('Ocurrio un error al grabar el coordinador!. Intente más tarde.', 'Aceptar', {
                                verticalPosition: 'top',
                                panelClass: 'errorSnackBar',
                                duration: 2000
                            });
                        }
                    }
                }
                this.dataJornadas.data = info;
            },
            altoModal: '400px',
            anchoModal: '450px'
        });
    }
}
