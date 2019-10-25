import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input} from '@angular/core';
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

@Component({
    selector: 'formequipos',
    templateUrl: './formequipos.component.html',
    styleUrls: ['./formequipos.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class FormequiposComponent implements OnInit, OnDestroy {
    pageType: string;
    equipoForm: FormGroup = null;
    perfiles: any;
    equipo: any;
    equipo_coordinadores: any[];
    jornada_act: any[];
    personas_act: any[];
    coordinador_act: any[];
    public dataSource: MatTableDataSource<any> = new MatTableDataSource();
    public dataPersonas: MatTableDataSource<any> = new MatTableDataSource();
    public dataJornadas: MatTableDataSource<any> = new MatTableDataSource();
    public displayedColumnsCoordinador = ['nombre', 'apellido'];
    public displayedColumnsVoluntario = ['nombre', 'apellido'];
    public displayedColumnsJornada = ['fecha'];

    constructor(
        private _isfService: ISFService,
        private _formBuilder: FormBuilder,
        private _matSnackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
        private _fuseProgressBarService: FuseProgressBarService,
        private _dialog: MatDialog
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
            const idAct = Number(this._route.snapshot.paramMap.get('equipo'));
            this.equipo = await this._isfService.getEquipoById(idAct);
            this.dataSource.data = await this._isfService.getCoordinadoresAct(idAct);
            this.coordinador_act = await this._isfService.getCoordinadores();
            this.dataPersonas.data = await this._isfService.getPersonasAct(idAct);
            this.personas_act = await this._isfService.getPersonas();
            this.dataJornadas.data = await this._isfService.getJornadasAct(idAct);
            this.pageType = 'edit';
        } else {
            this.pageType = 'new';
            this.equipo = {
                nombre: '',
                descripcion: '',
                estado: '',
                ciudad: '',
                provincia: '',
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
            ciudad: [this.equipo.ciudad],
            provincia: [this.equipo.provincia],
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

        await this._isfService.saveEquipo(data, this.dataSource.data);

        this._matSnackBar.open('Equipo grabada', 'OK', {
            verticalPosition: 'top',
            duration: 2000
        });

        this._fuseProgressBarService.hide();
        this._router.navigate(['equipos']);
    }

    /**
     * Add Equipo
     */
    async addEquipo(): Promise<void> {
        this._fuseProgressBarService.show();
        try {
            const data = this.equipoForm.getRawValue();
            data.handle = FuseUtils.handleize(data.nombre);

            await this._isfService.addEquipo(data, this.dataSource.data);

            // Show the success message
            this._matSnackBar.open('Equipo grabada', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one
            this._router.navigate(['equipos']);
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
                    const newItem: any = this._isfService.addEquipoCoordinador(this.equipo.idEquipo, item.idPersona);
                    newItem.nombre = item.nombre;
                    newItem.apellido = item.apellido;
                    info.push(newItem);
                } else {
                    info.push(item);
                }
                this.dataSource.data = info;
            },
            altoModal: '300px',
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
                    const newItem: any = this._isfService.addEquipoVoluntario(this.equipo.idEquipo, item.idPersona);
                    newItem.nombre = item.nombre;
                    newItem.apellido = item.apellido;
                    info.push(newItem);
                } else {
                    info.push(item);
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
            txtBoton: 'Seleccionar',
            callback: async (item) => {
                const info = this.dataJornadas.data;
                if (this.equipo.idEquipo) {
                    const newItem: any = this._isfService.addEquipoJornada(this.equipo.idEquipo, item.fecha);
                    newItem.fecha = item.fecha;
                    info.push(newItem);
                } else {
                    info.push(item);
                }
                this.dataJornadas.data = info;
            },
            altoModal: '300px',
            anchoModal: '450px'
        });
    }
}
