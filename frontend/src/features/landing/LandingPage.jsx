import { useEffect, useState } from "react";
import Hero from "./Hero.jsx";
import HowItWorks from "./HowItWorks.jsx";
import UseCases from "./UseCases.jsx";
import Infrastructure from "./Infrastructure.jsx";
import CallToAction from "./CallToAction.jsx";
import Faq from "./Faq.jsx";
import Footer from "./Footer.jsx";
import SignIn from "../auth/SignIn.jsx";

export default function LandingPage() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isSignInOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSignInOpen]);

  const openSignIn = () => setIsSignInOpen(true);
  const closeSignIn = () => setIsSignInOpen(false);

  return (
    <>
      <main>
        <Hero onSignInClick={openSignIn} />
        <HowItWorks />
        <UseCases />
        <Infrastructure />
        <CallToAction onSignInClick={openSignIn} />
        <Faq />
      </main>
      <Footer />

      {isSignInOpen ? <SignIn onClose={closeSignIn} /> : null}
    </>
  );
}
