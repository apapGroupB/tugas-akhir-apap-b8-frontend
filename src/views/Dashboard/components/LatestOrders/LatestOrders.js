import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import PengajuanSurat from '../../PengajuanSurat'

import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    height: 500
  },
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  Disetujui: 'success',
  Menunggupersetujuan: 'info',
  Ditolak: 'danger'
};


const dataState = [
  {
    "id": "Surat",
    "color": "hsl(120, 70%, 50%)",
    "data": [
      {
        "x": "Senin",
        "y": 281
      },
      {
        "x": "Selasa",
        "y": 38
      },
      {
        "x": "Rabu",
        "y": 23
      },
      {
        "x": "Kamis",
        "y": 241
      },
      {
        "x": "Jumat",
        "y": 242
      },
      {
        "x": "Sabtu",
        "y": 80
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(71, 70%, 50%)",
    "data": [
      {
        "x": "Senin",
        "y": 294
      },
      {
        "x": "Selasa",
        "y": 92
      },
      {
        "x": "Rabu",
        "y": 202
      },
      {
        "x": "Kamis",
        "y": 99
      },
      {
        "x": "Jumat",
        "y": 138
      },
      {
        "x": "Sabtu",
        "y": 80
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(118, 70%, 50%)",
    "data": [
      {
        "x": "Senin",
        "y": 4
      },
      {
        "x": "Selasa",
        "y": 133
      },
      {
        "x": "Rabu",
        "y": 282
      },
      {
        "x": "Kamis",
        "y": 294
      },
      {
        "x": "Jumat",
        "y": 190
      },
      {
        "x": "Sabtu",
        "y": 80
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(36, 70%, 50%)",
    "data": [
      {
        "x": "Senin",
        "y": 30
      },
      {
        "x": "Selasa",
        "y": 141
      },
      {
        "x": "Rabu",
        "y": 94
      },
      {
        "x": "Kamis",
        "y": 203
      },
      {
        "x": "Jumat",
        "y": 98
      },
      {
        "x": "Sabtu",
        "y": 80
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(180, 70%, 50%)",
    "data": [
      {
        "x": "Senin",
        "y": 62
      },
      {
        "x": "Selasa",
        "y": 190
      },
      {
        "x": "Rabu",
        "y": 127
      },
      {
        "x": "Kamis",
        "y": 92
      },
      {
        "x": "Jumat",
        "y": 97
      },
      {
        "x": "Sabtu",
        "y": 80
      }
    ]
  }
]

const LatestOrders = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const [orders] = useState(mockData);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        title="Pengajuan Surat Terakhir"
      />
      <PengajuanSurat dataState={dataState} />
      
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
