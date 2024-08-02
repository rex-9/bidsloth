import Image from "next/image";
import { useRouter } from "next/router";
export default function Privacy() {
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
  //   console.log(router.basePath);
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
            Privacy Policy for bidsloth
          </h1>
          <div className="text-start w-full">
            <SubHeader content="Effective date: 30th June, 2023" />
            <br />
            <Paragraph
              contents={[
                `This Privacy Policy describes how bidsloth ("we," "us," or "our") collects, uses, and protects the information provided by users ("you" or "your") through the bidsloth website (the "Website"). Please read this Privacy Policy carefully to understand our practices regarding your information. By accessing or using the Website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with our policies and practices, your choice is not to use the Website.`,
              ]}
            />

            <Header content="Information Collection" />
            <Paragraph
              contents={[
                "The information provided to bidsloth includes the information you provide through text fields when creating an account or engaging in activities on bidsloth. The specific information collected may vary depending on the type of account you have and your interactions on the Website. This information may include:",
              ]}
            />
            <Paragraph
              contents={[
                "- Username",
                "- First name/Surname",
                "- Email address",
                "- Password",
              ]}
            />

            <SubHeader content="Bidders" />
            <Paragraph
              contents={[
                "If you are a bidder on bidsloth, which refers to a fan who places bids on auctions, you may be required to provide your payment information to our payment partner, Stripe, in order to complete a winning auction transaction. We do not store your payment details, and you can review Stripe's privacy policy on their website. We collect and process information related to the bidsloth auctions you have bid on, liked, shared, or commented on.",
              ]}
            />

            <SubHeader content="Creators" />
            <Paragraph
              contents={[
                "If you are a creator on bidsloth, meaning you create auctions on the Website, you will need to create an account with our payment partner, Stripe, in order to receive payouts.",
              ]}
            />

            <Header content="Additional Information Collection" />
            <Paragraph
              contents={[
                "In addition to the information provided, bidsloth may collect some extra information when you visit the Website. This information is collected to improve our understanding of how people use the Website and to enhance its functionality. The additional information collected may include:",
              ]}
            />
            <Paragraph
              contents={[
                "- IP address",
                "- Approximate location (usually derived from your IP address)",
                "- Browser and/or device type",
                "- Date and time of visit",
                "- Operating system",
                "- Language settings",
                "- Referring web page (including parameters)",
                "- Pages visited",
                "- Session length",
              ]}
            />

            <Header content="Cookie Information" />
            <Paragraph
              contents={[
                "bidsloth uses cookies to remember certain information about you, such as your preferences and settings, to provide a smoother online experience. Cookies are small text files stored on your device by websites you visit. You can manage cookies in your browser settings. We use cookies for various purposes, including:",
              ]}
            />
            <Paragraph
              contents={[
                "- Identifying and remembering users",
                "- Improving bidding functionality",
                "- Navigating the Website",
                "- Accessing secure areas",
                "- Remembering your preferences",
              ]}
            />
            <Paragraph
              contents={[
                "Some cookies may expire after a certain period or when you log out. If you do not wish to have cookies placed on your device, you can set your browser to refuse cookies. However, please note that certain features of bidsloth's website may not function properly without the aid of cookies.",
              ]}
            />

            <Header content="Messages and Comments" />
            <Paragraph
              contents={[
                "When you send or receive  comments on bidsloth, we collect the content of those comments, as well as related information such as timestamps and views. This information helps us ensure smooth and safe communication on the platform.",
              ]}
            />

            <Header content="Advertisements" />
            <Paragraph
              contents={[
                "bidsloth does not run any external or third-party advertisements on the Website.",
              ]}
            />

            <Header content="Opting Out" />
            <Paragraph
              contents={[
                "Periodically, bidsloth may send marketing communications based on your previous usage. These communications will be sent exclusively via email. You can opt out of receiving marketing emails at any time by using the opt-out mechanism provided in the emails or by contacting us through your email platform. Opting out will stop the delivery of marketing emails from bidsloth.",
              ]}
            />

            <Header content="EU Privacy Laws & Data Transfer" />
            <Paragraph
              contents={[
                "As a global company headquartered in the United Kingdom , bidsloth is subject to data protection laws in various regions, including the European Union (EU). If you access our services from the EU or other areas with data collection and usage regulations, please be aware that your Personal Data will be transmitted to our servers in the United Kingdom and may also be transmitted to our service providers who support our business operations, as described above. It is important to note that the United Kingdom may have data protection laws that differ from or are less stringent than those in effect in your country.",
              ]}
            />
            <Paragraph
              contents={[
                "In the event that we transfer your Personal Data out of the EU, we will ensure that your information receives an adequate level of protection during processing and that your rights continue to be safeguarded, as outlined in the General Data Protection Regulation (GDPR).",
                "By providing your information to bidsloth's services, you consent to the transfer of your data to the United Kingdom and its global processing in accordance with this Privacy Policy.",
              ]}
            />

            <Header content="Security" />
            <Paragraph
              contents={[
                "The security of your personal data is important to us, and we follow industry standards and best practices to protect it. We implement appropriate technical and organizational measures to safeguard your information against loss, unauthorized access, disclosure, alteration, or destruction.",
              ]}
            />

            <Header content="Changes to the Privacy Policy" />
            <Paragraph
              contents={[
                "We may occasionally make changes to this Privacy Policy. If we make a change that, in bidsloth's sole discretion, is material, we will notify you before the changes come into effect. By continuing to use bidsloth after a change to this policy, you signify your acceptance of the updated Privacy Policy.",
              ]}
            />

            <Header content="Contact Us" />
            <Paragraph
              contents={[
                "If you have any questions, concerns, or inquiries regarding this Privacy Policy or our data practices, please contact us at hello@bidsloth.com. We will do our best to address your concerns and provide any necessary assistance.",
                "Thank you for reviewing our Privacy Policy.",
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
