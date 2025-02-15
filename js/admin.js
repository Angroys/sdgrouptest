window.onload = () => {
    const pagepicker = document.querySelector("select"),
        datepicker = document.querySelector("input[type='date']"),
        urlParams = new URLSearchParams(window.location.search),
        nr_records = urlParams.get('nr_records'),
        start_date = urlParams.get('start_date');
    if (nr_records)
        pagepicker.value = nr_records
    else
        pagepicker.value = 25;

    pagepicker.onchange = function () {
        urlParams.set('nr_records', pagepicker.value);
        window.location.search = urlParams.toString();
    }
    datepicker.onchange = function () {
        urlParams.set('start_date', datepicker.value);
        window.location.search = urlParams.toString();
    }
}