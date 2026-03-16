import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/custome-tabs";

import React from "react";
import Heading3 from "../heading3";
import Image from "next/image";
import { Quote, QuoteIcon, TextQuote } from "lucide-react";

const FounderMessage = ({
  messages,
}: {
  messages: {
    whoseMessage: string;
    quote: string;
    authorName: string;
    message: { html: string };
    image: { url: string };
  }[];
}) => {
  return (
    <section className="container p-2 lg:p-10">
      <Tabs
        defaultValue={messages[0]?.whoseMessage}
        className="w-full lg:flex gap-5 shadow-lg rounded-xl lg:p-10"
      >
        <TabsList className="lg:flex flex-col h-full w-full lg:w-fit">
          {messages?.map((message, index) => (
            <TabsTrigger
              key={index}
              value={message?.whoseMessage}
              className="py-3"
            >
              {message?.whoseMessage}
            </TabsTrigger>
          ))}
        </TabsList>
        {messages?.map((message, index) => (
          <TabsContent
            value={message?.whoseMessage}
            className="p-5 w-full"
            key={index}
          >
            <div className="text-center">
              <Heading3 title={message?.whoseMessage} />
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-16 mt-10">
              <div className="bg-gray-200 px-5 lg:px-5 py-5 relative">
                <p className="max-w-sm text-[#3B2565] text-lg">
                  “{message?.quote}”
                </p>
                <p className="pt-5">{message?.authorName}</p>
              </div>

              <Image
                alt="founders"
                src={message?.image?.url}
                width={600}
                height={500}
                className="rounded w-96 h-52 object-contain"
              />
            </div>
            <div
              className="mt-10 lg:px-10 text-lg"
              dangerouslySetInnerHTML={{ __html: message?.message?.html }}
            ></div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default FounderMessage;

{
  /* <TabsContent value="founder" className="p-5 w-full">
<div className="text-center">
  <Heading3 title="Founder’s Message" />
</div>

<div className="flex flex-col lg:flex-row items-center gap-16 mt-10">
  <div className="bg-gray-200 px-5 lg:px-5 py-5 relative">
    <p className="max-w-sm text-[#3B2565] text-lg">
      “Our mission is to provide a caring, healthy and challenging
      environment where children prepare to meet with confidence,
      imagination and integrity the challenges of life.”
    </p>
    <p className="pt-5">
      LATE MR. N.N.D BHATT - FOUNDER BEERSHEBA HALDWANI
    </p>
  </div>

  <Image
    alt="founders"
    src={"/assets/image/founders.png"}
    width={600}
    height={500}
    className="rounded w-96 h-52 object-contain"
  />
</div>
<p className="mt-10 lg:px-10 text-lg">
  Educational Institutions are aplenty, all of which impart the
  learning, but it is our prayer that our students go out into the
  world with the strength, not only to reach and excel in their
  professional aspirations, but also to remain beautiful human beings.
</p>
<p className="mt-10 lg:px-10 text-lg">
  A school is always a ‘world in miniature’ where one receives a
  ‘training for life’, where effective, meaningful and joyful learning
  takes place. It is here that we begin to learn our lessons of life –
  to accept challenges, face competition, defeat and failure, and
  rejoice at victory and triumph. Beersheba Sr. Sec. School is a
  symbol of progressive and quality education. Our motto, “Learn,
  Achieve and Inspire” captures the essence of our spirit. In our
  school, children gain an all-round education and achieve their
  potential not just in the academic field but also in the field of
  sports and creative arts. The children of the school evolve as
  well-rounded individuals who have honed their skills in the
  microcosm of the school and are equipped to lead and inspire in the
  microcosm of the world.
</p>
</TabsContent> */
}

{
  /* <TabsContent value="principal" className="p-5 w-full">
<div className="text-center">
  <Heading3 title="Principal’s Message" />
</div>

<div className="flex flex-col lg:flex-row items-center gap-16 mt-10">
  <div className="bg-gray-200 px-5 lg:px-20 py-5 relative">
    <p className="bg-gray-200 px-5 lg:px-5 py-5 relative">
      “At Beersheba, we nurture more than just minds; we cultivate
      well-rounded individuals equipped to lead impactful lives.”
    </p>
  </div>
  <Image
    alt="founders"
    src={"/assets/image/principal.jpeg"}
    width={500}
    height={400}
    className="rounded w-96 h-52 object-contain"
  />
</div>
<p className="mt-2 lg:px-10 text-lg">
  Welcome to Beersheba Senior Secondary School, Haldwani, where we are
  dedicated to fostering a nurturing and dynamic learning environment.
  Our vision is to empower students with knowledge, skills, and values
  that will shape them into confident and responsible global citizens.
</p>
<p className="mt-2 lg:px-10 text-lg">
  Since last forty six years we have been serving the society with the
  motto Pray, Toil and Serve.
</p>
<p className="mt-2 lg:px-10 text-lg">
  At Beersheba, our mission is to provide a holistic education that
  goes beyond academics. We strive to create an atmosphere where
  students can explore their passions, develop critical thinking, and
  embrace diversity. Our committed faculty is dedicated to guiding and
  inspiring each student to reach their full potential.
</p>
<p className="mt-2 lg:px-10 text-lg">
  As the Principal, I am proud to lead a team that is passionate about
  education and committed to the success of every student. Together,
  let us embark on a journey of learning, growth, and excellence.
</p>
<p className="mt-2 lg:px-10 text-lg">
  Thank you for choosing Beersheba Senior Secondary School. Here is to
  a bright future filled with knowledge, character, and endless
  possibilities.
</p>
</TabsContent>
<TabsContent value="vicePrincipal" className="p-5 w-full">
<div className="text-center">
  <Heading3 title="Vice Principal’s Message" />
</div>

<div className="flex flex-col lg:flex-row items-center gap-16 mt-10">
  <div className="bg-gray-200 px-5 lg:px-20 py-5 relative">
    <p className="bg-gray-200 px-5 lg:px-5 py-5 relative">
      “Learning is an ever-unfolding series of challenges, a lifelong
      undertaking, with each success merely the beginning towards
      greater fulfillment . ”
    </p>
  </div>
  <Image
    alt="founders"
    src={"/assets/image/vice-principal.jpeg"}
    width={500}
    height={400}
    className="rounded w-96 h-52 object-contain"
  />
</div>
<p className="mt-2 lg:px-10 text-lg">
  As John Dewey rightly said, “Education is not preparation for life ;
  education is life itself”.It’s impossible to move through the world
  without learning and gaining wisdom along the way. As we stand on
  the threshold of our Beersheba Senior Secondary School anniversary,
  we have realised that education is not merely putting something in
  the minds of the students,but it is showing them their own abilities
  and helping them to think and express themselves. we know that
  Beersheba Senior Secondary School was a charismatic leader who
  infused in the mind of a young child, great passion, big dream and
  passionate love for learning where a child uses his mind creatively
  and put it into practice in life.
</p>
<p className="mt-2 lg:px-10 text-lg">
  We know how a child enters into a classroom not only with
  theoretical learning but also a number of co-curricular activities.
  He uses his maximum potential, talents, participate with full vigour
  and shines like a star in the school. We are invited to aim at
  holistic growth of a child. And Beersheba provides a platform to
  achieve our purpose.
</p>
<p className="mt-2 lg:px-10 text-lg">
  So I invite you to be our collaborators Beersheba Senior Secondary
  School to touch upon the lives of students entrusted to our care.
  May the legacy of Beersheba Senior Secondary School inspire and
  propel us towards the Jesuit vision of education. May God bless you
  all!
</p>
<p className="mt-2 lg:px-10 text-lg">With Best wishes</p>
</TabsContent>
<TabsContent value="manager" className="p-5 w-full">
<div className="text-center">
  <Heading3 title="Manager’s Message" />
</div>

<div className="flex flex-col lg:flex-row items-center gap-16 mt-10">
  <div className="bg-gray-200 px-5 lg:px-20 py-5 relative">
    <p className="bg-gray-200 px-5 lg:px-5 py-5 relative">
      “By education, I mean the overall development of child-mind,
      body and soul.”
    </p>
    <p className="pt-5">
      Mr. Tilak Talwar, Management, Beersheba Group of Institutions -
      Haldwani, Almora, Ranikhet & Chaukhutia
    </p>
  </div>
  <Image
    alt="founders"
    src={"/assets/image/manager.jpeg"}
    width={500}
    height={400}
    className="rounded w-96 h-52 object-contain"
  />
</div>
<p className="mt-2 lg:px-10 text-lg">
  It is a matter of great pride that Beersheba Group of Institutions
  has been awarded Education Excellence Award 2019. Our Focus on
  learning is child centric and child oriented. In our curriculum, the
  student is given the primary focus and is involved in the learning
  process. We motivate them to follow the golden words of the great
  thinkers. &quot;Do not give up&quot; and implement it to make them
  humble citizens of Incredible India.
</p>
<p className="mt-2 lg:px-10 text-lg">
  Inspired by the quote given by the Father of Nation, &quot;I
  strongly believe that there should be an overall development of a
  child in addition to excellence in academics.&quot; Therefore, our
  sole motive is to sharpen up the inherent qualities of the child to
  the best.
</p>
</TabsContent>
<TabsContent value="schoolAdministrator" className="p-5 w-full">
<div className="text-center">
  <Heading3 title="School Administrator’s Message" />
</div>

<div className="flex flex-col lg:flex-row items-center gap-16 mt-10">
  <div className="bg-gray-200 px-5 lg:px-20 py-5 relative">
    <p className="bg-gray-200 px-5 lg:px-5 py-5 relative">
      “Education is the passport to the future, for tomorrow belongs
      to those who prepare for it today.”
    </p>
    <p className="pt-5">NISHA SINGH - Administrator</p>
  </div>
  <Image
    alt="founders"
    src={"/assets/image/school-admin.jpeg"}
    width={500}
    height={400}
    className="rounded w-96 h-52 object-contain"
  />
</div>
<p className="mt-2 lg:px-10 text-lg">Dear Readers,</p>
<p className="mt-2 lg:px-10 text-lg">
  As we embark on another edition of our beloved school magazine, I am
  filled with immense pride and gratitude for the tireless efforts of
  our exceptional editorial team. Your dedication and passion have
  once again brought forth a publication that reflects the vibrant
  spirit and achievements of Beersheba.
</p>
<p className="mt-2 lg:px-10 text-lg">
  Within the pages of this magazine, we find more than just words and
  images; we uncover the stories of triumph, the melodies of success,
  and the colors of inspiration that adorn the halls of our esteemed
  institution. It is through your unwavering commitment to excellence
  that Beersheba continues to shine brightly as a beacon of knowledge
  and innovation.
</p>
<p className="mt-2 lg:px-10 text-lg">
  Each article, photograph, and artwork encapsulates the essence of
  our community, weaving together a tapestry of experiences and
  aspirations that define us as Beersheba family. From academic
  triumphs to artistic endeavors, from athletic feats to altruistic
  initiatives, our magazine serves as a testament to the remarkable
  achievements and boundless potential that reside within each and
  every one of us.
</p>
<p className="mt-2 lg:px-10 text-lg">
  To the editorial team, I extend my heartfelt appreciation for your
  dedication, creativity, and unwavering spirit. Your contributions
  have breathed life into our magazine, allowing it to serve as a
  lasting testament to the indomitable spirit of Beersheba.
</p>
</TabsContent>
<TabsContent value="coordinator" className="p-5 w-full">
<div className="text-center">
  <Heading3 title="Coordinator’s Message" />
</div>

<div className="flex flex-col lg:flex-row items-center gap-16 mt-10">
  <div className="bg-gray-200 px-5 lg:px-20 py-5 relative">
    <p className="bg-gray-200 px-5 lg:px-5 py-5 relative">
      “Learning can truly be fun and exhilarating when knowledge is
      acquired by way of performing through activities.”
    </p>
    <p className="pt-5">Nishi Varma - Coordinator Message</p>
  </div>
  <Image
    alt="founders"
    src={"/assets/image/cordinate.jpeg"}
    width={500}
    height={400}
    className="rounded w-96 h-52 object-contain"
  />
</div>
<p className="mt-2 lg:px-10 text-lg">Dear Parents and Visitors,</p>
<p className="mt-2 lg:px-10 text-lg">Warmest Greetings of the Day!</p>
<p className="mt-2 lg:px-10 text-lg">
  Learning can truly be fun and exhilarating when knowledge is
  acquired by way of performing through activities. We at Beersheba
  offer several opportunities to our young minds to explore , ponder,
  discover, reflect, innovate and to develop multitudinous skills in
  physical and motor, language , cognitive , social and emotional
  domains, thereby enriching their imaginative, intellectual and
  aesthetic abilities with priority to enhance their innate
  capabilities.
</p>
<p className="mt-2 lg:px-10 text-lg">
  At the core of the NEP-2020 lies the imperative to nurture active ,
  engaged and creative learners who are prepared to face the
  challenges of an evolving world.
</p>
<p className="mt-2 lg:px-10 text-lg">
  The uniquely balanced curricular and co-curricular activities-
  literary, arts, sports, community service , awareness programmes and
  the multifarious events we organize , are designed to foster
  children’s all -round development and make them responsible citizens
  with global outlook.
</p>
<p className="mt-2 lg:px-10 text-lg">
  A collaborative educational ecosystem where academics go hand-inhand
  with co-curricular activities and holistic development of a learner,
  is the need of the hour which reflects impact in the improved
  academic performance and personal development.
</p>
<p className="mt-2 lg:px-10 text-lg">
  Founded with the sole ideology of nurturing the children in homelike
  environment, providing them equally the best opportunities and the
  best practices for more than four and a half decades, Beersheba’s
  focus and effort is to well equip the children with creativity,
  problem-solving and communication skills, social and ethical
  thinking and leadership so as to make them ready to face the future
  with confidence and equanimity.
</p>
<p className="mt-2 lg:px-10 text-lg">
  I invite you to explore Beersheba as we re-dedicate ourselves every
  day, to provide excellent education to our children . One that they
  will cherish for a lifetime , one that will make them kind and
  compassionate human beings.
</p>
</TabsContent>
<TabsContent value="junior-coordinator" className="p-5 w-full">
<div className="text-center">
  <Heading3 title="Coordinator’s Message" />
</div>

<div className="flex flex-col lg:flex-row items-center gap-16 mt-10">
  {/*TODO */
}

//   <div className="bg-gray-200 px-5 lg:px-20 py-5 relative">
//     <p className="bg-gray-200 px-5 lg:px-5 py-5 relative">
//       “Learning is truly exhilarating when knowledge is acquired
//       through engaging activities”
//     </p>
//     <p className="pt-5">Anita Bisht - Junior Coordinator Message</p>
//   </div>
//   <Image
//     alt="founders"
//     src={
//       "/assets/image/WhatsApp Image 2024-08-28 at 10.07.10 AM.jpeg"
//     }
//     width={500}
//     height={400}
//     className="rounded w-96 h-52 object-contain"
//   />
// </div>
// <p className="mt-2 lg:px-10 text-lg">Dear Parents and Visitors,</p>
// <p className="mt-2 lg:px-10 text-lg">Warmest Greetings of the Day!</p>
// <p className="mt-2 lg:px-10 text-lg">
//   At Beersheba, we believe that learning becomes a joyful and dynamic
//   experience when it involves active participation. Our approach
//   provides numerous opportunities for young learners to explore,
//   discover, and innovate across various domains, including physical,
//   language, cognitive, social, and emotional skills. This holistic
//   development enhances their creativity, intellect, and imagination,
//   with a focus on nurturing their innate talents.
// </p>
// <p className="mt-2 lg:px-10 text-lg">
//   Aligned with the NEP-2020, our goal is to foster active, engaged,
//   and creative learners who are well-prepared for the evolving world.
//   Our well-rounded curriculum, which includes literary activities,
//   arts, sports, community service, and awareness programs, supports
//   all-round development and aims to cultivate responsible global
//   citizens.
// </p>
// <p className="mt-2 lg:px-10 text-lg">
//   Beersheba has been dedicated for over four and a half decades to
//   providing a nurturing environment where academics and co-curricular
//   activities complement each other. We aim to equip children with
//   essential skills such as creativity, problem-solving, communication,
//   and leadership, ensuring they are ready to face the future with
//   confidence.
// </p>
// <p className="mt-2 lg:px-10 text-lg">
//   I invite you to explore Beersheba as we continually strive to offer
//   an exceptional education that our children will cherish and that
//   will help them grow into kind and compassionate individuals.
// </p>
// </TabsContent> */}
