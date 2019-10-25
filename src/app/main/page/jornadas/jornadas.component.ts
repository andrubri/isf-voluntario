import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {ISFService} from '../../../services/isf.service';
import {fromEvent} from 'rxjs';
import {AccionConfirmarComponent} from '../../modal/AccionConfirmar/accionconfirmar.component';

@Component({
    selector   : 'jornadas',
    templateUrl: './jornadas.component.html',
    styleUrls  : ['./jornadas.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class jornadasComponent implements OnInit
{
    public dataSource: MatTableDataSource<any>;
    public displayedColumns = ['fecha', 'direccion', 'descripcion', 'accion'];
    public perfiles: [];

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild('filter')
    filter: ElementRef;

    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _fuseProgressBarService: FuseProgressBarService,
        private _isfService: ISFService,
        private _dialog: MatDialog
    )
    {
        this._fuseProgressBarService.show();
        this.perfiles = [];
    }

    async ngOnInit()
    {
        const data = await this._isfService.getAllJornadas();
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        fromEvent(this.filter.nativeElement, 'keyup')
            .subscribe(() => {
                if ( !this.dataSource )
                {
                    return;
                }
                this.dataSource.filter = this.filter.nativeElement.value;
            });
        this._fuseProgressBarService.hide();
    }

    private openDialogConfirm(datos: any) {
        this._dialog.open(AccionConfirmarComponent, {
            width: datos.anchoModal ? datos.anchoModal : "50%",
            height: datos.altoModal ? datos.altoModal : "17%",
            data: datos,
            panelClass: "popup"
        });
    }

    async remove(idjornada: number){
        this.openDialogConfirm({
            etiqueta: "AccionOpciones",
            titulo1: "¿Esta seguro que desea eliminar ",
            titulo2: "la jornada?",
            txtBoton: "Eliminar",
            callback: async () => {
                this._fuseProgressBarService.show();
                await this._isfService.removeJornada(idjornada);
                this.ngOnInit();
            },
            altoModal: "300px",
            anchoModal: "450px"
        });
    }
}
