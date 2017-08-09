import React from 'react'
import { Icon, Badge } from 'antd'
import { Link } from 'dva/router'
import styles from './BadgeBox.less'
import GeniusBadge from '../../../components/GeniusBadge'

function BadgeBox() {
  return (
    <div className={styles.badgeBox}>
      <Link className={styles.badge}>
        <GeniusBadge badgeCount={5} badgeStyle={{ backgroundColor: '#108ee9' }} type="message" iconStyle={styles.size}>
        </GeniusBadge>
      </Link>
      <Link className={styles.badge}>
        <GeniusBadge badgeCount={10} badgeStyle={{ backgroundColor: '#87d068' }} type="mail" iconStyle={styles.size}>
        </GeniusBadge>
      </Link>
      <Link className={styles.badge}>
        <GeniusBadge badgeCount={100} type="notification" iconStyle={styles.size}>
        </GeniusBadge>
      </Link>
    </div>
  )
}

export default BadgeBox
