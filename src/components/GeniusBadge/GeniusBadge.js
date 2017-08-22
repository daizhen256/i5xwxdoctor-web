import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Icon, Badge, Popover } from 'antd'
import styles from './GeniusBadge.less'

function GeniusBadge({badgeCount,badgeStyle,type,iconStyle}) {


    const content = (
        <ul>
            <li className={styles.popoverli}><Link activeStyle={{  display: 'block' }} to='/'><span>Content</span></Link></li>
            <li className={styles.popoverli}><Link activeStyle={{  display: 'block' }} to='/'><span>Content</span></Link></li>
            <li className={styles.popoverli}><Link to='/' activeStyle={{  display: 'block' }}><span>显示全部<Icon type="right-circle-o" style={{ fontSize: '20px', backgroundPosition: '-27px -10px', float: 'right' }}/></span></Link></li>
        </ul>
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
        trigger: "click",
        arrowPointAtCenter : true,
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
