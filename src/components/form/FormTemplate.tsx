import React from 'react';
import { Form, FormProps } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Hint } from 'components/Hint/Hint';

import { Button } from '../Button/Button';

type AnyObject = Record<string, any>;

export type FormTemplateProps<FormValues extends AnyObject> = Omit<
  FormProps<FormValues>,
  'subscription'
> & {
  title: string;
  cancelButton?: string;
  submitButton?: string;
  onCancel: () => void;
};

export function FormTemplate<FormValues extends AnyObject>(props: FormTemplateProps<FormValues>) {
  const { title, cancelButton, submitButton, onCancel, ...restProps } = props;

  const children = React.Children.toArray(restProps.children);

  return (
    <Form
      {...restProps}
      subscription={{ submitError: true, submitting: true, dirtySinceLastSubmit: true }}
    >
      {({ handleSubmit, submitError, submitting, dirtySinceLastSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>

              {children[0]}
            </Grid>
            {children.length > 1 &&
              children.slice(1).map((item, index) => (
                <Grid key={index} item xs={12}>
                  {item}
                </Grid>
              ))}
            {!dirtySinceLastSubmit && !!submitError && (
              <Grid item xs={12}>
                <Hint>
                  <Typography color="error">{submitError}</Typography>
                </Hint>
              </Grid>
            )}
            <Grid item xs={6}>
              <Button variant="outlined" fullWidth onClick={onCancel}>
                {cancelButton || 'Cancel'}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : submitButton || 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Form>
  );
}
