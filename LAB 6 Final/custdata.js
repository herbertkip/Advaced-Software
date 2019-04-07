const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchCusts = () => {
    try {                          //if file won't exist
        var custsString = fs.readFileSync('customer-data.json')
        return JSON.parse(notesString);
    } catch(e){
        return [];
    }
};

var saveCusts = (custs) => {
    fs.writeFileSync('customer-data.json',JSON.stringify(cust));
};


// ------------------End of Reusable functions ---------------------


//  to add a new customer

var addCust = (custId,custDetails) => {
    var custs = fetchCusts();
    var cust = {custId,custDetails};

    var duplicateCusts =  custs.filter((cust) => { // to check if the customer already exists
        return cust.custId === custId;
    });

    if (duplicateCusts.length === 0){
        custs.push(cust);

        saveCusts(custs);
        return cust
    }

};

//to list all the customers

var getAll = () => {
    return fetchCusts();

};


// to display a customer

var getCust = (custId) => {

    var custs = fetchCusts();

    var getCusts =  custs.filter((cust) => {  // to check if a customer exists and return customer
        return cust.custId === custId;
    });

    return getCusts[0]

};

// to delete a note

var remove = (custId) => {

    var custs = fetchCusts(); // reusable func

    var filteredCusts =  custs.filter((cust) => { // will return all other notes other than "note to be removed"
        return cust.custId !== custId;
    });

    saveCusts(filteredCusts); //save new customer array

    return custs.length !== filteredCusts.length

};

// function just to print out note to screen

var logCust = (cust) => {
    console.log('--');
    console.log(`custId: ${cust.custId}`);
    console.log(`custDetails: ${note.custDetails}`);
    console.log(`custName: ${note.custName}`);
    console.log(`custEmail: ${note.custEmail}`);
    console.log(`custCategory: ${note.custCategory}`);
};

// add new function names here to be accessible from other modules

module.exports = {
    addCust, getAll, remove, getCust,logCust
};
