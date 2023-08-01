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
            dni: '37161616',
            password: bcrypt.hashSync('Abc123', 10),
            fullName: 'Test 1',
            roles: ['admin']
        },
        {
            dni: '37161619',
            password: bcrypt.hashSync('Abc124', 10),
            fullName: 'Test 2',
            roles: ['user', 'super']
        },
        {
            dni: '37161618',
            password: bcrypt.hashSync('Abc125', 10),
            fullName: 'Test 3',
            roles: ['admin']
        },
        {
            dni: '37161613',
            password: bcrypt.hashSync('Abc126', 10),
            fullName: 'Test 4',
            roles: ['user', 'super']
        }
    ],
    operations: [
        {
            importe: 500.000,
            tipoOperacion: 'Extraccion',
            detalle: 'jfhhkhjhjhjhj',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'jfhhkhjhjhhhhjhj',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extraccion',
            detalle: 'jfhhkhjhjhjhj' 
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'jfhhkhjhjhhhhjhj',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extraccion',
            detalle: 'jfhhkhjhjhjhj',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'jfhhkhjhjhhhhjhj',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extraccion',
            detalle: 'jfhhkhjhjhjhj'
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'jfhhkhjhjhhhhjhj',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extraccion',
            detalle: 'jfhhkhjhjhjhj',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'jfhhkhjhjhhhhjhj',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extraccion',
            detalle: 'jfhhkhjhjhjhj',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'jfhhkhjhjhhhhjhj'
        },
        {        
            importe: 500.000,
            tipoOperacion: 'Extraccion',
            detalle: 'jfhhkhjhjhjhj',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'jfhhkhjhjhhhhjhj',
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extraccion',
            detalle: 'jfhhkhjhjhjhj',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'jfhhkhjhjhhhhjhj'
        },
        {
            importe: 500.000,
            tipoOperacion: 'Extraccion',
            detalle: 'jfhhkhjhjhjhj',
        },
        {
            importe: 300.000,
            tipoOperacion: 'Deposito',
            detalle: 'jfhhkhjhjhhhhjhj',
        }
    ],
}