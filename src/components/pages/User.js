import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { redeemCoupon } from '../../actions/surveyActions';
import { updateUser } from '../../actions/authActions';
import { setError } from '../../actions/errorActions';
import Spinner from '../layout/Spinner';
import SurveySummary from '../surveys/SurveySummary';

const User = props => {
    const { isAuthenticated, admin, user, loading, error } = props.auth;
    const { surveys } = props.survey;
    const [userInfo, setUserInfo] = useState(user);
    let { action } = props.location || 0;

    useEffect(() => {
        if (!isAuthenticated || !action || admin) props.history.push('/dashboard');
        (function() {
            var list = document.getElementsByTagName('label');
            for (let item of list) {
                item.className = 'active';
            }
        })();
        if (error) {
            props.setError(error);
            setTimeout(() => props.history.push('/'), 1000);
        }
        //eslint-disable-next-line
    }, [isAuthenticated, admin, action, error]);

    const handleRedeem = id => props.redeemCoupon(user.uid, id);

    const handleInput = e => setUserInfo({ ...userInfo, [e.target.id]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        props.updateUser({ fname: userInfo.fname, lname: userInfo.lname });
    };

    if (!action) props.history.push('/dashboard');

    switch (props.location.action) {
        case 'view-completed':
            action = (
                <div className='row'>
                    <div className='col s12'>
                        <h4>Completed Surveys</h4>
                        {surveys
                            .filter(survey => user.completedSurveys.includes(survey.id))
                            .map(survey => (
                                <SurveySummary survey={survey} key={survey.id} />
                            ))}
                        <Link to='/surveyslist'>
                            <button style={{ margin: '2rem 0' }} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                                Complete surveys to earn coupons <i className='material-icons left'>how_to_vote</i>
                            </button>
                        </Link>
                    </div>
                </div>
            );
            break;
        case 'view-coupons':
            action = (
                <div className='row'>
                    <div className='col s12 m8 offset-m2'>
                        <h4>User's coupons</h4>
                        {user.coupons.length ? (
                            <>
                                {user.coupons.map(coupon => (
                                    <p key={coupon.id}>
                                        {' '}
                                        {coupon.id}{' '}
                                        {coupon.redeemed ? (
                                            <strong>Redeemed Coupon</strong>
                                        ) : (
                                            <button
                                                style={{ margin: '2rem 0' }}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    handleRedeem(coupon.id);
                                                }}
                                                className='mx-2 waves-effect waves-light btn-large purple darken-4'
                                            >
                                                {loading && <Spinner size={1} button={true} />} Redeem
                                            </button>
                                        )}{' '}
                                    </p>
                                ))}
                            </>
                        ) : (
                            <Link to='/surveyslist'>
                                <button style={{ margin: '2rem 0' }} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                                    Complete surveys to earn coupons <i className='material-icons left'>how_to_vote</i>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            );
            break;
        case 'edit-user':
            action = (
                <div className='row'>
                    <div className='col s12 m8  offset-m2'>
                        <h4>Update User Info</h4>
                        <form className='col s12 m8 offset-m2' onSubmit={() => {}}>
                            <div className='row'>
                                <div className=' input-field col s12'>
                                    <input required value={userInfo.fname} onChange={handleInput} id='fname' type='text' className='validate' />
                                    <label htmlFor='fname'>First Name</label>
                                </div>
                            </div>
                            <div className='row'>
                                <div className=' input-field col s12'>
                                    <input required value={userInfo.lname} onChange={handleInput} id='lname' type='text' className='validate' />
                                    <label htmlFor='lname'>Last Name</label>
                                </div>
                            </div>
                            <button style={{ margin: '1rem 0', width: '100%' }} onClick={handleSubmit} className='mx-2 waves-effect waves-light btn-large purple darken-4'>
                                {loading ? <Spinner size={1} button={true} /> : <i className='material-icons left'>perm_identity</i>} Update Info
                            </button>
                        </form>
                    </div>
                </div>
            );
            break;
        default:
            return <></>;
    }

    return <div className='card fade center'>{action}</div>;
};

const mapStateToProps = state => ({
    auth: state.auth,
    survey: state.survey
});
export default connect(mapStateToProps, { redeemCoupon, updateUser, setError })(User);
