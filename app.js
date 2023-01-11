console.log("Hello Back to School!");
let viz;
//1. Create a variable to store the Viz Container
//2. Create a variable to store the dashboard options
//3. Create a variable to store the URL - if it doesn't load, might need to specify height and width
const containerDiv = document.getElementById("vizContainer");
const options = {
  device: "desktop",
  height: "900px",
  width: "1100px",
};
//Ensure a URL exists to connect to the Tableau JavaScript API
const url =
  "https://public.tableau.com/views/Embeddingexample/Embeddingexample?:language=en-GB&publish=yes&:display_count=n&:origin=viz_share_link";
function initViz() {
  viz = new tableau.Viz(containerDiv, url, options);
}
//Add an event listener to populate the Viz
document.addEventListener("DOMContentLoaded", initViz);
//Set up buttons for interaction, then action through a listener, then how you want said function mentioned in the listener to operate
const exportpdfbutton = document.getElementById("exportPDF");
exportpdfbutton.addEventListener("click", exportPDFfunction);
function exportPDFfunction() {
  viz.showExportPDFDialog();
}
const exportpowerpointbutton = document.getElementById("exportPowerPoint");
exportpowerpointbutton.addEventListener("click", exportPowerPointfunction);
function exportPowerPointfunction() {
  viz.showExportPowerPointDialog();
}
//Create filter functions
function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  //Get active sheets, but it could be a dashboard or worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //Inspect the sheets to be filtered
  console.log(sheets);
  //Index of the sheets you want to filter
  const sheetToFilter = sheets[1];
  //Do the filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}
//Event Listener for functions
document
  .getElementById("FilterButton")
  .addEventListener("click", getRangeValues);
