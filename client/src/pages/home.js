import { useState } from 'react'
import Header from '../components/home-header';
import InitialOrder from "../components/initial-order";
import Masters from '../components/masters';
import OrderReview from '../components/order-review';
import Success from '../components/success';
import NoMasters from '../components/no-masters';
import Footer from "../components/footer";


const Home = () => {
  const [state, setState] = useState(null);  
  const context = (state) => {
    setState(state);
  }
  return (
    <>
      <Header />
      {!state && (<InitialOrder context={context} className='main' />)}
      {state && state.nextState === 'masters' && (<Masters state={state} context={context} className='main' />)}
      {state && state.nextState === 'review' && (<OrderReview state={state} context={context} className='main' />)}
      {state && state.nextState === 'success' && (<Success className='main' context={context}/>)}
      {state && state.nextState === 'no-masters' && (<NoMasters className='main' context={context}/>)}
      <Footer />
    </>     
    )
}

export default Home