const fs = require('fs');
const featureDirectory = "./frontend/features"
const featureDirectoryNames = fs.readdirSync(featureDirectory)
function helpRegister() {

    const decorators = {}

    featureDirectoryNames.forEach(name => {
        const featureHasPackage = fs.existsSync(`${featureDirectory}/${name}/featurePackage.js`);
        if (!featureHasPackage) {
            process.emitWarning(`feature:${name} - `+"Feature must have featurePackage.js to be loaded but '" + `${featureDirectory}/${name}/featurePackage.js` + "' does not exist ");
        }
        const featureHasDecorators = fs.existsSync(`${featureDirectory}/${name}/decorators.json`);
        if (featureHasDecorators) {
            try {
                const string = fs.readFileSync(`${featureDirectory}/${name}/decorators.json`)
                const parsedDecorators = JSON.parse(string);
                decorators[name] = parsedDecorators;
            } catch (e) {
                process.emitWarning(`feature:${name} - decorators.json detected but error reading it\n\n` + e)
            }
        }
    })

    const manifest = {_featureNames:{}};
    featureDirectoryNames.forEach(name=>{
        manifest._featureNames[name]=name
        manifest[name]=decorators[name];
    });
    fs.writeFileSync("./frontend/Feature/features.autogen.json",JSON.stringify(manifest,null,2))
}
module.exports = helpRegister;