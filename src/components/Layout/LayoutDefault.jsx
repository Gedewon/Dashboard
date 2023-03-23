import React from "react";
import { Link } from "react-router-dom";

type LayoutDefaultProps = {
  children: React.ReactNode,
};

const LayoutDefault: React.FC<LayoutDefaultProps> = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <header>
      <Link to="/">Main</Link>
      <Link to="/product">Product view</Link>
      <Link to="/product/edit">Product Edit</Link>
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer>
      <h1>Footer</h1>
    </footer>
  );
};

export default LayoutDefault;
