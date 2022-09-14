import Auth from "./features/authentication/Auth";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div>
      <Auth />
    </div>
  );
}
