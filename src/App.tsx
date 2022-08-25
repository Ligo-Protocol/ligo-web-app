import Auth from './features/authentication/web3auth';

export interface IAppProps {
}

export default function App (props: IAppProps) {
  return (
    <div>
      <Auth/>
    </div>
  );
}
