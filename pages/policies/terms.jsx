import Image from "next/image";
import { useRouter } from "next/router";
export default function Terms() {
  const router = useRouter();

  const Header = ({ content }) => (
    <>
      <h1 className="text-3xl mt-2">{content}</h1>
      <br />
    </>
  );
  const SubHeader = ({ content }) => <h3>{content}</h3>;
  const Paragraph = ({ contents, underline }) => {
    return (
      <>
        <p>
          {contents.map((content) => (
            <>
              <span>
                {content}
                {underline && <span className="underline">{underline}</span>}
              </span>
              <br />
            </>
          ))}
          <br />
        </p>
      </>
    );
  };

  const close = () => {
    router.back();
  };

  return (
    <>
      <section className="w-[100vw] flex justify-center bg-white py-8 px-5 md:px0">
        <div className="flex flex-col items-center w-full md:w-[80vw] lg:w-[70vw]">
          <button
            className="absolute right-[5%] top-[3%]"
            onClick={() => close()}
          >
            <Image
              height={100}
              width={100}
              src="/close.png"
              className="w-auto h-8"
              alt="close"
            />
          </button>
          <div className="flex flex-col justify-center items-center">
            <Image
              height={100}
              width={100}
              src="/red-bo.png"
              alt="Red Bo"
              className="w-auto h-20"
            />
            <Image
              height={100}
              width={100}
              src="/trademark.png"
              alt="Trademark"
              className="w-auto h-6"
            />
          </div>
          <h1 className="text-primary text-3xl my-8">
            Terms of Use for bidsloth
          </h1>
          <div className="text-start w-full">
            <SubHeader content="Effective date: 30th June, 2023" />
            <br />
            <Paragraph
              contents={[
                "bidsloth is an auction platform that helps creators to auction items for their fans.",
              ]}
            />
            <Paragraph
              contents={[
                "Terms can be super-duper BORING! We know! So, we’ve tried to make these as straightforward as possible!",
              ]}
            />

            <Header content="Wel-eeee to bidsloth!" />
            <Paragraph contents={["That’s welcome to bidsloth in sloth!"]} />
            <Paragraph
              contents={[
                "These are bidsloth’s terms of use for creators and bidders, and they apply to all users of the platform.",
                "“We,” “our,” and “us” refers to bidsloth LTD. “bidsloth” refers to all platforms and services offered by us.",
                "By using bidsloth you agree to these terms and our privacy policy which you can read here.",
              ]}
            />
            <Paragraph
              contents={[
                "Please read both carefully, and if you have any questions get in touch.",
              ]}
            />

            <Header content="Your Account" />
            <Paragraph
              contents={["There are two main types of accounts om bidsloth."]}
            />
            <Paragraph
              contents={[
                "A creator account. A user who creates an auction on bidsloth.",
              ]}
            />
            <Paragraph
              contents={[
                "And a bidder account. A user who bids on an auction on bidsloth.",
              ]}
            />
            <Paragraph
              contents={[
                "To create a creator or bidder account, you must be 18 years of age or older to do so. Or have your parent’s or legal guardian’s permission to either have a creator account on bidsoth or to bid on bidsloth.",
              ]}
            />
            <Paragraph
              contents={[
                "If necessary, we may ask you proof of age or proof of your parent’s or legal guaridan’s permission.",
              ]}
            />
            <Paragraph
              contents={[
                "To use some of our features, you’ll need to register with your email, create a username, and set a password. When you do that, the information you give us must be accurate and complete, in good faith. Don’t impersonate anyone else or choose names that are offensive or that violate anyone’s rights.",
              ]}
            />
            <Paragraph
              contents={[
                "You’re responsible for all the activity on your account, and the security of your account.",
              ]}
            />
            <Paragraph
              contents={[
                "If you violate our terms or policies, then we may terminate your account. Don’t do anything illegal, abusive towards others, or that abuses our site in a technical way.",
              ]}
            />
            <Paragraph
              contents={[
                "If you find out that someone has used your account without your permission, you should report it to ",
              ]}
              underline={"hello@bidsloth.com"}
            />

            <Header content="For the creators" />
            <SubHeader content="What’s not allowed!" />
            <Paragraph
              contents={[
                "We want to keep Bidsloth a friendly and safe space for creators and bidders to engage!",
              ]}
            />
            <Paragraph
              contents={[
                "As a creator, you cannot auction the following items:",
                "· You cannot auction something unlawful.",
                "· You cannot auction something fraudulent or deceptive.",
                "· You cannot auction something that is invasive of another’s privacy, tortious, obscene, offensive profane, or vulgar.",
                "· You cannot auction prohibited items.",
                "· You cannot auction something that victimizes anyone.",
                "· You cannot auction something that facilitates spam.",
                "· You cannot auction something that is pornographic, contains or depicts nudity or sexual activity, or is otherwise inappropriate as determined by us in our sole discretion.",
              ]}
            />
            <Paragraph
              contents={[
                "This may sound like a lot! But we just want to keep bidsloth a joyful place. We do have a strict one strike policy.",
              ]}
            />
            <Paragraph
              contents={[
                "If you do auction any of the above, we have the right to delete your account with immediate effect.",
              ]}
            />

            <SubHeader content="You own your creations!" />
            <Paragraph
              contents={[
                "Creators keep full ownership of their auctions and all respective material. We will NOT steal your creations and will not use them in any exploitative ways.",
              ]}
            />
            <Paragraph
              contents={[
                "However, for us to operate our services, including hosting your auctions, providing promotional activities to your bidders, and enabling community features like post comments, we require a license from you the creator. And so, by making an auction on Bidsloth, you grant us a royalty-free, perpetual, irrevocable, non-exclusive, sublicensable, worldwide license covering your creation or what you post in all formats and channels now known or later developed anywhere in the world to use, copy, reproduce, store, translate, transmit, distribute, perform, prepare derivative works, publicly display, and display in connection with any name, username, voice, or likeness provided in connection with Bidsloth. If your creations contains any personal data, you also recognize Bidsloth’s “legitimate interest” in it in accordance with the scope of this license.",
              ]}
            />
            <Paragraph
              contents={[
                "Again this sounds like a lot, but just to make it clear, we will never use your creations in an exploitative way, or seek to profit off of them by any means other than facilitating bids and offerings you’ve configured on Bidsloth.",
              ]}
            />
            <Paragraph
              contents={[
                "Creators cannot use creations posted by other creators in any way not authorized by that creator.",
              ]}
            />

            <SubHeader content="Getting paid!" />
            <Paragraph
              contents={[
                "Starting an auction on bidsloth is free, but once an auction ends, a small percentage is deducted from the final bid amount by us and our payment processor, Stripe. Our fee is a fixed 10%, while Stripe's fee varies based on the location of you and the bidder.",
                "Stripe operates independently, and we can't guarantee or control their performance. Stripe may also charge a currency conversion fee, which depends on the locations and currencies involved. We advise reviewing Stripe's terms for details on these fees.",
              ]}
            />
            <Paragraph
              contents={[
                "The winning bidder has 48 hours to make the payment. Failing this, the opportunity is passed to the next highest bidder. This policy keeps the auction process fair and efficient.",
              ]}
            />
            <Paragraph
              contents={[
                "We've added an escrow-like payment feature for your protection. Once the payment is received, it's held until the winner confirms that the product or experience has been delivered to them. This ensures both parties are satisfied before the funds are transferred.",
              ]}
            />
            <Paragraph
              contents={[
                "Payments are instantly transferred to you via Stripe after confirmation, with no minimum or maximum limits. ",
              ]}
            />
            <Paragraph
              contents={[
                "First-time Stripe users might experience a delay of up to 7 days.",
              ]}
            />
            <Paragraph
              contents={[
                "You can monitor all payments via your creator Dashboard on bidsloth.",
              ]}
            />
            <Paragraph
              contents={[
                "Track all transactions through your bidsloth creator Dashboard. As a creator, you're responsible for reporting any income, fees, or taxes from your account. bidsloth and Stripe provide necessary transaction details and earnings reports, but you must understand and comply with tax laws in your region. Consult a tax professional for advice on reporting requirements and taxation.",
              ]}
            />

            <SubHeader content="Communicating with the winner" />
            <Paragraph
              contents={[
                "We provide the option to communicate with the winning bidder outside of the platform if desired. However, please note that when choosing to communicate outside of the platform, you acknowledge that bidsloth is not liable for how those external communication platforms are used, and we recommend reading and complying with the terms and privacy policies of those platforms.",
              ]}
            />

            <SubHeader content="Your role!" />
            <Paragraph
              contents={[
                "If we are sued because of your conduct on Bidsloth, you will have to help pay for it. By using Bidsloth you agree to indemnify us and all our subsidiaries, affiliates, officers, directors, employees, agents, and third-party service providers. You agree to assist and cooperate with us as reasonably required in the defense or settlement of any such matters.",
              ]}
            />
            <Paragraph
              contents={[
                "At Bidsloth, we want to ensure that our users have a positive and safe experience on our platform. Therefore, we want to inform you that we cannot be held liable for any damages or losses related to your use of the Services. This includes disputes between users or between users and any third party regarding the use of the Services.",
              ]}
            />
            <Paragraph
              contents={[
                "Please note that we do not oversee the performance or punctuality of auctions, and we do not endorse any content users submit to the Site. All content on Bidsloth is at your own risk, and you are solely responsible for any resulting damage or loss to any party.",
              ]}
            />
            <Paragraph
              contents={[
                "When using our Services, you release Bidsloth from any claims, damages, and demands of every kind, known or unknown, suspected or unsuspected, disclosed or undisclosed, arising out of or in any way related to such disputes and the Services.",
              ]}
            />
            <Paragraph
              contents={[
                "We hope that you have a great experience on Bidsloth, and we encourage you to report any concerns or issues you may have while using our Services.",
              ]}
            />

            <Header content="For the bidders" />
            <SubHeader content="Keep it private!" />
            <Paragraph
              contents={[
                "To bid on Bidsloth, you must provide a valid email address. Bidsloth will keep you up-to-date on your bids via email, and also notify you via email if you are outbid and give you the chance to bid again. Please do not share any private information regarding your bids with others, and refrain from creating multiple email addresses to bid multiple times.",
              ]}
            />
            <SubHeader content="Placing a bid!" />
            <Paragraph
              contents={[
                "When placing a bid, you are expected to do so in good faith and with the intention of purchasing the prize if you win. You will have 48 hours to make payment for the item if they win the auction. If payment is not received within this time frame, the prize will be offered to the second-place bidder.",
              ]}
            />
            <SubHeader content="Conduct towards the creator!" />
            <Paragraph
              contents={[
                "If you do win an auction, you will be given the opportunity to communicate directly with the creator outside of the bidsloth platform. When receiving this information you must keep their communication details private. Do not engage any abusive or harassing behavior towards the creator.",
              ]}
            />
            <SubHeader content="The prizes!" />
            <Paragraph
              contents={[
                "Please note that auction prizes may vary and bidsloth has limited control over the quality and specific benefits of the items being auctioned. While we attempt to screen for fraudulent auctions, we cannot guarantee the identity of creators or the validity of any claims they make. We would appreciate your help in reporting any suspicious creator pages so we can keep the bidsloth community safe.",
              ]}
            />
            <SubHeader content="Refunds" />
            <Paragraph
              contents={[
                "bidsloth will not provide refunds if the prize is delivered and as promised by the creator.",
                "If there is an issue with the prize, we advise bidders to first reach out to the creator to resolve the issue. The creator can then communicate with us and issue a refund if necessary.",
                "If the issue remains unresolved, bidders can directly contact Bidsloth for a refund. Granting a refund is at our sole discretion.",
                "To be eligible for a refund, bidders must contact Bidsloth within 10 days of the charge processing on their statement. Bidsloth will notify bidders whether the refund is approved and issued or denied. Once a refund is issued, it may take up to 5-7 business days to process.",
              ]}
            />

            <Header content="What we own!" />
            <Paragraph
              contents={[
                "We own all IP related to Bidsloth. So that includes all text, logos, artwork and codebase. We grant creators a license to use our logo and other IP properties to promote their Bidsloth pages.",
              ]}
            />
            <Paragraph
              contents={[
                "Anyone else cannot otherwise use, reproduce, distribute, perform, publicly display, or prepare derivative works of our creations unless we give you direct permission.",
              ]}
            />
            <Paragraph
              contents={[
                "We love feedback from users of Bidsloth! Including any new ideas and identifications of any problems or bugs. By providing us with this feedback you agree that any suggestions, comments, ideas, bug reports, or suggested improvements that you provide to us will be fully owned by us so that we can use them to improve Bidsloth.",
              ]}
            />

            <Header content="Our third-party friends!" />
            <Paragraph
              contents={[
                "By linking other websites, apps, or services to your Bidsloth auction, you assume full responsibility, and we do not exercise any control or endorsement over those sites. We advise that you carefully review the terms and privacy policies of any linked websites.",
              ]}
            />
            <Paragraph
              contents={[
                "We have teamed up with Stripe for payment processing, and as a result, when you register for a Bidsloth account, you automatically agree to Stripe's terms.",
              ]}
            />

            <Header content="Saying bye bye!" />
            <Paragraph
              contents={[
                "You may permanently delete your account from your dashboard.",
              ]}
            />
            <Paragraph
              contents={[
                "If you do so, we will retain your account information for 14 days in case you wish to deactivate the deletion. After this period, we will permanently delete your account.",
              ]}
            />
            <Paragraph
              contents={[
                "Please note, for the safety of Bidsloth we reserve the right to terminate or suspend your account at any time, at our sole discretion. You may not bring a claim against us for suspending or terminating your account. If you attempt to bring such a claim, you will be responsible for any damages incurred, including attorneys' fees and costs.",
              ]}
            />
            <Paragraph
              contents={[
                "These terms and conditions remain in effect even if you no longer have an account.",
              ]}
            />

            <Header content="Disputes" />
            <Paragraph
              contents={[
                "If you encounter any problems or have any questions about these terms or your use of Bidsloth, please contact us at hello@bidsloth.com. We will make every effort to assist you and resolve the issue.",
                "However, if a legal dispute arises from these terms or in relation to your use of Bidsloth, the dispute will be governed by and resolved in accordance with the laws of the United Kingdom.",
              ]}
            />

            <Header content="That's it!" />
            <Paragraph
              contents={[
                "Just to confirm. By signing up, you confirm that you have read, understand, and agree to our terms and conditions.",
              ]}
            />
            <Paragraph
              contents={[
                "Except as otherwise expressly provided in these terms, there are no third-party beneficiaries to these terms, and no partnership, joint venture, employee-employer, or franchiser-franchisee relationship is created between you and us.",
              ]}
            />
            <Paragraph
              contents={[
                "We reserve the right to modify these terms and conditions at any time, and we will notify you of any changes before they come into effect. Your continued use of Bidsloth after the changes become effective constitutes your acceptance of the modified terms and policies.",
              ]}
            />
            <Paragraph contents={["Thank you for using Bidsloth!"]} />
          </div>
        </div>
      </section>
    </>
  );
}
