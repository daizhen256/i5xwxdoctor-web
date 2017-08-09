import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Badge, Popover } from 'antd'
import styles from './GeniusBadge.less'

function GeniusBadge() {

    let badgeProps = {
    }

    const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
    </div>
    )

    const text = <span>Title</span>;


    return (
        <Popover placement="bottom" title={text} content={content} trigger="click">
            <Badge count={ this.props.badgeCount } overflowCount={99} style={ this.props.badgeStyle }>
                <Icon type={ this.props.type } className={ this.props.iconStyle }/>
            </Badge>
        </Popover>
    )
}

GeniusBadge.propTypes = {
  location: PropTypes.object,
  type: PropTypes.string.isRequired,
  iconStyle: PropTypes.any,
  badgeStyle: PropTypes.any,
  className: PropTypes.string,
  badgeCount: PropTypes.any
}

GeniusBadge.defaultProps = {
    //animate: true
}

export default GeniusBadge
