import React, { Component } from 'react';
import classnames from 'classnames';
import { Tabs, Tab } from '../../index';

const FilterMaskTabContainer = ({ children }) => <div className="filtrate_bd slideInDown">{children}</div>;
const FilterMaskNavContainer = ({ children }) => (
  <div className="filtrate_l">
    <ul className="filtrate_l_list">{children}</ul>
  </div>
);
const FilterMaskContentContainer = ({ children }) => <div className="filtrate_r vcm-flexbox-flex1">{children}</div>;

function Usage() {
  return (
    <Tabs
      defaultActiveTabId="tab1"
      containerAs={FilterMaskTabContainer}
      navContainerAs={FilterMaskNavContainer}
      contentContainerAs={FilterMaskContentContainer}
      paneAs=""
      activeNavClass="cur"
      onBeforeSelect={() => {
        console.log('onBeforeSelect');
        return true;
      }}
      onSelect={() => {
        console.log('onSelect');
      }}
    >
      <div>This element will be ignored, please use prependedChildren instead.</div>
      <Tab id="tab1" title="Tab 1">
        Content of tab1
        <ul className="filtrate_r_list checkbox_column">
          <li className="">
            <i className="checkbox" />
            <span>不限</span>
          </li>
          <li className="cur">
            <i className="checkbox" />
            <span>00:00-06:00</span>
          </li>
          <li className="cur">
            <i className="checkbox" />
            <span>06:00-12:00</span>
          </li>
          <li>
            <i className="checkbox" />
            <span>12:00-18:00</span>
          </li>
          <li className="">
            <i className="checkbox" />
            <span>18:00-24:00</span>
          </li>
        </ul>
      </Tab>
      <Tab id="tab2" title="Tab 2">
        Content of tab2
      </Tab>
      <Tab id="tab3" title="Tab 3">
        Content of tab3
      </Tab>
      <Tab id="tab4" title="Tab 4" disabled>
        Content of tab4
      </Tab>
      <div>This element will be ignored, please use appendedChildren instead.</div>
    </Tabs>
  );
}

function Usage0() {
  return (
    <Tabs
      defaultActiveTabId="tab1"
      containerAs="section"
      navContainerAs="ul"
      navAs="li"
      paneAs="main"
      prependedChildren={<div>This is prepended children</div>}
      appendedChildren={<div>This is appended children</div>}
      onBeforeSelect={() => {
        console.log('onBeforeSelect');
        return true;
      }}
      onSelect={() => {
        console.log('onSelect');
      }}
    >
      <div>This element will be ignored, please use prependedChildren instead.</div>
      <Tab id="tab1" title="Tab 1">
        Content of tab1(Usage)
      </Tab>
      <Tab id="tab2" title="Tab 2">
        Content of tab2
      </Tab>
      <Tab id="tab3" title="Tab 3">
        Content of tab3
      </Tab>
      <Tab id="tab4" title="Tab 4" disabled>
        Content of tab4
      </Tab>
      <div>This element will be ignored, please use appendedChildren instead.</div>
    </Tabs>
  );
}

class MyTableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: null,
    };
    this._mounted = false;
  }

  componentDidMount() {
    this._mounted = true;
    setTimeout(() => {
      this._mounted &&
        this.setState({
          loading: false,
          list: [{ name: 'Tom', age: 20 }, { name: 'Kate', age: 21 }, { name: 'Jack', age: 22 }],
        });
    }, 2000);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    let { loading, list } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    } else if (list && list.length) {
      return (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index}>
                  <td>{item.name || ''}</td>
                  <td>{item.age || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return null;
    }
  }
}

function Usage1() {
  return (
    <Tabs
      defaultActiveTabId="tab1"
      behavior="TOGGLE"
      activeNavClass="active"
      disabledNavClass="disabled"
      onBeforeToggle={() => {
        console.log('onBeforeToggle');
      }}
      onToggle={() => {
        console.log('onToggle');
      }}
    >
      <Tab id="tab1">
        <Tab.Nav
          className="hello hello1 hello2"
          activeClass="active-first"
          onNavActive={(e, tabId, props) => {
            let { toggleTab } = props;
            console.log('tab1 will always be clicked');
            toggleTab && toggleTab(tabId);
          }}
        >
          <span>Tab 1</span>
        </Tab.Nav>
        <Tab.Pane>Content of tab1(Usage1)</Tab.Pane>
      </Tab>
      <Tab id="tab2" title="Tab 2">
        <Tab.Pane>Content of tab2</Tab.Pane>
      </Tab>
      <Tab id="tab3">
        <Tab.Nav title="it will be ignored, use children as title instead." />
        Content of tab3
      </Tab>
      <Tab id="tab4" title="Tab 4">
        Content of tab4
      </Tab>
      <Tab id="tab5" title="Tab 5" disabled>
        <Tab.Nav disabled activeClass="active-five" disabledClass="" />
        <Tab.Pane>Content of tab5</Tab.Pane>
      </Tab>
      <Tab id="tab6" title="Tab 6" disabled>
        <Tab.Nav disabled={false} />
        <div>Prefix content of tab6</div>
        Content of tab6
        <div>Suffix content of tab6</div>
      </Tab>
      <Tab id="tab7" title="Tab 7" disabled={false}>
        <Tab.Nav className="world" disabled activeClass="active-last" disabledClass="disabled-last" />
        <Tab.Pane>Content of tab7</Tab.Pane>
      </Tab>
      <Tab id="tab8" title="Tab 8">
        <Tab.Nav className="world" />
        <Tab.Pane>
          <MyTableList />
        </Tab.Pane>
      </Tab>
    </Tabs>
  );
}

function Usage1a() {
  return (
    <Tabs
      defaultActiveTabId="tab1"
      behavior="HOVER"
      activeNavClass="active"
      disabledNavClass="disabled"
      onBeforeHover={() => {
        console.log('onBeforeHover');
      }}
      onHover={() => {
        console.log('onHover');
      }}
    >
      <Tab id="tab1">
        <Tab.Nav
          className="hello hello1 hello2"
          activeClass="active-first"
          onNavActive={(e, tabId, props) => {
            let { toggleTab } = props;
            console.log('tab1 will always be hovered');
            toggleTab && toggleTab(tabId);
          }}
        >
          <span>Tab 1</span>
        </Tab.Nav>
        <Tab.Pane>Content of tab1(Usage1a)</Tab.Pane>
      </Tab>
      <Tab id="tab2" title="Tab 2">
        <Tab.Pane>Content of tab2</Tab.Pane>
      </Tab>
      <Tab id="tab3">
        <Tab.Nav title="it will be ignored, use children as title instead." />
        Content of tab3
      </Tab>
      <Tab id="tab4" title="Tab 4">
        Content of tab4
      </Tab>
      <Tab id="tab5" title="Tab 5" disabled>
        <Tab.Nav disabled activeClass="active-five" disabledClass="" />
        <Tab.Pane>Content of tab5</Tab.Pane>
      </Tab>
      <Tab id="tab6" title="Tab 6" disabled>
        <Tab.Nav disabled={false} />
        <div>Prefix content of tab6</div>
        Content of tab6
        <div>Suffix content of tab6</div>
      </Tab>
      <Tab id="tab7" title="Tab 7" disabled={false}>
        <Tab.Nav className="world" disabled activeClass="active-last" disabledClass="disabled-last" />
        <Tab.Pane>Content of tab7</Tab.Pane>
      </Tab>
      <Tab id="tab8" title="Tab 8">
        <Tab.Nav className="world" />
        <Tab.Pane>
          <MyTableList />
        </Tab.Pane>
      </Tab>
    </Tabs>
  );
}

const Usage2TabContainer = ({ children }) => <div className="tabs2-u2-tab-container">{children}</div>;
const Usage2NavContainer = ({ children }) => (
  <div className="tabs2-u2-nav-container">
    <ul className="tabs2-u2-nav-list">{children}</ul>
  </div>
);
const Usage2ContentContainer = ({ children }) => <div className="tabs2-u2-content-container">{children}</div>;

function Usage2() {
  return (
    <Tabs
      defaultActiveTabId="tab1"
      behavior="TOGGLE"
      containerAs={Usage2TabContainer}
      navContainerAs={Usage2NavContainer}
      contentContainerAs={Usage2ContentContainer}
      activeNavClass="active"
      disabledNavClass="disabled"
      onBeforeToggle={() => {
        console.log('onBeforeToggle');
      }}
      onToggle={() => {
        console.log('onToggle');
      }}
    >
      <Tab id="tab1">
        <Tab.Nav className="tabs2-u2-nav-item">
          <a className="tabs2-u2-nav-anchor">Tab 1</a>
        </Tab.Nav>
        <Tab.Pane>Content of tab1(Usage2)</Tab.Pane>
      </Tab>
      <Tab id="tab2">
        <Tab.Nav className="tabs2-u2-nav-item">
          <a className="tabs2-u2-nav-anchor">Tab 2</a>
        </Tab.Nav>
        <Tab.Pane>Content of tab2</Tab.Pane>
      </Tab>
      <Tab id="tab3">
        <Tab.Nav className="tabs2-u2-nav-item" disabled>
          <a className="tabs2-u2-nav-anchor">Tab 3</a>
        </Tab.Nav>
        <Tab.Pane>Content of tab3</Tab.Pane>
      </Tab>
      <Tab id="tab4">
        <Tab.Nav className="tabs2-u2-nav-item">
          <a className="tabs2-u2-nav-anchor">Tab 4</a>
        </Tab.Nav>
        <Tab.Pane>Content of tab4</Tab.Pane>
      </Tab>
    </Tabs>
  );
}

const Usage2aNav = title => (tabId, props) => {
  let { active, disabled, activeClass, disabledClass, selectTab } = props;
  let navClsName = classnames('tabs2-u2-nav-item', {
    [activeClass]: !!active,
    [disabledClass]: !!disabled,
  });
  return (
    <li className={navClsName} onClick={e => !disabled && typeof selectTab === 'function' && selectTab(tabId)}>
      <a className="tabs2-u2-nav-anchor">{title}</a>
    </li>
  );
};

function Usage2a() {
  return (
    <Tabs
      defaultActiveTabId="tab1"
      flush={false}
      containerAs={Usage2TabContainer}
      navContainerAs={Usage2NavContainer}
      contentContainerAs={Usage2ContentContainer}
      navAs=""
      activeNavClass="active"
      disabledNavClass="disabled"
      onBeforeSelect={() => {
        console.log('onBeforeSelect');
        return true;
      }}
      onSelect={() => {
        console.log('onSelect');
      }}
    >
      <Tab id="tab1">
        <Tab.Nav>{Usage2aNav('Tab 1')}</Tab.Nav>
        <Tab.Pane>Content of tab1(Usage2a)</Tab.Pane>
      </Tab>
      <Tab id="tab2">
        <Tab.Nav>{Usage2aNav('Tab 2')}</Tab.Nav>
        <Tab.Pane>Content of tab2</Tab.Pane>
      </Tab>
      <Tab id="tab3">
        <Tab.Nav disabled>{Usage2aNav('Tab 3')}</Tab.Nav>
        <Tab.Pane>Content of tab3</Tab.Pane>
      </Tab>
      <Tab id="tab4">
        <Tab.Nav>{Usage2aNav('Tab 4')}</Tab.Nav>
        <Tab.Pane>Content of tab4</Tab.Pane>
      </Tab>
    </Tabs>
  );
}

const Usage2bNav = title => (tabId, props) => {
  let { active, disabled, activeClass, disabledClass, hoverTab } = props;
  let navClsName = classnames('tabs2-u2-nav-item', {
    [activeClass]: !!active,
    [disabledClass]: !!disabled,
  });
  return (
    <li className={navClsName} onMouseOver={e => !disabled && typeof hoverTab === 'function' && hoverTab(tabId)}>
      <a className="tabs2-u2-nav-anchor">{title}</a>
    </li>
  );
};

function Usage2b() {
  return (
    <Tabs
      defaultActiveTabId="tab1"
      flush={false}
      containerAs={Usage2TabContainer}
      navContainerAs={Usage2NavContainer}
      contentContainerAs={Usage2ContentContainer}
      navAs=""
      activeNavClass="active"
      disabledNavClass="disabled"
      onBeforeHover={() => {
        console.log('onBeforeHover');
        return true;
      }}
      onHover={() => {
        console.log('onHover');
      }}
    >
      <Tab id="tab1">
        <Tab.Nav>{Usage2bNav('Tab 1')}</Tab.Nav>
        <Tab.Pane>Content of tab1(Usage2b)</Tab.Pane>
      </Tab>
      <Tab id="tab2">
        <Tab.Nav>{Usage2bNav('Tab 2')}</Tab.Nav>
        <Tab.Pane>Content of tab2</Tab.Pane>
      </Tab>
      <Tab id="tab3">
        <Tab.Nav disabled>{Usage2bNav('Tab 3')}</Tab.Nav>
        <Tab.Pane>Content of tab3</Tab.Pane>
      </Tab>
      <Tab id="tab4">
        <Tab.Nav>{Usage2bNav('Tab 4')}</Tab.Nav>
        <Tab.Pane>Content of tab4</Tab.Pane>
      </Tab>
    </Tabs>
  );
}

export { Usage, Usage0, Usage1, Usage1a, Usage2, Usage2a, Usage2b };
