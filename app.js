const yargs = require('yargs')
const {inputContact, listContact, detailContact, deleteContact} = require('./contacts')

yargs.command({
    command: 'add',
    describe: 'Menambahkan Kontak Baru',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
        email: {
            describe: 'Email',
            demandOption: false,
            type: 'string',
            default: '-'
        },
        phone: {
            describe: 'Nomor Handphone',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        inputContact (
            argv.nama,
            argv.email,
            argv.phone,
        )
    }
}).demandCommand();

yargs.command({
    command: 'list',
    describe: 'List Semua Kontak',
    handler(){
        listContact();
    }
})

yargs.command({
    command: 'detail',
    describe: 'Detail Kontak',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        detailContact(argv.nama);
    }
})

yargs.command({
    command: 'delete',
    describe: 'Menghapus Kontak',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption: true,
            type: 'string',
        }
    },
    handler(argv){
        deleteContact(argv.nama);
    }
})

yargs.parse();