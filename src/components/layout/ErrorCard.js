import React from 'react';
import { connect } from 'react-redux';

const ErrorCard = props => {
    return (
        <>
            {props.message ? (
                <div className='row center error-message' style={{ marginBottom: '0' }}>
                    <div className='col s12 m8 offset-m2 '>
                        <div className='card  pink darken-2'>
                            <div className='card-content white-text' style={{ padding: '6px' }}>
                                <strong className='card-title' style={{ margin: '0' }}>
                                    {props.message}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

const mapStateToProps = state => ({
    message: state.error.message
});

export default connect(mapStateToProps, null)(ErrorCard);
