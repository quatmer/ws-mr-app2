import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './button';

storiesOf('Button', module).add('default', () => (
  <>
    <Button
      color="primary"
      onClick={action('clicked primary ')}
      label="Primary"
    />
    <Button
      color="secondary"
      onClick={action('clicked secondary')}
      label="Secondary"
    />
    <Button
      color="tertiary"
      onClick={action('clicked tertiary ')}
      label="Tertiary"
    />
  </>
));
