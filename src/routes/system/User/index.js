import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import UserList from './List'
import UserSearch from './Search'
import UserModal from './ModalForm'
import {checkPower} from '../../../utils'
import {ADD, UPDATE, DELETE} from '../../../constants/options'

function User({location, curPowers, dispatch, systemUser, modal, loading}) {

  const addPower = checkPower(ADD, curPowers)
  const updatePower = checkPower(UPDATE, curPowers)
  const deletePower = checkPower(DELETE, curPowers)

  const {field, keyword} = location.query

  const searchProps = {
    field,
    keyword,
    addPower,
    onSearch(fieldsValue) {
      const {pathname} = location
      !!fieldsValue.keyword.length
        ? dispatch(routerRedux.push({
          pathname: pathname,
          query: {
            ...fieldsValue
          }
        }))
        : dispatch(routerRedux.push({pathname: pathname}))
    },
    onAdd() {
      dispatch({
        type: 'systemUser/showModal',
        payload: {
          type: 'create'
        }
      })
    }
  }

  const listProps = {
    systemUser,
    loading,
    updatePower,
    deletePower,
    location,
    onDeleteItem(id) {
      dispatch({type: 'systemUser/delete', payload: {id}})
    },
    onEditItem(item) {
      dispatch({
        type: 'systemUser/showModal',
        payload: {
          type: 'update',
          curItem: item
        }
      })
    },
    onStatusItem(item) {
      dispatch({
        type: 'systemUser/updateStatus',
        payload: {
          curItem: item
        }
      })
    }
  }

  const modalProps = {
    modal,
    loading,
    onOk(data) {
      dispatch({
        type: !!data.id
          ? 'systemUser/update'
          : 'systemUser/create',
        payload: {
          curItem: data
        }
      })
    },
    onCancel() {
      dispatch({type: 'modal/hideModal'})
    }
  }

  return (
    <div className='content-inner'>
      <UserSearch {...searchProps}/>
      <UserList {...listProps}/>
      <UserModal {...modalProps}/>
    </div>
  )
}

function mapStateToProps({ systemUser, modal, loading }) {
  return { systemUser, modal, loading: loading.models.systemUser }
}

export default connect(mapStateToProps)(User)
