// Get a reference to the table body and data file
var tbody = d3.select("tbody");
var ufo_data = data;
var button = d3.select("#filter-btn");
var button_clear = d3.select("#clear-btn");

// Print complete table to start
ufo_data.forEach((element)=>{
    var row = tbody.append("tr");
    Object.values(element).forEach((value)=>{row.append("td").text(value);
    })    
})

// Get a reference to the filters field
var date_field = d3.select("#datetime");
var inputs = d3.selectAll(".form-control");

// Create event handlers 
button.on("click", runEnter);
inputs.on("change", runEnter);
// button_clear.on("click", ()=>)

function runEnter() {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Clean table
    tbody.html("")
    // Get the value property of the input element
    var inputDate = date_field.property("value");
    

    // Create filters dictionary
    var filters={
        datetime:inputDate,
    }
    
    // Fillter Data
    var filterdData = ufo_data.filter(item => {
        return Object.keys(filters).every(filter => {
            if(filters[filter]==""){return true}
            return filters[filter] === item[filter]
        });
    })
    
    if (filterdData.length===0){
        var row = tbody.append("tr");
        row.append("td").text("No information found with selected filters").attr("colspan", "7");;
    }
      
    // If fields are empty, print complete table, else print the Filtered Data
    if (inputDate == ""){
        ufo_data.forEach((element)=>{
            var row = tbody.append("tr");
            Object.values(element).forEach((value)=>{row.append("td").text(value);
            })    
        })
    }else{
        // Produce table with filtered data
        filterdData.forEach((element)=>{var row = tbody.append("tr");
        Object.values(element).forEach((value)=>{row.append("td").text(value);
        })    
    })
    }    

}


// Animations
// new WOW().init();