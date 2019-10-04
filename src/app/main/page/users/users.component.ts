import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import {fuseAnimations} from '../../../../@fuse/animations';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FuseProgressBarService} from '../../../../@fuse/components/progress-bar/progress-bar.service';
import {ISFService} from '../../../services/isf.service';
import {fromEvent} from 'rxjs';

@Component({
    selector   : 'users',
    templateUrl: './users.component.html',
    styleUrls  : ['./users.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit
{
    public dataSource: MatTableDataSource<any>;
    public displayedColumns = ['apellido', 'nombre', 'email', 'accion'];
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
        private _isfService: ISFService
    )
    {
        this._fuseProgressBarService.show();
        this.perfiles = [];
    }

    async ngOnInit()
    {
        const data = await this._isfService.getAllUsers();
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
}
