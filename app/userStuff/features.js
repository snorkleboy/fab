const filterViewDecorators = require("../../frontend/features/filters/schemas/decorators")
const {Feature,ComponentMapping,ComponentPackage} = require("./Feature")

const featureNames = {"listView":"listView","filterView":"filterView"}
const componentMappings = {
    listContainer:new ComponentMapping("list/listContainer.js", "tabberView"),
    filterButtonsContainer:new ComponentMapping("filters/filterButtonsContainer.js", "tabberView")
}
const baseFeatures = {};
baseFeatures[featureNames.listView] =new Feature([
    new ComponentPackage(componentMappings.listContainer)
])
baseFeatures[featureNames.filterView] = new Feature([
    new ComponentPackage(componentMappings.filterButtonsContainer,filterViewDecorators)
])


module.exports = {
    baseFeatures
}

