import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({price}) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_51KbPQKKkZeNggc2qjLWaZai4LZdhImVj18FnnJEl9yyvLtTxWzjiSkg3mx5MYGIn7AgCI77S22sj5BQdDWb9Rlcj00mK7wMbOz'

  const onToken = token => {
    console.log(token)
    alert('Payment Successfull')
  }

  return (
    <StripeCheckout 
      label="Pay now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      currency="EUR"
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is ${price}€`}
      amount={priceForStripe}
      panelLabel="Pay now"
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton