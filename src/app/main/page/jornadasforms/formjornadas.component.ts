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

@Component({
    selector: 'formjornada',
    templateUrl: './formjornadas.component.html',
    styleUrls: ['./formjornadas.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class FormjornadasComponent implements OnInit, OnDestroy {
    pageType: string;
    jornadaForm: FormGroup = null;
    perfiles: any;
    jornada: any;
    jornada_coordinadores: any[];
    jornada_act: any[];
    voluntario_act: any[];
    coordinador_act: any[];
    public dataSource: MatTableDataSource<any> = new MatTableDataSource();
    public displayedColumns = ['nombre', 'apellido'];

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
        if (this._route.snapshot.paramMap.get('jornada') && this._route.snapshot.paramMap.get('jornada') !== 'new') {
            const idAct = Number(this._route.snapshot.paramMap.get('jornada'));
            this.jornada = await this._isfService.getJornadaById(idAct);
            this.dataSource.data = await this._isfService.getCoordinadoresAct(idAct);
            this.coordinador_act = await this._isfService.getCoordinadores();
            this.pageType = 'edit';
        } else {
            this.pageType = 'new';
            this.jornada = {
                fecha: '',
                direccion: '',
                descripcion: ''
            };
            this.dataSource.data = [];
        }

        this.jornadaForm = this.createjornadaForm();
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
    createjornadaForm(): FormGroup {
        return this._formBuilder.group({
            fecha: [this.jornada.fecha],
            direccion: [this.jornada.direccion],
            descripcion: [this.jornada.descripcion],
            idjornada: [this.jornada.idjornada]
        });
    }

    /**
     * Save jornada
     */
    async savejornada(): Promise<void> {
        this._fuseProgressBarService.show();
        const data = this.jornadaForm.getRawValue();
        data.handle = FuseUtils.handleize(data.direccion);

        await this._isfService.saveJornada(data, this.dataSource.data);

        this._matSnackBar.open('jornada grabada', 'OK', {
            verticalPosition: 'top',
            duration: 2000
        });

        this._fuseProgressBarService.hide();
        this._router.navigate(['jornadas']);
    }

    /**
     * Add jornada
     */
    async addjornada(): Promise<void> {
        this._fuseProgressBarService.show();
        try {
            const data = this.jornadaForm.getRawValue();
            data.handle = FuseUtils.handleize(data.direccion);

            await this._isfService.addJornada(data, this.dataSource.data);

            // Show the success message
            this._matSnackBar.open('jornada grabada', 'OK', {
                verticalPosition: 'top',
                duration: 2000
            });

            // Change the location with new one
            this._router.navigate(['jornadas']);
        } catch (e) {
            if (e.error) {
                this._matSnackBar.open(e.error, 'Aceptar', {
                    verticalPosition: 'top',
                    panelClass: 'errorSnackBar',
                    duration: 2000
                });
            } else {
                this._matSnackBar.open('Ocurrio un error al grabar la jornada!. Intente más tarde.', 'Aceptar', {
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

    addCoordinador(): void {

        this.openDialogAdd({
            etiqueta: 'AddVoluntario',
            txtBoton: 'Seleccionar',
            items: this.coordinador_act,
            callback: async (item) => {
                const info = this.dataSource.data;
                info.push(item);
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
            items: this.coordinador_act,
            callback: async (item) => {
                const info = this.dataSource.data;
                info.push(item);
                this.dataSource.data = info;
            },
            altoModal: '300px',
            anchoModal: '450px'
        });
    }
  
}
