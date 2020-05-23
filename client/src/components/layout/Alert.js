import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alert';

const Alert = ({ alerts, removeAlert }) => {

    const handleClick = id => () => {
        removeAlert(id);
    }

    return alerts !== null && alerts.length > 0 && alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.type}`} onClick={handleClick(alert.id)}>
            {alert.text}
        </div>
    ));
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps, { removeAlert })(Alert);