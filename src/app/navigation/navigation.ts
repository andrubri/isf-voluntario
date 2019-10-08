import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'Usuarios',
        title    : 'Usuarios',
        translate: 'Usuarios',
        type     : 'item',
        icon     : 'person',
        url      : '/users',

    },    {
        id       : 'Actividades',
        title    : 'Actividades',
        translate: 'Actividades',
        type     : 'item',
        icon     : 'home',
        url      : '/actividades',

    }
];
