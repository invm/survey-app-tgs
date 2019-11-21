import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const SurveySummary = props => {
    const { category, id, name } = props.survey;
    const {
        isAuthenticated,
        admin,
        user: { completedSurveys }
    } = props.auth;

    return (
        <div className='card hoverable ' style={{ padding: '0.25rem' }}>
            {' '}
            <h5>Category: {category}</h5>
            <div style={flexBetweenCenter}>
                <span>{name} </span>
                <Link
                    to={{
                        pathname: `/surveys/${id}`,
                        survey: props.survey
                    }}
                >
                    {isAuthenticated && !admin && !completedSurveys.includes(id) ? (
                        <button className='hoverable mx-2 waves-effect waves-light btn-large purple darken-4'>
                            Vote Now! <i className='material-icons left'>thumbs_up_down</i>
                        </button>
                    ) : (
                        <button className='hoverable mx-2 waves-effect waves-light btn-large purple darken-4'>
                            Show Results! <i className='material-icons left'>thumbs_up_down</i>
                        </button>
                    )}
                </Link>
            </div>
        </div>
    );
};

const flexBetweenCenter = {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '0.25rem',
    alignItems: 'center'
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, null)(SurveySummary);
