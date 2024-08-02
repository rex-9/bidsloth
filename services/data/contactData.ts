import EmailIcon from "../../svgs/emailIcon";
import InstaIcon from "../../svgs/instaIcon";
import MessengerIcon from "../../svgs/messengerIcon";
import NoEmailIcon from "../../svgs/noEmailIcon";
import SnapchatIcon from "../../svgs/snapchatIcon";
import TwitterIcon from "../../svgs/twitterIcon";
import WhatsappIcon from "../../svgs/whatsappIcon";

const contactData: {
  label: string;
  svg: any;
  value: string;
}[] = [
  {
    label: "Email",
    svg: EmailIcon,
    value: "email",
  },
  {
    label: "Instagram DM",
    svg: InstaIcon,
    value: "instagram",
  },
  {
    label: "WhatsApp",
    svg: WhatsappIcon,
    value: "whatsapp",
  },
  {
    label: "FB Messenger",
    svg: MessengerIcon,
    value: "messenger",
  },
  {
    label: "Snapchat",
    svg: SnapchatIcon,
    value: "snapchat",
  },
  {
    label: "Twitter DM",
    svg: TwitterIcon,
    value: "twitter",
  },
  {
    label: "No contact",
    svg: NoEmailIcon,
    value: "none",
  },
];

export default contactData;
