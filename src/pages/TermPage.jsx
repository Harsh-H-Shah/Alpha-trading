import React from 'react';
import Navbar from '../components/Navbar';

const TermPage = () => {
  return (
    <div>
      <Navbar />
      <section className="m-10 font-sans">
        <h1 className="text-xl font-bold">Terms and conditions</h1>
        <p>Welcome to Alpha trading!</p>
        <br />
        <p>
          These terms and conditions outline the rules and regulations for the
          use of Alpha Trading's Website, located at
          https://alpha-trading.netlify.app.
        </p>
        <br />
        <p>
          By accessing this website we assume you accept these terms and
          conditions. Do not continue to use Alpha trading if you do not agree
          to take all of the terms and conditions stated on this page.
        </p>
        <br />
        <p>
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and all Agreements: "Client",
          "You" and "Your" refers to you, the person log on this website and
          compliant to the Company’s terms and conditions. "The Company",
          "Ourselves", "We", "Our" and "Us", refers to our Company. "Party",
          "Parties", or "Us", refers to both the Client and ourselves. All terms
          refer to the offer, acceptance and consideration of payment necessary
          to undertake the process of our assistance to the Client in the most
          appropriate manner for the express purpose of meeting the Client’s
          needs in respect of provision of the Company’s stated services, in
          accordance with and subject to, prevailing law of Netherlands. Any use
          of the above terminology or other words in the singular, plural,
          capitalization and/or he/she or they, are taken as interchangeable and
          therefore as referring to same.
        </p>
        <br />
        <h1 className="text-xl font-bold">License</h1>
        <p>
          Unless otherwise stated, Alpha Trading and/or its licensors own the
          intellectual property rights for all material on Alpha trading. All
          intellectual property rights are reserved. You may access this from
          Alpha trading for your own personal use subjected to restrictions set
          in these terms and conditions.
        </p>
        <br />
        <p>You must not:</p>
        <ul>
          <li>Republish material from Alpha trading</li>
          <li>Sell, rent or sub-license material from Alpha trading</li>
          <li>Reproduce, duplicate or copy material from Alpha trading</li>
          <li>Redistribute content from Alpha trading</li>
        </ul>
        <br />
        <p>
          Parts of this website offer an opportunity for users to post and
          exchange opinions and information in certain areas of the website.
          Alpha Trading does not filter, edit, publish or review Comments prior
          to their presence on the website. Comments do not reflect the views
          and opinions of Alpha Trading,its agents and/or affiliates. Comments
          reflect the views and opinions of the person who post their views and
          opinions. To the extent permitted by applicable laws, Alpha Trading
          shall not be liable for the Comments or for any liability, damages or
          expenses caused and/or suffered as a result of any use of and/or
          posting of and/or appearance of the Comments on this website.
        </p>
        <br />
        <p>
          Alpha Trading reserves the right to monitor all Comments and to remove
          any Comments which can be considered inappropriate, offensive or
          causes breach of these Terms and Conditions.
        </p>
      </section>
    </div>
  );
};

export default TermPage;
