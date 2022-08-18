import * as React from 'react';
import Auth from './Auth/Auth';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
      <Auth/>
    </div>
  );
}
