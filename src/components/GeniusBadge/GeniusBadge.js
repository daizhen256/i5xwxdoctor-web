import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import {routerRedux} from 'dva/router'
import { Card, Icon, Badge, Progress } from 'antd'

function GeniusBadge({}) {

    let badgeProps = {
        icontype?: 
    }

    return (
        <Badge count={100} overflowCount={99}>
          <Icon type="notification" className={styles.size}/>
        </Badge>
    )
}

GeniusBadge.PropTypes = {
    className: PropTypes.string
}

GeniusBadge.defaultProps = {
    animate: true
}

function mapStateToProps({ routing, app }) {
  return { location: routing.locationBeforeTransitions }
}

export default connect(mapStateToProps)(GeniusBadge)
