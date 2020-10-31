import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PaletteButton from 'src/component/palette-button';
import { times } from 'src/service/utils';

export type PaletteSectionButtonProps = {
  columns: number;
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(),
  },
  table: {
    'borderSpacing': 0,
    'width': '100%',
    '& td': {
      border: 'solid 1px black',
      height: theme.spacing(1.5),
    },
  },
}));

const PaletteSectionButton: React.FC<PaletteSectionButtonProps> = ({ columns }) => {
  const classes = useStyles();
  return (
    <PaletteButton className={classes.root} type="section" params={{}}>
      <table className={classes.table}>
        <tr>
          {times(columns).map((_, index) => (
            <td key={index} />
          ))}
        </tr>
      </table>
    </PaletteButton>
  );
};

export default PaletteSectionButton;
