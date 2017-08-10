import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Icon, Badge, Popover } from 'antd'
import styles from './GeniusBadge.less'

function GeniusBadge({badgeCount,badgeStyle,type,iconStyle}) {


    const content = (
    <div>
        <p>Content</p>
        <p>Content</p>
        <Link to='/'><Icon type='home' /><span>主页</span></Link>
    </div>
    )

    const text = <span>Title</span>;

    let badgeProps = {
        count: badgeCount,
        overflowCount: 99,
        style: badgeStyle
    }
    let popoverProps = {
        placement: "bottomLeft",
        title: text,
        content: content,
        trigger: "click"
    }
    let iconProps = {
        type: type,
        className: iconStyle
    }

    return (
        <Popover {...popoverProps}>
            <Badge {...badgeProps}>
                <Icon {...iconProps}/>
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
  badgeCount: PropTypes.number
}

GeniusBadge.defaultProps = {
    //animate: true
}

export default GeniusBadge
