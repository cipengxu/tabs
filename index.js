import React, { Component, Children, Fragment, cloneElement, isValidElement } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const COMP_NAME_TAB = 'Tab';
const COMP_NAME_TAB_NAV = 'TabNav';
const COMP_NAME_TAB_PANE = 'TabPane';

const TAB_BEHAVIOR_SELECT = 'SELECT';
const TAB_BEHAVIOR_TOGGLE = 'TOGGLE';
const TAB_BEHAVIOR_HOVER = 'HOVER';

const TAB_NAV_ID_PREFIX = 'tab-nav-';
const TAB_PANE_ID_PREFIX = 'tab-pane-';

class TabsContainer extends Component {
  static propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    innerRef: PropTypes.func,
  };

  static defaultProps = {
    as: 'div',
  };

  componentDidMount() {
    let { innerRef } = this.props;
    if (innerRef) innerRef(findDOMNode(this));
  }

  render() {
    let { as: C, children } = this.props;
    return <C>{children}</C>;
  }
}

class TabNavContainer extends Component {
  static propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  static defaultProps = {
    as: 'ul',
  };

  render() {
    let { as: NC, children } = this.props;
    return <NC>{children}</NC>;
  }
}

class TabContentContainer extends Component {
  static propTypes = {
    as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  };

  static defaultProps = {
    as: 'div',
  };

  render() {
    let { as: CC, children } = this.props;
    return <CC>{children}</CC>;
  }
}

class TabNav extends Component {
  static propTypes = {
    as: PropTypes.string,
    tabId: PropTypes.string,
    behavior: PropTypes.string,
    flush: PropTypes.bool,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    activeClass: PropTypes.string,
    disabledClass: PropTypes.string,
    toggleTab: PropTypes.func,
    selectTab: PropTypes.func,
    hoverTab: PropTypes.func,
    onNavActive: PropTypes.func,
  };

  static defaultProps = {
    title: '',
    disabled: false,
  };

  static displayName = COMP_NAME_TAB_NAV;

  constructor(props) {
    super(props);

    this.handleNavActive = this.handleNavActive.bind(this);
  }

  isHoverBehavior() {
    let { behavior } = this.props;
    return behavior === TAB_BEHAVIOR_HOVER;
  }

  handleNavActive(e, tabId) {
    let { disabled, onNavActive } = this.props;
    if (!disabled && typeof onNavActive === 'function') {
      onNavActive(e, tabId, this.props);
    }
  }

  getNavClsName() {
    let { className = '', active, disabled, activeClass = '', disabledClass = '' } = this.props;
    return classnames(className, {
      [activeClass]: !!active,
      [disabledClass]: !!disabled,
    });
  }

  render() {
    let {
      as: N,
      tabId,
      behavior,
      flush,
      title,
      children,
      active,
      disabled,
      activeClass,
      disabledClass,
      toggleTab,
      selectTab,
      hoverTab,
      onNavActive,
      ...rest
    } = this.props;
    let displayTitle = children != undefined ? children : title;
    let isHoverEvent = this.isHoverBehavior();
    if (typeof displayTitle === 'function') {
      displayTitle = displayTitle(tabId, this.props);
    }
    if (flush) {
      // flush模式下，需强制指定包裹元素，否则无法设置是否选中的样式
      N = N || 'li';
    }
    if (N === '') {
      return <Fragment>{displayTitle}</Fragment>;
    }
    return (
      <N
        {...rest}
        className={this.getNavClsName()}
        data-tab-id={tabId}
        data-active={active}
        data-nav-id={`${TAB_NAV_ID_PREFIX}${tabId}`}
        data-active-class={activeClass}
        onMouseOver={isHoverEvent ? e => this.handleNavActive(e, tabId) : null}
        onClick={!isHoverEvent ? e => this.handleNavActive(e, tabId) : null}
      >
        {displayTitle}
      </N>
    );
  }
}

class TabPane extends Component {
  static propTypes = {
    as: PropTypes.string,
    tabId: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array, PropTypes.func]),
    active: PropTypes.bool,
    flush: PropTypes.bool,
  };

  static defaultProps = {
    content: '',
  };

  static displayName = COMP_NAME_TAB_PANE;

  render() {
    let { as: P, content, children, tabId, active, flush, style, ...rest } = this.props;
    let displayContent = children != undefined ? children : content;
    let paneStyle = {
      ...style,
      ...(!active && flush ? { display: 'none' } : {}),
    };
    if (typeof displayContent === 'function') {
      displayContent = displayContent(tabId, this.props);
    }
    if (flush) {
      // flush模式下，需强制指定包裹元素，否则无法设置显示/隐藏样式
      P = P || 'div';
    }
    if (P === '') {
      return <Fragment>{displayContent}</Fragment>;
    }
    return (
      <P style={paneStyle} data-pane-id={`${TAB_PANE_ID_PREFIX}${tabId}`} {...rest}>
        {displayContent}
      </P>
    );
  }
}

class Tab extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };

  static defaultProps = {
    title: '',
    content: '',
  };

  // 请务必确保TabNav、TabPane在Tab之前声明，否则Tab.Nav、Tab.Pane方式将无法引用
  static Nav = TabNav;
  static Pane = TabPane;

  static displayName = COMP_NAME_TAB;

  render() {
    return null;
  }
}

class Tabs extends Component {
  static propTypes = {
    defaultActiveTabId: PropTypes.string,
    behavior: PropTypes.oneOf([TAB_BEHAVIOR_SELECT, TAB_BEHAVIOR_TOGGLE, TAB_BEHAVIOR_HOVER]),
    flush: PropTypes.bool,
    containerAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    navContainerAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    navAs: PropTypes.string,
    contentContainerAs: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    paneAs: PropTypes.string,
    activeNavClass: PropTypes.string,
    disabledNavClass: PropTypes.string,
    prependedChildren: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]),
    appendedChildren: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]),
    onBeforeSelect: PropTypes.func,
    onSelect: PropTypes.func,
    onBeforeToggle: PropTypes.func,
    onToggle: PropTypes.func,
    onBeforeHover: PropTypes.func,
    onHover: PropTypes.func,
  };

  static defaultProps = {
    behavior: TAB_BEHAVIOR_SELECT,
    flush: false,
    containerAs: 'div',
    navContainerAs: 'ul',
    navAs: 'li',
    contentContainerAs: 'div',
    paneAs: 'div',
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTabId: props.defaultActiveTabId,
      firstValidTabIndex: -1,
    };
    this.container = null;
    this.setContainerRef = this.setContainerRef.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.hoverTab = this.hoverTab.bind(this);
    this.handleSelectTab = this.handleSelectTab.bind(this);
  }

  componentDidMount() {
    this.setActiveTabFromProps();
    this.setFirstValidTabIndex({ fromState: false });
  }

  componentWillReceiveProps(nextProps) {
    this.setActiveTabFromProps(nextProps);
    this.setFirstValidTabIndex({ fromState: false, props: nextProps });
  }

  isValidTab(child) {
    return child && isValidElement(child) && child.type && child.type.displayName === COMP_NAME_TAB;
  }

  isValidTabNav(child) {
    return child && isValidElement(child) && child.type && child.type.displayName === COMP_NAME_TAB_NAV;
  }

  isValidTabPane(child) {
    return child && isValidElement(child) && child.type && child.type.displayName === COMP_NAME_TAB_PANE;
  }

  isActiveTab(tabProps, index) {
    let { activeTabId } = this.state;
    let { children } = this.props;
    let childrenArr = Children.toArray(children);
    let containsActiveTab =
      activeTabId != undefined &&
      childrenArr &&
      childrenArr.length > 0 &&
      childrenArr.filter(child => this.isValidTab(child) && child.props.id === activeTabId).length > 0;
    return containsActiveTab ? tabProps && tabProps.id === activeTabId : index === this.getFirstValidTabIndex();
  }

  setActiveTabFromProps(props) {
    let { defaultActiveTabId } = props || this.props;
    if (defaultActiveTabId != this.state.activeTabId) {
      this.setState({
        activeTabId: defaultActiveTabId,
      });
    }
  }

  getFirstValidTabIndexFromProps(props) {
    let result = 0;
    let { children } = props || this.props;
    let childrenArr = Children.toArray(children);
    if (childrenArr && childrenArr.length) {
      for (let i = 0; i < childrenArr.length; i++) {
        if (this.isValidTab(childrenArr[i])) {
          result = i;
          break;
        }
      }
    }
    return result;
  }

  getFirstValidTabIndexFromState(state) {
    let { firstValidTabIndex } = state || this.state;
    return firstValidTabIndex;
  }

  getFirstValidTabIndex({ fromState = true, state, props } = {}) {
    if (fromState) {
      return this.getFirstValidTabIndexFromState(state);
    }
    return this.getFirstValidTabIndexFromProps(props);
  }

  setFirstValidTabIndex({ state, props }) {
    let firstValidTabIndex = this.getFirstValidTabIndex({ fromState: false, state, props });
    if (firstValidTabIndex > -1) {
      this.setState({
        firstValidTabIndex,
      });
    }
  }

  containsTabNavChildren(tabChildren) {
    let childrenArr = Children.toArray(tabChildren);
    if (childrenArr && childrenArr.length) {
      let matchedTabNavs = childrenArr.filter(this.isValidTabNav);
      return matchedTabNavs.length > 0 ? matchedTabNavs[0] : null;
    }
    return null;
  }

  containsTabPaneChildren(tabChildren) {
    let childrenArr = Children.toArray(tabChildren);
    if (childrenArr && childrenArr.length) {
      let matchedTabPanes = childrenArr.filter(this.isValidTabPane);
      return matchedTabPanes.length > 0 ? matchedTabPanes[0] : null;
    }
    return null;
  }

  getValidTabPaneContent(tabChildren) {
    let childrenArr = Children.toArray(tabChildren);
    if (childrenArr && childrenArr.length) {
      return childrenArr.filter(child => !this.isValidTabNav(child));
    }
    return null;
  }

  setContainerRef(node) {
    this.container = node;
  }

  getTabNavElems() {
    let container = this.container || document;
    let tabNavElems = null;
    if (container) {
      tabNavElems = container.querySelectorAll(`[data-nav-id^=${TAB_NAV_ID_PREFIX}]`);
    }
    return tabNavElems;
  }

  getTabPaneElems() {
    let container = this.container || document;
    let tabPaneElems = null;
    if (container) {
      tabPaneElems = container.querySelectorAll(`[data-pane-id^=${TAB_PANE_ID_PREFIX}]`);
    }
    return tabPaneElems;
  }

  getTabNavElemByTabId(tabId) {
    let container = this.container || document;
    let tabNavEl = null;
    if (container) {
      tabNavEl = container.querySelector(`[data-nav-id=${TAB_NAV_ID_PREFIX}${tabId}]`);
    }
    return tabNavEl;
  }

  getTabPaneElemByTabId(tabId) {
    let container = this.container || document;
    let tabPaneEl = null;
    if (container) {
      tabPaneEl = container.querySelector(`[data-pane-id=${TAB_PANE_ID_PREFIX}${tabId}]`);
    }
    return tabPaneEl;
  }

  getActiveTabId() {
    let { flush } = this.props;
    if (flush) {
      let allTabNavEl = this.getTabNavElems();
      let activeTabId = '';
      if (allTabNavEl && allTabNavEl.length) {
        for (let i = 0; i < allTabNavEl.length; i++) {
          let thisTabNavEl = allTabNavEl[i];
          if (thisTabNavEl) {
            let activeAttr = thisTabNavEl.getAttribute('data-active');
            let tabIdAttr = thisTabNavEl.getAttribute('data-tab-id');
            if (activeAttr === 'true') {
              activeTabId = tabIdAttr;
              break;
            }
          }
        }
      }
      return activeTabId;
    } else {
      let { activeTabId } = this.state;
      return activeTabId;
    }
  }

  setActiveTab(tabId, fn) {
    let { flush } = this.props;
    if (flush) {
      // flush模式需采用DOM操作的方式激活选项卡，实现选项卡内容的缓存机制
      let allTabNavEl = this.getTabNavElems();
      let allTabPaneEl = this.getTabPaneElems();
      let activeTabNavEl = this.getTabNavElemByTabId(tabId);
      let activeTabPaneEl = this.getTabPaneElemByTabId(tabId);

      // 禁止激活所有TabNav元素
      if (allTabNavEl && allTabNavEl.length) {
        for (let i = 0; i < allTabNavEl.length; i++) {
          let thisTabNavEl = allTabNavEl[i];
          if (thisTabNavEl) {
            thisTabNavEl.setAttribute('data-active', 'false');

            let activeClsName = thisTabNavEl.getAttribute('data-active-class');
            activeClsName && thisTabNavEl.classList && thisTabNavEl.classList.remove(activeClsName);
          }
        }
      }
      // 激活该活跃的TabNav元素
      if (activeTabNavEl) {
        activeTabNavEl.setAttribute('data-active', 'true');

        let activeClsName = activeTabNavEl.getAttribute('data-active-class');
        activeClsName && activeTabNavEl.classList && activeTabNavEl.classList.add(activeClsName);
      }

      // 隐藏所有TabPane元素
      if (allTabPaneEl && allTabPaneEl.length) {
        for (let j = 0; j < allTabPaneEl.length; j++) {
          let thisTabPaneEl = allTabPaneEl[j];
          if (thisTabPaneEl) {
            thisTabPaneEl.style.display = 'none';
          }
        }
      }
      // 显示该活跃的TabPane元素
      if (activeTabPaneEl) {
        activeTabPaneEl.style.display = '';
      }

      typeof fn === 'function' && fn(tabId, this.state, this.props);
    } else {
      this.setState(
        {
          activeTabId: tabId,
        },
        () => {
          typeof fn === 'function' && fn(tabId, this.state, this.props);
        },
      );
    }
  }

  toggleTab(tabId) {
    let { onBeforeToggle, onToggle } = this.props;
    let shouldToggle =
      !onBeforeToggle ||
      (typeof onBeforeToggle === 'function' && onBeforeToggle(tabId, this.state, this.props) !== false);
    if (shouldToggle) {
      this.setActiveTab(tabId, onToggle);
    }
  }

  selectTab(tabId) {
    let activeTabId = this.getActiveTabId();
    let { onBeforeSelect, onSelect } = this.props;
    let shouldSelect =
      !onBeforeSelect ||
      (typeof onBeforeSelect === 'function' && onBeforeSelect(tabId, this.state, this.props) !== false);
    if (activeTabId != tabId && shouldSelect) {
      this.setActiveTab(tabId, onSelect);
    }
  }

  hoverTab(tabId) {
    let activeTabId = this.getActiveTabId();
    let { onBeforeHover, onHover } = this.props;
    let shouldHover =
      !onBeforeHover || (typeof onBeforeHover === 'function' && onBeforeHover(tabId, this.state, this.props) !== false);
    if (activeTabId != tabId && shouldHover) {
      this.setActiveTab(tabId, onHover);
    }
  }

  handleSelectTab(e, tabId) {
    let { behavior } = this.props;
    behavior = (behavior || '').toUpperCase();
    if (behavior === TAB_BEHAVIOR_SELECT) {
      this.selectTab(tabId);
    } else if (behavior === TAB_BEHAVIOR_TOGGLE) {
      this.toggleTab(tabId);
    } else if (behavior === TAB_BEHAVIOR_HOVER) {
      this.hoverTab(tabId);
    }
  }

  renderNav(childProps, index) {
    let { behavior, flush, navAs, activeNavClass, disabledNavClass } = this.props;
    let { id: tabId, title, children: tabChildren, disabled } = childProps;
    let active = this.isActiveTab(childProps, index);
    let childTabNav = this.containsTabNavChildren(tabChildren);

    if (childTabNav) {
      let {
        as: tabNavAs,
        children: tabNavChildren,
        disabled: tabNavDisabled,
        activeClass: tabNavActiveClass,
        disabledClass: tabNavDisabledClass,
        onNavActive,
      } = childTabNav.props;
      return cloneElement(childTabNav, {
        tabId,
        behavior,
        flush,
        active,
        toggleTab: this.toggleTab,
        selectTab: this.selectTab,
        hoverTab: this.hoverTab,
        ...(tabNavAs != undefined ? {} : { as: navAs }),
        ...(Children.count(tabNavChildren) > 0 ? {} : { title }),
        ...(tabNavDisabled != undefined ? {} : { disabled }),
        ...(tabNavActiveClass != undefined ? {} : { activeClass: activeNavClass }),
        ...(tabNavDisabledClass != undefined ? {} : { disabledClass: disabledNavClass }),
        ...(onNavActive ? {} : { onNavActive: this.handleSelectTab }),
      });
    }

    return (
      <TabNav
        key={index}
        as={navAs}
        tabId={tabId}
        behavior={behavior}
        flush={flush}
        title={title}
        active={active}
        disabled={disabled}
        activeClass={activeNavClass}
        disabledClass={disabledNavClass}
        onNavActive={this.handleSelectTab}
      />
    );
  }

  renderPane(childProps, index) {
    let { flush, paneAs } = this.props;
    let { id: tabId, content, children: tabChildren } = childProps;
    let active = this.isActiveTab(childProps, index);
    let childrenAsContent = this.getValidTabPaneContent(tabChildren);
    let childTabPane = this.containsTabPaneChildren(tabChildren);

    if (childTabPane) {
      let { as: tabPaneAs } = childTabPane.props;
      return cloneElement(childTabPane, {
        tabId,
        active,
        flush,
        ...(tabPaneAs != undefined ? {} : { as: paneAs }),
      });
    }

    return (
      <TabPane
        key={index}
        as={paneAs}
        tabId={tabId}
        content={childrenAsContent ? childrenAsContent : content}
        active={active}
        flush={flush}
      />
    );
  }

  renderTabs() {
    let { flush, navContainerAs, contentContainerAs, children } = this.props;

    return (
      <Fragment>
        <TabNavContainer as={navContainerAs}>
          {Children.map(children, (child, index) => {
            if (this.isValidTab(child)) {
              return this.renderNav(child.props, index);
            }
            return null;
          })}
        </TabNavContainer>

        <TabContentContainer as={contentContainerAs}>
          {Children.map(children, (child, index) => {
            if (this.isValidTab(child)) {
              if (flush) {
                return this.renderPane(child.props, index);
              } else {
                let active = this.isActiveTab(child.props, index);
                if (active) {
                  return this.renderPane(child.props, index);
                }
                return null;
              }
            }
            return null;
          })}
        </TabContentContainer>
      </Fragment>
    );
  }

  render() {
    let { containerAs, prependedChildren, appendedChildren, children } = this.props;

    if (!children || !Children.count(children)) {
      return null;
    }

    return (
      <TabsContainer as={containerAs} innerRef={this.setContainerRef}>
        {prependedChildren}
        {this.renderTabs()}
        {appendedChildren}
      </TabsContainer>
    );
  }
}

export { Tabs, Tab, TabNav, TabPane };
