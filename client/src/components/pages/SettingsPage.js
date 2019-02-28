import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    wrapper: {
        textAlign: "left",
    }
});

function SettingsPage(props) {

    return (
        <Grid>
          <h1>Settings Page</h1>
        </Grid>
    )
}

export default withStyles(styles)(SettingsPage);