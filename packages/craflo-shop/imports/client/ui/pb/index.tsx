import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider } from 'baseui';
import { ApolloProvider } from '@apollo/react-hooks';
import { theme } from './theme';
import Routes from './routes';
import ApolloClient from 'apollo-boost';
import * as serviceWorker from './serviceWorker';
import './theme/global.css';
import { OidcSecure } from "@axa-fr/react-oidc-context";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import Tour, { Navigation, Dot, Controls, Arrow } from './tour'
import { GlobalStyle } from './tour-components/style'
import { Route, Switch, Redirect, Link } from 'react-router-dom';
import useCurrentShopId from "/imports/client/ui/hooks/useCurrentShopId";
import { useHistory, withRouter } from "react-router-dom";


const client = new ApolloClient({
  uri: process.env.REACT_APP_API_URL,
});




function App() {
  const engine = new Styletron();
  const [isTourOpen, setOpen] = useState(false)
  const [isShowingMore, setShowingMore] = useState(false)
  const [customComps, setCustomComps] = useState(false)

  useEffect(() => {
    function keyHandling(e) {
      if (e.keyCode === 75) {
        e.preventDefault()
        setOpen(true)
      }

      if (isTourOpen && e.keyCode === 13) {
        e.preventDefault()
        setCustomComps(!customComps)
      }
    }
    window.addEventListener('keyup', keyHandling)
    return () => window.removeEventListener('keyup', keyHandling)
  }, [isTourOpen, customComps])

  const disableBody = target => disableBodyScroll(target)
  const enableBody = target => enableBodyScroll(target)
  const accentColor = 'linear-gradient(to right, #1c8f9e, #5cb7b7)'
  const [onboardProgress, setOnboardProgress] = useState(0.4)

  return (
    <>
    <OidcSecure>
    <StyletronProvider value={engine}>
        <BaseProvider theme={theme}>
          <BrowserRouter>
              {isTourOpen? <div id="progressBarContainer">
                <div id="progressBar" style={{transform: `scale(${onboardProgress}, 1)`, opacity: `1`}}/>
              </div>: null}
              <Routes />
              <OnboardTour
                onAfterOpen={disableBody}
                onBeforeClose={enableBody}
                onRequestClose={() => setOpen(false)}
                isOpen={isTourOpen}
                maskClassName="mask"
                className="helper"
                rounded={5}
                accentColor={accentColor}
                CustomHelper={customComps ? MyCustomHelper : null}
                closeWithMask={false}
                disableInteraction={false}
                showCloseButton={false}
              />
          </BrowserRouter>
        </BaseProvider>
      </StyletronProvider>
      {/*<GlobalStyle />*/}
      {/*<Demo*/}
      {/*  openTour={() => setOpen(true)}*/}
      {/*  toggleShowMore={() => setShowingMore(!isShowingMore)}*/}
      {/*  isShowingMore={isShowingMore}*/}
      {/*/>*/}
      {/*<Suspense fallback={<React.Fragment />}>*/}

      {/*</Suspense>*/}
    </OidcSecure>
    </>
  );
}



function MyCustomHelper({ current, content, totalSteps, gotoStep, close }) {
  const accessories = [
    'Blank',
    'Kurt',
    'Prescription01',
    'Prescription02',
    'Round',
    'Sunglasses',
    'Wayfarers',
  ]
  return (
    <main className="CustomHelper__wrapper">
      <aside className="CustomHelper__sidebar">
        <span className="CustomHelper__sidebar_step">Step {current + 1}</span>
        <img
          className="CustomHelper__sidebar_img"
          src={`https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=${accessories[current]}&hairColor=Brown&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerSweater&eyeType=WinkWacky&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Pale`}
        />
        <span className="CustomHelper__sidebar_step">Lorem Ipsum</span>
      </aside>
      <div  className="CustomHelper__content">

        {content}
        <Controls
          data-tour-elem="controls"
          className="CustomHelper__controls"
          style={{ position: 'absolute' }}
        >
          <Arrow
            onClick={() => gotoStep(current - 1)}
            disabled={current === 0}
            className="CustomHelper__navArrow"
          />
          <Navigation data-tour-elem="navigation">
            {Array.from(Array(totalSteps).keys()).map((li, i) => (
              <Dot
                key={li}
                onClick={() => current !== i && gotoStep(i)}
                current={current}
                index={i}
                disabled={current === i}
                showNumber={true}
                data-tour-elem="dot"
              />
            ))}
          </Navigation>
          <Arrow
            onClick={() => gotoStep(current + 1)}
            disabled={current === totalSteps - 1}
            className="CustomHelper__navArrow"
            inverted
          />
        </Controls>
      </div>
    </main>
  )
}



const timeout = ms => new Promise(res => setTimeout(res, ms))



const OnboardTour = withRouter(
  ({ location: { pathname }, history, ...rest}  ) => {
    console.log(rest)
    const [shopId] = useCurrentShopId()
    const tourConfig = [
      {
        content:  ( <div style={{color: "#000"}}>Let's start onboarding you</div>),
      },
      ...(pathname === "/" + shopId + "/dashboard"
        ? [
          {
            selector: '[tour-onboard="side-settings"]',
            mutationObservables: '[tour-onboard="side-settings"]',
            content: ( <div style={{color: "#000"}}>we will now guide you, how to setup shop</div>),
            action: () => history.push("/" + shopId +"/site-settings")
          }]
          : pathname === "/" + shopId +"/site-settings"
            ? [
              {
                selector: '[tour-onboard="site-settings"]',
                mutationObservables: '[tour-onboard="site-settings"]',
                content: ( <div style={{color: "#000"}}>Please Fill up all mandatory information about your Shop</div>)
              }
            ]: []
      ),

   //
   //    {
   //      selector: '[tour-onboard="side-products"]',
   //      content: `Keep in mind that you could try and test everything during the Tour.
   //    For example, try selecting the highlighted text…`,
   //    },
   //    {
   //      selector: '[tour-onboard="shop2"]',
   //      content: function DemoHelperComponent() {
   //        return (
   //          <div>
   //            <Text color="#e5e5e5">
   //              The tourist guide{' '}
   //              could be dressed in any way, using custom components, styles and so
   //              on…
   //            </Text>
   //            <Text color="#373737" size=".7em" style={{ marginTop: '.7em' }}>
   //              <Link
   //                href="http://codepen.io/lbebber/full/ypgql/"
   //                color="dark"
   //                nospaces
   //              >
   //                Text effect
   //              </Link>{' '}
   //              by{' '}
   //              <Link href="https://twitter.com/lucasbebber" color="dark" nospaces>
   //                Lucas Bebber
   //              </Link>
   //            </Text>
   //          </div>
   //        )
   //      },
   //      style: {
   //        backgroundColor: 'black',
   //        color: 'white',
   //      },
   //    },
   //    {
   //      selector: '[data-tut="reactour__goTo"]',
   //      content: function DemoHelperComponent({ goTo }) {
   //        DemoHelperComponent.propTypes = {
   //          goTo: PropTypes.func.isRequired,
   //        }
   //
   //        return (
   //          <div>
   //            If you wanna go anywhere, skipping places, it is absolutely possible.
   //            <br />
   //            &quot;Oh, I forgot something inside the bus&hellip;&quot;{' '}
   //            <button
   //              style={{
   //                border: '1px solid #f7f7f7',
   //                background: 'none',
   //                padding: '.3em .7em',
   //                fontSize: 'inherit',
   //                display: 'block',
   //                cursor: 'pointer',
   //                margin: '1em auto',
   //              }}
   //              onClick={() => goTo(1)}
   //            >
   //              Please go back to 🚌
   //            </button>
   //          </div>
   //        )
   //      },
   //    },
   //    {
   //      selector: '[data-tut="reactour__position"]',
   //      content: function DemoHelperComponent() {
   //        return (
   //          <Text>
   //            The tourist guide{' '}
   //            could be positioned where you want.
   //            <br />
   //            In this case will try to stay in the <strong>left side</strong> if
   //            there is available space, otherwise will{' '}
   //            <strong>auto position</strong>.
   //          </Text>
   //        )
   //      },
   //      position: 'left',
   //    },
   //    {
   //      selector: '[data-tut="reactour__scroll"]',
   //      content:
   //        'Probably you noted that the Tour scrolled directly to the desired place, and you could control the time also…',
   //    },
   //    {
   //      selector: '[data-tut="reactour__scroll--hidden"]',
   //      content: 'Also when places are pretty hidden…',
   //    },
   //    {
   //      selector: '[data-tut="reactour__action"]',
   //      content:
   //        'When arrived on each place you could fire an action, like… (look at the console)',
   //      action: () =>
   //        console.log(`
   //                ------------🏠🏚---------
   //    🚌 Arrived to explore these beautiful buildings! 🚌
   //                ------------🏠🏚---------
   // 🚧 This action could also fire a method in your Component 🚧
   //  `),
   //    },
   //    {
   //      selector: '[data-tut="reactour__state"]',
   //      content:
   //        'And the Tour could be observing changes to update the view, try clicking the button…',
   //      observe: '[data-tut="reactour__state--observe"]',
   //      action: node => node.focus(),
   //    },
    ]

    return (
      <Tour
        steps={tourConfig}
        {...rest}
        update={pathname}
      />
    );
  }
);
//ReactDOM.render(<App />, document.getElementById('root'));
export default App;
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
