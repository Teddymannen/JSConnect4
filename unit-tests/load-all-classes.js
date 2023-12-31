// Load the jsdom library (a mock DOM/browser environment)
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// Mock window and document objects of the DOM
const { window } = new JSDOM(`...`);
const { document } = (new JSDOM(`...`)).window;
// Make window and document available for the program code
globalThis.window = window;
globalThis.document = document;

// fs -> node.js library to handle the file system
let fs = require('fs');
// path -> node.js library to handle file paths
let path = require('path');
// path to index.html
let indexPath = path.join(__dirname, '..', 'index.html');
// path to the classes folder
let classesPath = path.join(__dirname, '..', 'classes');

// get all the classNames from index.html
let classNames = fs.readFileSync(indexPath, 'utf-8')
  .split('classes/').slice(1)
  .map(fileName => fileName.split('"')[0].slice(0, -3));

// load the classes into memory for use with Jest tests
classNames.forEach(className => {
  let content = fs.readFileSync(
    path.join(classesPath, className + '.js'), 'utf-8'
  );
  eval(`globalThis.${className} = ${content}`);
});