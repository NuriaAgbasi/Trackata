import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    const modifiedData = this.preprocessData(props.data, props.labels);

    const maxDataValue = Math.max(...modifiedData);
    const yAxisMax = Math.ceil(maxDataValue * 1.1);

    this.state = {
      series: [
        {
          data: modifiedData,
        },
      ],
      options: {
        chart: {
          id: "realtime",
          height: 350,
          type: "line",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: "datetime",
          categories: props.labels,
        },
        yaxis: {
          max: yAxisMax,
        },
        legend: {
          show: false,
        },
      },
    };
  }

  preprocessData(data, labels) {
    const currentDate = new Date();
    const modifiedData = data.map((value, index) => {
      const date = new Date(labels[index]);
      if (date < currentDate) {
        if (currentDate.getDate() - date.getDate() !== 1) {
          return 0;
        }
      }
      return value;
    });
    modifiedData[0] = 0;
    return modifiedData;
  }

  componentDidMount() {
    window.setInterval(() => {
      ApexCharts.exec("realtime", "updateSeries", [
        {
          data: this.props.data,
        },
      ]);
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      const modifiedData = this.preprocessData(this.props.data, this.props.labels);
      this.setState({
        series: [
          {
            data: modifiedData,
          },
        ],
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: this.props.labels,
          },
        },
      });
    }
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="line"
            height={350}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default ApexChart;
