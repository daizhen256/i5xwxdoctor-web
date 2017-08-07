import React from 'react'
import PropTypes from 'prop-types'
import {routerRedux} from 'dva/router'
import {connect} from 'dva'
import AdminList from './List'
import AdminSearch from './Search'
import AdminModal from './ModalForm'
import {checkPower} from '../../../utils'
import {ADD, UPDATE, DELETE} from '../../../constants/options'

function Admin({location, curPowers, dispatch, systemAdmin, modal, loading}) {

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
        type: 'systemAdmin/showModal',
        payload: {
          type: 'create'
        }
      })
    }
  }

  const listProps = {
    systemAdmin,
    loading,
    updatePower,
    deletePower,
    location,
    onDeleteItem(id) {
      dispatch({type: 'systemAdmin/delete', payload: {id}})
    },
    onEditItem(item) {
      dispatch({
        type: 'systemAdmin/showModal',
        payload: {
          type: 'update',
          curItem: item
        }
      })
    },
    onStatusItem(item) {
      dispatch({
        type: 'systemAdmin/updateStatus',
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
          ? 'systemAdmin/update'
          : 'systemAdmin/create',
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
      <AdminSearch {...searchProps}/>
      <AdminList {...listProps}/>
      <AdminModal {...modalProps}/>
    </div>
  )
}

function mapStateToProps({ systemAdmin, modal, loading }) {
  return { systemAdmin, modal, loading: loading.models.systemAdmin }
}

export default connect(mapStateToProps)(Admin)
