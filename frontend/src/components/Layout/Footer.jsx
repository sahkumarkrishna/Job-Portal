import React, { useContext } from "react";
import { Context } from "../../main";

const Footer = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; {new Date().getFullYear()} All Rights Reserved By Krishna.</div>
    </footer>
  );
};

export default Footer;
