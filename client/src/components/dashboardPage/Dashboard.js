import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    border: `1px solid ${theme.palette.secondary.main}`,
    ...theme.mixins.gutters(),
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 8,
    marginTop: 64,
    marginBottom: theme.spacing.unit * 4,
    color: theme.palette.secondary.contrastText,
    background: theme.palette.secondary.main,
    [theme.breakpoints.only('sm')]: {
      width: '60vw'
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw'
    },
    maxWidth: 1000
  },
  header: {
    color: theme.palette.secondary.main,
    marginTop: theme.spacing.unit * 6,
    textAlign: 'center'
  },
  table: {
    background: theme.palette.secondary.main,
    [theme.breakpoints.only('sm')]: {
      width: '60vw'
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw'
    },
    maxWidth: 1000,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  tableHead: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  },
  tableBody: {
    width: '100%',
    dislay: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center'
  },
  tableRow: {
    display: 'flex',
    flexFlow: 'row nowrap',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.6rem'
  },
  tableCell: {
    fontSize: '1rem',
    width: '33%',
    color: theme.palette.primary.dark
  },
  bodyText: {
    textAlign: 'center'
  },
  aLink: {
    textDecoration: 'none',
    fontSize: '1rem',
    color: theme.palette.primary.dark,
    '&:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.light
    }
  },
  loading: {
    color: 'white',
    position: 'absolute',
    top: '50%'
  }
});

const Dashboard = props => {
  const { classes, rows, userCampaigns, history, name, loading } = props;
  //STATS

  useEffect(() => {
    if (!loading) {
      userCampaigns();
      console.log(rows)
    }
  }, [loading]);


  return (
    <>
      {!loading ? (
        <>
          <Typography className={classes.header} variant="h5">
            Welcome, {name}
          </Typography>

          <Paper className={classes.container} elevation={24}>
            <Table className={classes.table}>
              <TableHead className={classes.tableHead}>
                <TableRow className={classes.tableRow}>
                  <TableCell style={{ border: 'none' }}>
                    Upcoming Refreshrs
                  </TableCell>
                </TableRow>
                <TableRow className={classes.tableRow}>
                  <TableCell className={classes.tableCell} align="center">
                    Date
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    Classname
                  </TableCell>
                  <TableCell className={classes.tableCell} align="center">
                    Refreshr
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableBody}>
                {rows.length > 0 ? (
                  (console.log(rows),
                  rows.map((row, index) => (
                    //console.log(row),
                    <TableRow key={index} className={classes.tableRow}>
                      <TableCell className={classes.tableCell} align="center">
                        {row.date}
                      </TableCell>
                      <TableCell
                        className={classes.aLink}
                        align="center"
                        onClick={e => {
                          e.preventDefault();
                          console.log(row.classID)
                          history.push(`/classes/edit/${row.classID}`);
                        }}
                      >
                        {row.classname}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center">
                        <a
                          className={classes.aLink}
                          href={`https://` + row.preview}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          preview
                        </a>
                      </TableCell>
                    </TableRow>
                  )))
                ) : (
                  <TableRow className={classes.tableRow}>
                    <TableCell style={{ border: 'none' }}>
                      <Typography
                        variant={'caption'}
                        className={classes.bodyText}
                      >
                        No Refreshrs Within 60 Days
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </>
      ) : (
        <CircularProgress className={classes.loading} size={80} />
      )}
    </>
  );
};

export default withRouter(withStyles(styles, { withTheme: true })(Dashboard));
