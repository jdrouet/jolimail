import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import cn from 'classnames';
import React from 'react';
import { Template, TemplateVersion, useSettings } from 'src/service/server';

const useStyles = makeStyles(() => ({
  root: {},
  grow: {
    flex: 1,
  },
  firstRow: {
    display: 'flex',
  },
}));

const buildCurlCatapulte = (baseUrl: string, template: Template) => {
  const output = ['curl --request POST'];
  output.push('--header "Content-Type: application/json"');
  output.push(`--data '${JSON.stringify({ from: 'sender@example.com', to: 'recipient@example.com', params: {} })}'`);
  output.push(`${baseUrl}/templates/${template.slug}`);
  return output.join(' \\\n\t');
};

const buildCurlJolimail = (baseUrl: string, template: Template) => `curl ${baseUrl}/template/${template.slug}`;

export type TemplateCardletProps = {
  className?: string;
  template: Template;
  version?: TemplateVersion;
};

const TemplateUsageCardlet: React.FC<TemplateCardletProps> = ({ className, template, version }) => {
  const classes = useStyles();
  const { data: settings } = useSettings();
  return (
    <Card className={cn(classes.root, className)} data-template={template.id}>
      <CardContent>
        <Typography gutterBottom color="textSecondary" variant="subtitle2">
          How to use
        </Typography>
        {version && settings ? (
          <React.Fragment>
            <Typography>
              When using with{' '}
              <a href="https://github.com/jdrouet/catapulte" rel="noopener noreferrer" target="_blank">
                catapulte
              </a>
              , you just need a simple http request
            </Typography>
            <pre>{buildCurlCatapulte(settings.exampleCatapulteBaseUrl, template)}</pre>
            <Typography>If you just want to download the template, you also need a simple http request</Typography>
            <pre>{buildCurlJolimail(window.location.origin, template)}</pre>
          </React.Fragment>
        ) : (
          <Typography>
            To be able to use this template, you've to create a version of your template and define it as default.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TemplateUsageCardlet;
