//load the samples.json
.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json');
   then(data => {
       
    //data for bar chart
    const samples = data.samples;
    const firstSample = samples[0];
    const sampleValues = firstSample.sample_values.slice(0, 10);
    const otuIds = firstSample.otu_ids.slice(0,10);
    const otuLabels = firstSample.otu_labels.slice(0,10);
       
    //create bar chart 
    createBarChart(sampleValues, otuIds, otuLabels);
       
     //add dropdown menu
    const dropdown = d3.select('#dropdown');  
    const options = dropdown.selectAll('option')
        .data(samples)
        .enter()
        .append('option')
        .text(sample => sample.id);

    //add event listener to dropdown menu
    dropdown.on('change',() => {
        const selectedSample = dropdown.property('value');
        const selectedData = samples.find(sample => sample.id == selectedSample);
        const selectedSampleValues = selectedData.sample_values.slice(0, 10);
        const selectedOtuIds = selectedData.otu_ids.slice(0, 10);
        const selectedOtuLabels = selectedData.otu_labels.slice(0, 10);

        //Update the bar chart with individual's data
        updateBarChart(selectedSampleValues, selectedOtuIds, selectedOtuLabels);
        });        
    })
    .catch(error => {
        console.error('Error loading JSON file:', error);
    });

//create the bar chart
function createBarChart(sampleValues, otuIds, otuLabels){
    const chartContainer = d3.select('#chart-container');

    //SVG container
    const svg = chartContainer.append('svg')
        .attr('width', '100%')
        .attr('height', '500px');

    //Create bars
    const barGroup = svg.selectAll('g')
        .data(sampleValues)
        .enter()
        .append('g')
        .attr('transform', (d,i) => 'translate(0, ${i * 40})');
    
    barGroup.append('rect')
        .attr('width', d => '${d}%')
        .attr('height', 30)
        .attr('fill', 'steelblue');

    //add labels
    barGroup.append('text')
        .attr('x', 5)
        .attr('y', 20)
        .attr((d,i) => '${otuIds[i] - ${otuLabels[i]}')
        .attr('fill','white');

    //hovertext to bars
    barGroup.append('title')
        .text((d,i) => '${otuIds[i]} - ${otuLabels[i]}');
 }

 

    
