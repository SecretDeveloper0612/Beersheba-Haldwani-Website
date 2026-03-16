import Banner from "@/components/banner";
import Branches from "@/components/branches";
import FounderMessage from "@/components/message/founder-message";
import Video from "@/components/video";
import { server_query_function } from "@/lib/graphql";
import React from "react";

const Page = async () => {
  const query = `
query MyQuery {
  messages {
    messages {
      whoseMessage
      quote
      authorName
      message {
        html
      }
      image {
        url
      }
    }
  }
}
`;

  interface MessageResponse {
    messages: [{
      messages: {
        whoseMessage: string;
        quote: string;
        authorName: string;
        message: {
          html: string;
        };
        image: {
          url: string;
        };
      }[];
    }];
  }

  const response = await server_query_function(query) as MessageResponse;
  const messages = response?.messages?.[0]?.messages;

  if (!messages) {
    return <div className="p-10 text-center">Messages not found</div>;
  }

  return (
    <>
      <Banner
        title="Message"
        description="Beersheba - Haldwani"
        source="/assets/image/aboutImage.jpg"
      />
      <FounderMessage messages={messages} />
      <Branches />
      <Video source="/assets/image/Beersheba Senior Secondary School, Haldwani-(1080p) (1).mp4" />
    </>
  );
};

export default Page;
