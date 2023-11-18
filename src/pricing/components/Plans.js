import { useState } from "react";
import { loadStripe }  from '@stripe/stripe-js';
import { SITE_URL } from "src/core/utils";

export default function Plans({ plans }) {
 const [selected, setSelected] =useState('month')
 const [isRedirecting, setRedirecting]= useState(false)
 const plan = plans.find(plan=>plan.interval === selected)

function togglePlan() {
    const interval = selected === 'month' ? 'year' : 'month'
    setSelected(interval);
}

async function onCheckout() {
    setRedirecting(true)
    const response = await fetch(`${SITE_URL}/api/checkout/${plan.id}`);
    const data = await response.json();
    const stripe = await loadStripe('pk_test_51OAF7wE2GvzqOTCpmD43uBuFFbzsZ4LAdDVPGrWD16qPU1zWexvAZtYxNOBaN9FjqTF7IIvXRgHPsmCZKLTMea99004lEie9qG');
    await stripe.redirectToCheckout({ sessionId: data.id });
    setRedirecting(false)
  }
  
    return (
        <div className="bg-salmon border-right">
            <div className="column-padding centered">
                <div className="callout-wrap">
                    <div className="plan">
                        <div className="plan-wrap">
                            <div className="plan-content">
                            <div className="plan-switch">
                             Monthly
                             <label className="switch">
                                <input onChange={togglePlan} type='checkbox'/>
                                <span className="slider"/>
                             </label>
                             Yearly
                            </div>
                            <h2 className="plan-name">{plan.name}</h2>
                            <div>Just RON{plan.price} / {plan.interval}</div>
                        </div>
                        <div>
                            <button disabled={isRedirecting} onClick={onCheckout} className="large-button">
                                <div className="large-button-text">{isRedirecting ? "Loading... " : "Buy now"}</div>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
