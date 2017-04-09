var json;

$(document).ready(function () {

    Highcharts.setOptions({
        colors: ['#6DB1BE',
            '#E64B73',
            '#E3DF47',
            '#09AAA5',
            '#F56B6D',
            '#242527',
            '#D91569',
            '#8C51A1'
        ]
    });

    $.getJSON("jsonData", function (j) {
        obj = JSON.parse(j);
        json = obj;
        addDrillDown("words");
        addPieChart("gender");
        addBarChart("device");
        addAreaChart("post");
        addPieChart("pub");
    });

    /*
     * GENDER
     */
    $('#pie-gender').click(function (e) {
        e.preventDefault();

        $.get("pagina", function () {
            alert(1);
        })

        addPieChart("gender");

    });

    $('#bar-gender').click(function (e) {
        e.preventDefault();
        addBarChart("gender");
    });

    $('#column-gender').click(function (e) {
        e.preventDefault();
        addColumnChart("gender");
    });

    /*
     * DEVICE
     */
    $('#pie-device').click(function (e) {
        e.preventDefault();
        addPieChart("device");
    });

    $('#bar-device').click(function (e) {
        e.preventDefault();
        addBarChart("device");
    });

    $('#column-device').click(function (e) {
        e.preventDefault();
        addColumnChart("device");
    });

    /*
     * POST
     */
    $('#column-post').click(function (e) {
        e.preventDefault();
        addColumnChart("post");
    });

    $('#area-post').click(function (e) {
        e.preventDefault();
        addAreaChart("post");
    });

    /*
     * PUBLISHERS
     */
    $('#pie-pub').click(function (e) {
        e.preventDefault();
        addPieChart("pub");
    });

    $('#column-pub').click(function (e) {
        e.preventDefault();
        addColumnChart("pub");
    });

    /*
     * WORDS
     */
    $('#column-words').click(function (e) {
        e.preventDefault();
        addDrillDown("words");
    });
    $('#bar-words').click(function (e) {
        e.preventDefault();
        addBarChart("words");
    });

});

/*
 * Pie chart
 *
 */
function addPieChart(container) {
    var data;
    var name = "";
    if (container == "device") {
        name = "Dispositivos";
        data = getDeviceData();
    } else if (container == "gender") {
        name = "Gênero";
        data = getGenderData();
    } else if (container == "pub") {
        name = "Publicadores";
        data = getPubData();
    }
    Highcharts.chart(container + '-container', {
        chart: {
            backgroundColor: '#f5f5f5',
            plotBackgroundColor: '#f5f5f5',
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: null
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{point.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: name,
            colorByPoint: true,
            data: data
        }]
    });

}

/*
 * Bar chart
 */
function addBarChart(container) {
    var data;
    var name;
    if (container == "device") {
        data = getDeviceData();
        name = "Dispositivos";
    } else if (container == "gender") {
        data = getGenderData();
        name = "Gênero";
    } else {
        data = getWordDataTotal();
        name = "Palavras";
    }
    var titles = [];
    for (var i = 0; i < data.length; i++) {
        titles[i] = data[i][0];
    }
    Highcharts.chart(container + '-container', {
        chart: {
            backgroundColor: '#f5f5f5',
            plotBackgroundColor: '#f5f5f5',
            type: 'bar'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: titles,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{series.name}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{point.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                colorByPoint: true
            },
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            enabled: false,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: name,
            data: data
        }]
    });
}

/*
 * Area Chart
 *
 */
function addAreaChart(container) {
    var data = [];
    var titles = [];
    var post = getPostData();
    var name = "Postagens";
    for (var i = 0; i < post.length; i++) {
        titles[i] = post[i][0];
        data[i] = post[i][1];
    }
    Highcharts.chart(container + '-container', {
        chart: {
            backgroundColor: '#f5f5f5',
            plotBackgroundColor: '#f5f5f5',
            type: 'area'
        },
        title: {
            text: null
        },
        xAxis: {
            categories: titles,
            labels: {
                formatter: function () {
                    return this.value.split(" ")[0];
                }
            }
        },
        yAxis: {
            title: {
                text: 'Postagens'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        plotOptions: {
            area: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: name,
            data: data
        }]
    });

}

/*
 * Column Chart
 *
 */
function addColumnChart(container) {
    var data = [];
    var titles = [];
    var name;
    var dados;
    if (container == "post") {
        name = "Postagens";
        dados = getPostData();
    } else if (container == "device") {
        name = "Dispositivos";
        dados = getDeviceData();
    } else if (container == "gender") {
        name = "Gêneros";
        dados = getGenderData();
    } else {
        name = "Publicadores";
        dados = getPubData();
    }
    for (var i = 0; i < dados.length; i++) {
        titles[i] = dados[i][0];
        data[i] = dados[i][1];
    }
    Highcharts.chart(container + '-container', {
        chart: {
            backgroundColor: '#f5f5f5',
            plotBackgroundColor: '#f5f5f5',
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        xAxis: {
            categories: titles,
            crosshair: true,
            labels: {
                formatter: function () {
                    if (container == "post") {
                        return this.value.split(" ")[0];
                    } else {
                        return this.value;
                    }
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:15px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0"></td>' +
            '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                colorByPoint: true,
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: name,
            data: data
        }]
    });
}

/*
 * COLUMN DRILLDOWN
 */
function addDrillDown(container) {
    var words = getWordData();
    var serie = [];
    var drilldown = [];
    for (var i = 0; i < words.length; i++) {
        serie[i] = {
            name: words[i].name,
            y: words[i].total,
            drilldown: words[i].name
        }
        drilldown[i] = {
            name: words[i].name,
            id: words[i].name,
            data: [{
                name: 'positivo',
                y: words[i].positive,
                color: '#4CAF50'
            },
                {
                    name: 'negativo',
                    y: words[i].negative,
                    color: '#F44336'
                },
                {
                    name: 'neutro',
                    y: words[i].neutral,
                    color: '#757575'
                }
            ]
        }
    }
    Highcharts.chart(container + '-container', {
        chart: {
            backgroundColor: '#f5f5f5',
            plotBackgroundColor: '#f5f5f5',
            type: 'column'
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total de usos'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>'
        },
        series: [{
            name: 'Words',
            colorByPoint: true,
            data: serie
        }],
        drilldown: {
            series: drilldown
        }
    });
}


function getGenderData() {
    return json.talking_about.gender[1];
}

function getDeviceData() {
    return json.talking_about.device[1];
}

function getPostData() {
    return json.posts_in_time[1];
}

function getPubData() {
    return json.talking_about.publishers[1];
}

function getWordData() {
    return json.despritors_in_posts;
}

function getWordDataTotal() {
    var words = getWordData();
    var serie = [];
    for (var i = 0; i < words.length; i++) {
        serie[i] = [words[i].name, words[i].total];
    }
    return serie;
}
