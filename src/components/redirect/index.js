import { route } from 'preact-router';
import { useEffect } from 'preact/hooks';

const Redirect = ({to}) => {
  useEffect(()=> {
    route(to, true);
  })
    return null;
}

export default Redirect;
