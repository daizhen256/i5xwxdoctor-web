import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import ModifyForm from './ModifyForm'

import { Link } from 'dva/router'

function ModifyPassword({ dispatch, systemModifyPassword, loading }) {

  const modifyFormProps = {
    loading,
    onOk(data) {
      dispatch({ type: `systemModifyPassword/update`, payload: data })
    }
  }

  return (
    <div>
      <ModifyForm {...modifyFormProps}></ModifyForm>
    </div>
  )
}

ModifyPassword.propTypes = {
  systemModifyPwd: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps({ systemModifyPassword, loading }) {
  return { systemModifyPassword, loading: loading.models.systemModifyPassword }
}

export default connect(mapStateToProps)(ModifyPassword)
