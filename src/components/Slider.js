import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Slider } from '@material-ui/core';
 
const useStyles = makeStyles(theme => ({
  root: {
    width: 320,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
 
function valuetext(value) {
  return `${value}`;
}
 
export default function DiscreteSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);
 
  const handleSlider = (event, newValue) => {
    setValue(newValue);
    props.setTraining({...props.training, duration:Number(newValue)})
  }
 
  return (
    <div className={classes.root}>
      <div className={classes.margin} />
      <Typography id="discrete-slider" gutterBottom>
        Duration (min)
      </Typography>
      <Slider
        value={typeof value === 'number' ? value : 0}
        id="sliderId"
        defaultValue={25}
        name="duration"
        onChange={handleSlider}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        step={15}
        marks
        min={15}
        max={120}
        valueLabelDisplay="auto"
      />
    </div>
  );
}