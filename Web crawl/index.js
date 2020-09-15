const fs = require('fs');
const got = require('got');
const Excel = require('exceljs');
const nodemailer = require("nodemailer");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const url= 'https://myshop.pk/apple-store-pakistan/iphone/iphone-11'; // main link

var links=[];


console.log("This code work perfect when you add password in line number 151")


got(url).then(res => {
    const pageDom =  new JSDOM(res.body.toString()).window.document;
    const element = pageDom.querySelectorAll(".product-item-info");

    element.forEach(even => {
        const found = even.querySelector('div').querySelector('a').getAttribute('href'); // parent to child paths
        links.push(found);
        
    });
    getLinks(links); //get links and push it to an arrays
});


function getLinks(temp){
    var count=0;
    var data = new Array(8);

    for (var i = 0; i < data.length; i++) { 
        data[i] = []; 
    }

    for (i=0;i<temp.length;i++){
        tempUrl = temp[i];
        
        
        got(tempUrl).then(res => {
            
            const tempPageDom =  new JSDOM(res.body.toString()).window.document;
            
           //printing the prices

           console.log("\n\nIphone number %d\n\n" ,count+1);
            const prices = tempPageDom.querySelector(".price");
            console.log("Price: " + prices.textContent);
            data[count][0]=prices.textContent

            const tr = tempPageDom.querySelectorAll("tr");
            tr.forEach(get => {
               
                
                // print the model
                if(get.querySelector('th').textContent=="Model"){
                    console.log("Model: " + get.querySelector('td').textContent);
                    data[count][1]=get.querySelector('td').textContent
                }
                
                //color

                if(get.querySelector('th').textContent=="Color"){
                    console.log("Color: " + get.querySelector('td').textContent);
                    data[count][2]=get.querySelector('td').textContent;
                }
                
                // internal storage
                if(get.querySelector('th').textContent=="Internal Storage"){
                    console.log("Internal Storage: " + get.querySelector('td').textContent);
                    data[count][3]=get.querySelector('td').textContent;
                }

                // RAM
                if(get.querySelector('th').textContent=="RAM"){
                    console.log("RAM: " + get.querySelector('td').textContent);
                    data[count][4]=get.querySelector('td').textContent;
                }

                //Weight
                if(get.querySelector('th').textContent=="Weight"){
                    console.log("Weight: " + get.querySelector('td').textContent);
                    data[count][5]=get.querySelector('td').textContent;
                }
                
                
                
            });
           
            count++
            if (count==temp.length){
                makeFile(data); // calling the funnction and passing the array with complete data
            }
        });
        

        
    }


}




// create workbook & add worksheet
async function makeFile(arrayData){
var workbook = new Excel.Workbook();
var worksheet = workbook.addWorksheet('Discography');

// add column headers
worksheet.columns = [
    { header: 'Price', key: 'price'},
    { header: 'Model', key: 'model'},
    { header: 'RAM', key: 'ram'},
    { header: 'Internal Storage', key: 'internal storage'},
    { header: 'Weight', key: 'weight'},
    { header: 'Color', key: 'color'},
];
// add an array of rows
worksheet.addRows(arrayData); // add data tto excel

// save workbook to disk
workbook.xlsx.writeFile('Data.xlsx').then(function() {
  console.log("saved"); // prompt message  that the file is saved
  emailFile();
});
}
    






// EMail work








function emailFile(){
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'haziqmajeed95@gmail.com',
           pass: '', // ADD YOUR PASSWORD HERE
       }
   });
   const mailOptions = {
    from: 'haziqmajeed95@gmail.com', // sender address
    to: 'haziqmajeed95@gmail.com', // list of receivers
    subject: 'Email recieve from NodeJS', // Subject line
    html: '<p>Your html here</p>',// plain text body
    attachments: [{
        filename: 'Data.xlsx',
        path: 'F:/Visual Code/Web crawl/Data.xlsx',
    }]
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log("SUCCESSFULLY EMAILED" + info);
 });
}