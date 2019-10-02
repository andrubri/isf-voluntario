import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'Usuarios',
        title    : 'Usuarios',
        translate: 'Usuarios',
        type     : 'item',
        icon     : 'person',
        url      : '/login',

    },
    {
        id       : 'Actividad',
        title    : 'Actividad',
        translate: 'Actividad',
        type     : 'group',
        url      : '/login',

        children : [
            {
                id       : 'pileta',
                title    : 'pileta',
                translate: 'pileta',
                type     : 'item',
                icon     : 'pool',
                url      : '/login',

            },
            {
                id       : 'puente',
                title    : 'puente',
                translate: 'puente',
                type     : 'item',
                icon     : 'forward',
                url      : '/login',

            },
            {
                id       : 'cancha',
                title    : 'cancha',
                translate: 'cancha',
                type     : 'item',
                icon     : 'sports_tennis',
                url      : '/login',

            },
            
        ]
    },
    {
        id       : 'Jornada',
        title    : 'Jornada',
        translate: 'Jornada',
        type     : 'group',
        url      : '/login',

        children : [
            {
                id       : 'pileta',
                title    : 'pileta',
                translate: 'pileta',
                type     : 'item',
                icon     : 'pool',
                url      : '/login',

            },
            {
                id       : 'puente',
                title    : 'puente',
                translate: 'puente',
                type     : 'item',
                icon     : 'forward',
                url      : '/login',

            },
            {
                id       : 'cancha',
                title    : 'cancha',
                translate: 'cancha',
                type     : 'item',
                icon     : 'sports_tennis',
                url      : '/login',

            },
            
        ]
    },
    
];
