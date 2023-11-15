let monthNames = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];
    let d = new Date();
    let endDate = "";
    d.setDate(1);
    for (let i = 0; i< 11; i++) {
        d.setMonth(d.getMonth() - 1);
        endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
    }
