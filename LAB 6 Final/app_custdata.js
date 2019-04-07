
const fs =  require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const custs = require('./custdata.js');

// ------------ Begin - command configuration -----------------



const custIdOptions = {
    describe: 'Customer ID',
    demand : true,
    alias : 'i'
}

const custDetailsOptions = {
    describe: 'Customer Details',
    demand : true,
    alias : 'd'
}
const custNameOptions = {
    describe: 'Customer Name',
    demand : true,
    alias : 'n'
}
const custEmailOptions = {
    describe: 'Customer Email',
    demand : true,
    alias : 'e'
}
const custCategoryOptions = {
    describe: 'Customer Category',
    demand : true,
    alias : 'g'
}
const argv =  yargs

    .command('add','Add a new customer',{
        custId: custIdOptions,
        custDetails: custDetailsOptions,
        custName: custNameOptions,
        custEmail: custEmailOptions,
        custCategory: custCategoryOptions

    })
    .command('list','List all customers')
    .command('read','Read a note',{
        custid: custIdOptions
    })
    .command('display','display a customer',{

        custid: custIdOptions
    })
    .command('remove','Remove a Customer',{

        custid: custIdOptions
    })
    .help()
    .argv;



// ------------ End - command configuration -----------------


var command = argv._[0];


if (command === 'add'){
    var cust = custs.addCust(argv.custId,argv.custDetails,argv.custName,argv.custEmail,argv.custCategory);
    if (cust){
        custs.logCust(cust);                                //add a new customer
    } else{
        console.log("Customer already exists");
    }
}
else if (command === 'list') {
    var AllCusts = custs.getAll();
    console.log(`Printing ${AllCusts.length} customers(s).`);
    AllCusts.forEach((cust)=>{                                // all customers(s)
        custs.logCust(cust);
    });
}
else if (command === 'display') {
    var cust = notes.getCust(argv.custDetails,argv.custName,argv.custEmail,argv.custCategory);
    if(cust){
        custs.logCust(cust);                                //Displays a customer
    }
    else{
        console.log("Customer not found");
    }
}
else{
    console.log('command note recognized');
}