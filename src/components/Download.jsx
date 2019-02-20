const React = window.React = require('react');
import Generic from './Generic.jsx';

export default function Download() {
  return <Generic title="下载">
    <p>易车库是基于物联网、云计算、大数据与区块链技术，通过运用<strong>区块链</strong>的分布式账本体系与智能合约模型，结合<strong>物联网</strong>、大数据及人工智能等前沿技术，致力于打造具有信任高、效率高、成本低的车位产权及产权权益投融<strong>数字化交易管理平台</strong>。</p>
    <h4>易车库网络的主要特点：</h4>
    <ul className="privacy__ul">
      <li>5S左右生成一个账页（Ledger），准实时清算；</li>
      <li>事务安全可靠，并且支持11种类型Transaction，方便各种应用场景使用；</li>
      <li>分布式交易所，交易链上撮合交易；</li>
      <li>精巧的共识机制实现，FBA联邦拜占庭共识；</li>
      <li>channel机制、一个Transaction包含多个Operation等机制大大提高网络的整体性能；</li>
    </ul>
    <div className="Generic__divider"></div>
    <h2>易车库App下载</h2>
    <br />
    <table className="Generic__table">
      <tr><td>平台</td><td>地址</td></tr>
      <tr><td>Android</td><td><a href="" target="_blank" rel="nofollow noopener noreferrer">https://baidu.com</a></td></tr>
      <tr><td>IOS</td><td><a href="" target="_blank" rel="nofollow noopener noreferrer">https://baidu.com</a></td></tr>
    </table>
  </Generic>
}
