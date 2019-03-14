import React from 'react';
import Modal from '@material-ui/core/Modal';
import BillingPage from './BillingPage';
import { withStyles } from '@material-ui/core/styles';


const style = theme => ({
root: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
    overflow:'scroll',
    background: theme.palette.primary.dark,
    '& > :last-child': {
           outline: 'none',
           display: 'flex',
           position: 'absolute',
           margin: 0,
           top: 0,
           [theme.breakpoints.up('md')]: {
            bottom: '25%' 
        }

    },
    '& > :last-child > h4:first-of-type': {
        fontWeight: 'bold',
        color: theme.palette.secondary.main
    },
    '& > :last-child > div:first-of-type': {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        padding: 0,
        [theme.breakpoints.down('sm')]: {
            flexFlow: 'column nowrap', 
            alignItems: 'center' 
        }
    },
    '& > :last-child > div:first-of-type > div': {
        margin: '1%',
        width: '75%',
        [theme.breakpoints.down('sm')]: {
            width: '50%'   
        }
    }
},

})

const PricingModal = (props) => {
    const {classes, open, toggleModal} = props
    return(
        <Modal keepMounted  disableAutoFocus={true} open={open} className={classes.root} onClick={() => toggleModal()}>
        <BillingPage/>
        </Modal>
    )
}

export default withStyles(style)(PricingModal)