import React from 'react';
import { Link } from 'react-router-dom';

const SurveySummary = ({ survey }) => {
    const { category, id, name } = survey;
    return (
        <div className='card hoverable ' style={{ padding: '0.25rem' }}>
            {' '}
            <h5>{category}</h5>
            <div style={flexBetweenCenter}>
                <span>{name} </span>
                <Link
                    to={{
                        pathname: `/surveys/${id}`,
                        survey: survey
                    }}
                >
                    <button className='hoverable mx-2 waves-effect waves-light btn-large purple darken-4'>
                        Vote Now! <i className='material-icons left'>thumbs_up_down</i>
                    </button>
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

export default SurveySummary;
