import * as bcrypt from 'bcrypt';

interface SeedCustomer {
    dni: string;
    password: string;
    fullName: string;
    roles: string[];
}

interface SeedOperation {
    importe: number;
    tipoOperacion: string;
    detalle: string;
}

interface SeedData {
    customers: SeedCustomer[];
    operations: SeedOperation[];
}

export const initialData: SeedData = {
    customers: [
        {
            dni: '48414099',
            password: bcrypt.hashSync('1234', 10),
            fullName: 'Stephanie Castillo',
            roles: ['admin']
        },
        {
            dni: '37161619',
            password: bcrypt.hashSync('5678', 10),
            fullName: 'Facundo Carballal',
            roles: ['user', 'super']
        },
        {
            dni: '37161618',
            password: bcrypt.hashSync('9101', 10),
            fullName: 'Antonnela Russo',
            roles: ['admin']
        },
        {
            dni: '37161613',
            password: bcrypt.hashSync('1121', 10),
            fullName: 'Benito Bannie',
            roles: ['user', 'super']
        }
    ],
    operations: [
        {
            importe: 500.000,
            tipoOperacion: 'Extracción',
            detalle: 'Extracción',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'Deposito',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extracción',
            detalle: 'Extracción' 
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'Deposito',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extracción',
            detalle: 'Extracción',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'Deposito',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extracción',
            detalle: 'Extracción'
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'Deposito',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extracción',
            detalle: 'Extracción',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'Deposito',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extracción',
            detalle: 'Extracción',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'Deposito'
        },
        {        
            importe: 500.000,
            tipoOperacion: 'Extracción',
            detalle: 'Extracción',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'Deposito',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extracción',
            detalle: 'Extracción',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'Deposito'
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extracción',
            detalle: 'Extracción',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'Deposito',
        }
    ],
}