import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import RemoveIcon from '@material-ui/icons/Remove';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import TextFieldsIcon from '@material-ui/icons/TextFieldsRounded';
import TouchAppIcon from '@material-ui/icons/TouchAppRounded';
import ViewDayIcon from '@material-ui/icons/ViewDayRounded';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PaletteContentButton from 'src/component/palette-content-button';
import PaletteSectionButton from 'src/component/palette-section-button';
import Skeleton from 'src/component/skeleton';
import { times } from 'src/service/utils';

type LocationParams = {
  templateId: string;
  versionId: string;
};

export const getRoute = (params: LocationParams) =>
  `/templates/${params.templateId}/versions/${params.versionId}/wysiwyg`;
export const ROUTE = getRoute({ templateId: ':templateId', versionId: ':versionId' });

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
  },
  palette: {
    flex: 1,
    overflowY: 'auto',
    minWidth: 300,
  },
  editor: {
    display: 'flex',
    flex: 4,
    flexDirection: 'column',
  },
}));

const EditorView: React.FC<any> = () => {
  const classes = useStyles();

  return (
    <Skeleton backButtonVisible mainClassName={classes.root}>
      <DndProvider backend={HTML5Backend}>
        <Paper className={classes.palette} square>
          <CardContent>
            <Typography>Sections</Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              {times(4).map((_, index) => (
                <Grid key={index} item xs={12}>
                  <Typography variant="caption">
                    {index + 1} column{index > 0 ? 's' : ''}
                  </Typography>
                  <PaletteSectionButton columns={index + 1} />
                </Grid>
              ))}
            </Grid>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography>Content</Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <PaletteContentButton icon={TextFieldsIcon} label="Text" />
              </Grid>
              <Grid item xs={6}>
                <PaletteContentButton icon={TouchAppIcon} label="Button" />
              </Grid>
              <Grid item xs={6}>
                <PaletteContentButton icon={ImageIcon} label="Image" />
              </Grid>
              <Grid item xs={6}>
                <PaletteContentButton icon={RemoveIcon} label="Divider" />
              </Grid>
              <Grid item xs={6}>
                <PaletteContentButton icon={ViewDayIcon} label="Spacer" />
              </Grid>
              <Grid item xs={6}>
                <PaletteContentButton icon={ShareIcon} label="Social Sharing" />
              </Grid>
              <Grid item xs={6}>
                <PaletteContentButton icon={CodeIcon} label="HTML block" />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Paper>
        <section className={classes.editor}>
          <div />
        </section>
      </DndProvider>
    </Skeleton>
  );
};

export default EditorView;
