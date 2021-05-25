import React from "react";
import { Link } from "react-router-dom";
import firebaseNP from "firebase";
import CustomGen from "../assets/custom_gen.png";
import UniqueSim from "../assets/uniquesims.png";
import Header from "../components/Header";
import "../css/home.css";

export default function HomePage(props:{user: firebaseNP.User | null}) {
  const { user } = props;
  return (
    <>
      <Header user={user} />
      <div id="home">

        <h1>The Xpress Way</h1>
        <h2>
          Xpress Accounts has shown time after time consistency and proven success. With so many options available your fingertips there is no reason to pay for overpriced accounts

        </h2>
        <Link to="products">Browse Products</Link>
        <div className="info">
          <div className="image">
            <img src={CustomGen} alt="custom gen" height="180" />
          </div>
          <div>
            <h2>
              Custom Generator
            </h2>
            <p>Our custom generator Is equipped with an API Sensor which provides Fingerprint AI Activity, This helps our accounts to deceive Nike`s protection, As they are not able to tell the difference within our generator and a Normal Human.</p>
          </div>
        </div>
        <div className="info">
          <div>
            <h2>
              Unique Sims
            </h2>
            <p>At Xpress Accounts, We take the extra steps to make sure each SNKR Account has a unique SIM Number. Why Is using Unique SIM`s Important? Nike tends to have huge Account ban waves prior to profitable releases, With our Unique SIM`s they will help reduce the chances of Nike clipping the Accounts.</p>
          </div>
          <div className="image">
            <img src={UniqueSim} alt="custom gen" height="120" />
          </div>

        </div>
      </div>
    </>
  );
}
