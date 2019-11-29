import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import {
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule
} from '@angular/material';


import { EmailComponent} from './email.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const routes = [
    {
        path     : 'modal',
        component: EmailComponent
    }
];

@NgModule({
    declarations: [
      EmailComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        TranslateModule,
        FuseSharedModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatCardModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule
    ],
    exports     : [
      EmailComponent
    ]
})

export class EmailModule
{
}
