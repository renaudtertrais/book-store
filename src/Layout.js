import React from 'react';
import { Link } from 'react-router-dom';
import { Layout as AntLayout, Breadcrumb, Spin, Input } from 'antd';

const { Header, Footer } = AntLayout;
const { Search } = Input;

function Layout({ children, title, search, onSearch, actions, breadcrumb, loading }) {
  return (
    <div className="Layout">
      <Header className="Layout__header">
        <div className="Layout__title">{title}</div>
        {onSearch && (
          <Search
            className="Layout__search"
            type="search"
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search..."
            style={{ width: 200 }}
          />
        )}
        {actions && <div className="Layout__actions">{actions}</div>}
      </Header>
      <div className="Layout__breadcrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          {breadcrumb.map(({ title, url }) => (
            <Breadcrumb.Item key={url}>
              <Link to={url}>{title}</Link>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="Layout__main">
        {loading ? (
          <div className="Layout__spin-container">
            <div className="Layout__spin">
              <Spin size="large" />
            </div>
          </div>
        ) : (
          children
        )}
      </div>
      <Footer className="Layout__footer">Renaud Tertrais ©2019</Footer>
    </div>
  );
}

Layout.defaultProps = {
  breadcrumb: [],
};

export default Layout;
