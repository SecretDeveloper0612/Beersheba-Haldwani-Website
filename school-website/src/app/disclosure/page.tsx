import Banner from "@/components/banner";
import Heading3 from "@/components/heading3";
import { Button } from "@/components/ui/button";
import { server_query_function } from "@/lib/graphql";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface DisclosureItem {
  id: string;
  title: string;
  url: string;
}

const DISCLOSURE_QUERY = `
  query GetDisclosurePages {
    disclosurePages {
      haldwaniDisclosure {
        id
        title
        url
      }
    }
  }
`;

const DisclosureRow = ({ disclosure }: { disclosure: DisclosureItem }) => (
  <tr className="border-2 border-[#3B2565]">
    <td className="text-lg lg:text-xl font-semibold py-2 px-5">
      {disclosure.title}
    </td>
    <td className="border-l-2 border-[#3B2565] py-2 px-5">
      <div className="flex justify-center items-center">
        <Link href={disclosure.url}>
          <Button>View Details</Button>
        </Link>
      </div>
    </td>
  </tr>
);

const page = async () => {
  try {
    const response = await server_query_function(DISCLOSURE_QUERY);
    //@ts-expect-error
    const disclosure = response?.disclosurePages?.[0]
      ?.haldwaniDisclosure as DisclosureItem[];

    if (!disclosure?.length) {
      return (
        <>
          <Banner
            source="/assets/image/aboutImage.jpg"
            title="Disclosure"
            description="Beersheba - Haldwani"
          />
          <section className="container p-5 lg:p-10">
            <Heading3 title="Mandatory Disclosure" />
            <p className="text-center text-gray-600 mt-10">
              No disclosure documents available.
            </p>
          </section>
        </>
      );
    }

    return (
      <>
        <Banner
          source="/assets/image/aboutImage.jpg"
          title="Disclosure"
          description="Beersheba - Haldwani"
        />

        <section className="container p-5 lg:p-10">
          <Heading3 title="Mandatory Disclosure" />
          <div className="lg:p-10">
            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full my-10 text-[#3B2565] border-collapse">
                <tbody>
                  {disclosure.map((item) => (
                    <DisclosureRow key={item.id} disclosure={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Error fetching disclosure data:", error);
    return (
      <>
        <Banner
          source="/assets/image/aboutImage.jpg"
          title="Disclosure"
          description="Beersheba - Haldwani"
        />
        <section className="container p-5 lg:p-10">
          <Heading3 title="Mandatory Disclosure" />
          <p className="text-center text-red-600 mt-10">
            Error loading disclosure documents.
          </p>
        </section>
      </>
    );
  }
};

export default page;
