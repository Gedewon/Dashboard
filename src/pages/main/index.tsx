import React from "react";
import { useAppDispatch } from "../../app/hooks";
import { WhiteLabelAsync } from "../../features/whitelabel/whitelabelSlice";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(WhiteLabelAsync());
    }

    return () => {
      isMounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
