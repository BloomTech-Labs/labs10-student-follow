import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { ClassListView, ClassOperations } from '../index.js'

const styles = theme => ({
  wrapper: {
    textAlign: "left",
  }
});

function ClassesPage(props) {
  // FOR FUTURE USE
  // const [classData, setClassData] = useState()
  // useEffect(() => {
  //   getClassData();
  // }, []);

  // const getClassData = async () => {
  //   const response = await axios.get('https://refreshr.herokuapp.com/classes/13');
  //   console.log(`response: ${response}`)
  //   setClassData(response.data);
  //   console.log('class daata', classData)
  // }

  return (
    <Grid>
      <ClassListView />
      {/* <ClassCreateView /> */}
      {/* <ClassEditView /> */}
      <ClassOperations />
    </Grid>
  )
}

export default withStyles(styles)(ClassesPage);