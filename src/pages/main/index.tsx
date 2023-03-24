import React from "react";
import { Link } from "react-router-dom";
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

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">Welcome to our Website.</p>
            <Link to={"/product"}>
              <button className="btn btn-primary">Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
