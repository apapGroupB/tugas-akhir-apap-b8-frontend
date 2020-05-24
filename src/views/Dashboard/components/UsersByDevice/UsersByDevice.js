import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ResponsivePie } from '@nivo/pie'
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const UsersByDevice = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Desktop', 'Tablet', 'Mobile']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices = [
    {
      title: 'Proses',
      value: '63',
      // icon: <LaptopMacIcon />,
      color: theme.palette.primary.main
    },
    {
      title: 'Disetujui',
      value: '15',
      // icon: <TabletMacIcon />,
      color: theme.palette.error.main
    },
    {
      title: 'Ditolak',
      value: '23',
      // icon: <PhoneIphoneIcon />,
      color: theme.palette.warning.main
    }
  ];

  const PieChart = ({ dataState }) => (
    <ResponsivePie
        data={dataState}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
      // colors={{ scheme: 'nivo' }}
          colors={[
          // '#914142',
          // '#E67D63',
          // '#FFDEBC',
          '#D7DCFC',
          '#938FC6',
          // '#4B4F86',
          '#67A4E0',
          '#8ED0F4',
          // '#659898',
          '#E2EAC1',
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.2' ] ] }}
        radialLabelsSkipAngle={1}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={-6}
        radialLabelsLinkDiagonalLength={14}
        radialLabelsLinkHorizontalLength={23}
        radialLabelsLinkStrokeWidth={2}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={0}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 60,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000',
                        }
                    }
                ]
            }
        ]}
    />
  )
  
  const dataState =[
  {
    "id": "python",
    "label": "python",
    "value": 154,
    "color": "hsl(317, 70%, 50%)"
  },
  {
    "id": "haskell",
    "label": "haskell",
    "value": 418,
    "color": "hsl(239, 70%, 50%)"
  },
  {
    "id": "java",
    "label": "java",
    "value": 465,
    "color": "hsl(97, 70%, 50%)"
  },
  {
    "id": "rust",
    "label": "rust",
    "value": 492,
    "color": "hsl(345, 70%, 50%)"
  },
  {
    "id": "javascript",
    "label": "javascript",
    "value": 23,
    "color": "hsl(131, 70%, 50%)"
  }
]

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <IconButton size="small">
            <RefreshIcon />
          </IconButton>
        }
        title="Status Surat"
      />
      <Divider />
      <div style={{height: 400}}>
        <PieChart dataState={dataState} />
      </div>
    </Card>
  );
};

UsersByDevice.propTypes = {
  className: PropTypes.string
};

export default UsersByDevice;
