//Load url into a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Add JSON data into console log
d3.json(url).then(function(data) {
    console.log(data);
});

//Start up dashboard
function SUDB() {
    
    //select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    
    //get sample names
    d3.json(url).then((data)=> {
        
        //Array of id names
        let names = data.names;
        
        //iterate through names array
        names.forEach((name) => {

            //add name to dropdown menu
            dropdownMenu.append("option")
                .text(name)
                .property("value",name);
        });
        //create first name to from list
        let first_name = names[0];
        
        //log frist sample
        console.log(first_name);
       
        //build the initial plots
        buildMetadata(first_name);
        buildBarChart(first_name);
        buildBubbleChart(first_name);
        buildGauge(first_name);
    });
};

//function for metadata
function buildMetadata(sample) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;

        //filter on sample
        let value = metadata.filter(result => result.id == sample);

        //log arry of metadata after it has filtered
        console.log(value)

        //first index from array
        let valueData = value[0];

        //Clear metadata
        d3.select("#sample-metadata").html("");

        //adding each key, value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {
            
            //Log individual key/value pairs as they're being appened to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text("${key}: ${value}");
        });
    });
};

//build the bar chart
function buildBarChart(sample) {
    d3.json(url).then((data) => {
        let sampleInfo = data.sample;

        //filter on sample
        let value = sampleInfo.filter(result => result.id == sample);

        //first index from array
        let valueData = value[0];

        //get otu ids, labels, and values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        //Log data to console
        console.log(otu_ids, otu_labels,sample_values);

        //set top ten items to disply in descending order
        let yticks = otu_ids.slice(0,10).map(id => "OTU ${id}").reserse();
        let xticks = sample_values.slice(0,10).reserse();
        let labels = otu_labels.slice(0,10).reverse();

        //set up trace for bar chart
        let traceOne = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        //set up layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        //add Ploty to create bar chart
        Plotly.newPlot("bar",[traceOne], layout)
    });
};

//function for bubble chart
function buildBubbleChart(sample) {
    d3.json(url).then((data) => {
        let sampleInfo = data.samples;

        //filter the value of the sample
        let value = sampleInfo.filter(result => result.id == sample);

        //get first index from array
        let valueData = value[0];

        //Get otu_ids, labels, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_lables;
        let sample_values = valueData.sample_values;

        //log data to console
        console.log(otu_ids, otu_labels, sample_values);

        //set trace for bubble chart
        let traceTwo = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };
        //create bubble chart layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        //add Ploty to create bar chart
        Plotly.newPlot("bubble",[traceTwo], layout)
    });

};
//Function to Update dashboard when sample changes
function optionChanges(value) {
    
    //log new values
    console.log(value);

    //create functions
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGauge(value);
};

//call dashboard function
SUDB();
