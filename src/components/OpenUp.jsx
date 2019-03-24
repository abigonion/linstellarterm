const React = window.React = require('react');

export default class OpenUp extends React.Component {
  link(content, url) {
    return <a href={url} target="_blank" rel="nofollow noopener noreferrer">{content}</a>
  }
  render() {
    let LOBSTR = this.link('LOBSTR', 'https://lobstr.co/');

    let iOS = this.link('iOS', 'https://itunes.apple.com/us/app/lobstr-stellar-wallet/id1404357892');
    let Android = this.link('Android', 'https://play.google.com/store/apps/details?id=com.lobstr.client');

    return <div className="OpenUp">
    <div className="OpenUp__inside">

      <h2>感谢大家支持!影视投App<a href='#download'>下载</a></h2>

    </div></div>
  }
};
