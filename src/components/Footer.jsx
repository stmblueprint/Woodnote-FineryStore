import logo from "../assets/woodnote_logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <span>
          <img src={logo} alt="woodnotefinery_logo" height={80} />
        </span>

        <div className="center">
          <table>
            <tr className="footer-tb-rows">
              <th>Socials</th>
              <th>About</th>
              <th>Resources</th>
            </tr>
            <tr>
              <td>Tiktok</td>
              <td>Our Story</td>
              <td>Return Policy</td>
            </tr>
            <tr>
              <td>Instagram</td>
              <td></td>
              <td>Privacy Policy</td>
            </tr>
            {/* <tr>
                        <td>LinkedIn</td>
                    </tr> */}
          </table>
        </div>

        <div className="copyright-label center">
          Copyright © 2023 WoodNote Finery | All Rights Reserved
        </div>
      </footer>
    </>
  );
};
export default Footer;
