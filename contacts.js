const fs = require('node:fs');
const chalk = require('chalk');
const validator = require('validator');

const dirPath = './data'
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

const datPath = './data/contacts.json'
if (!fs.existsSync(datPath)) {
    fs.writeFileSync(datPath, '[]', 'utf-8');
}

const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer)

    return contacts;
}

const inputContact = (nama, email, phone) => {
    const contact = { nama, email, phone };

    const contacts = loadContact ()

    const duplikat = contacts.find((contact) => contact.nama === nama);
    if (duplikat) {
        console.log(chalk.red.inverse.bold ('Gagal menambahkan kontak, nama sudah digunakan!'))
        return false;
    }

    if (email && email !== '-') {
        if (!validator.isEmail(email)) {
            console.log(chalk.red.inverse.bold ('Email tidak valid!'))
            return false;
        } 
    }

    if (!validator.isMobilePhone(phone, 'id-ID')){
        console.log(chalk.red.inverse.bold ('Nomor Handphone tidak valid!'))
        return false;
    }

    contacts.push(contact);
    
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
    console.log(chalk.green.inverse.bold(`Berhasil menambahkan kontak baru!`))
}

const listContact = () => {
    const contacts = loadContact();

    console.log(chalk.cyan.inverse.bold(`Daftar Kontak`))
    contacts.forEach((contact, i) => {
        console.log(`${i+1}. ${contact.nama} - ${contact.phone}`)
    })
}

const detailContact = (nama) => {
    const contacts = loadContact();

    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if (!contact) {
        console.log(chalk.red.inverse.bold (`Nama ${nama} tidak ditemukan!`));
        return false;
    }

    console.log(chalk.cyan.inverse.bold(`Detail Kontak ${contact.nama}`))
    console.log(`Nomor Telepon : ${contact.phone}`)
    if (contact.email) {
        console.log(`Email : ${contact.email}`)
    }
}

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());

    if (newContact.length === contacts.lenth){
        console.log(chalk.red.inverse.bold (`Nama ${nama} tidak ditemukan!`));
        return false;
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact));
    console.log(chalk.green.inverse.bold(`Berhasil menghapus kontak ${nama}!`))
}

module.exports = { inputContact, listContact, detailContact, deleteContact }