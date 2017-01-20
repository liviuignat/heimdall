import * as React from 'react';
import {Link} from 'react-router';

export default class AppFooter extends React.Component<any, any> {
    public render() {
      const css = require('./AppFooter.scss');

      return (
        <div className={css.AppFooter}>
        <div className={css.AppFooter_sectionWrapper}>

          <div className={css.AppFooter_section}>
            <div className={css.AppFooter_logo}>
              <a href="/">EVER<b>REAL</b></a>
            </div>
            <div className={css.AppFooter_copyright}>© EVERREAL {new Date().getFullYear()}</div>

            <ul className={css.AppFooter_sectionLinks}>
              <li>
                <a href="#"><img src="https://s3.eu-central-1.amazonaws.com/s3-production/assets/images/common/flags/de.png" alt="de" title="Deutsch" />&nbsp;Deutsch</a>
              </li>
              <li>
                <a href="#"><img src="https://s3.eu-central-1.amazonaws.com/s3-production/assets/images/common/flags/en.png" alt="en" title="English" />&nbsp;English</a>
              </li>
            </ul>
          </div>

          <div className={css.AppFooter_section}>
            <div className={css.AppFooter_sectionTitle}>
              Company
            </div>
            <ul className={css.AppFooter_sectionLinks}>
              <li><a href="#">About us</a></li>
              <li><a href="#">Imprint</a></li>
              <li><a href="#">Privacy policy</a></li>
            </ul>
          </div>

          <div className={css.AppFooter_section}>
            <div className={css.AppFooter_sectionTitle}>
              Social Media
            </div>
            <div className={css.AppFooter_sectionLinks}>
              <a className={css.AppFooter_socialIcon} target="_blank" href="https://www.facebook.com/EverReal-194363904346025"><i className="fa fa-facebook" /></a>
              <a className={css.AppFooter_socialIcon} target="_blank" href="https://plus.google.com/117369685894278490950"><i className="fa fa-google-plus" /></a>
              <a className={css.AppFooter_socialIcon} target="_blank" href="https://twitter.com/EverReal_GmbH"><i className="fa fa-twitter" /></a>
              <a className={css.AppFooter_socialIcon} target="_blank" href="https://www.linkedin.com/company/everreal"><i className="fa fa-linkedin" /></a>
              <a className={css.AppFooter_socialIcon} target="_blank" href="https://www.xing.com/companies/everrealgmbh"><i className="fa fa-xing" /></a>
            </div>
          </div>

        </div>
      </div>
      );
    }
}
