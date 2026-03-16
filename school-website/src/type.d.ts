type TopperImageType = {
  url: string;
};

type TopperDetailsType = {
  id: string;
  name: string;
  percentage: number;
  subject: string;
  topperImage: TopperImageType;
};

type TopperType = {
  class: string;
  id: string;
  topperDetails: TopperDetailsType[];
};

type homeGallery = {
  homeGalleryImage: {
    url: string;
  }[];
}[];

type HomeType = {
  haldwaniHomes: {
    toppers: TopperType[];
    homeGallery: {
      homeGalleryImage: {
        url: string;
      }[];
    };
    classXTopperHeading: string;
    classXTopperDesc: string;
    classXiiTopperHeading: string;
    classXiiTopperDesc: string;
    event: SchoolEvent[];
  }[];
};

type homeBannerType = {
  haldwaniHomes: {
    homeVideoBanner: {
      url: string;
    }[];
  }[];
};

type homeFeaturedNewsType = {
  haldwaniHomes: {
    featuredNews: {
      imageCategoryName: {
        image: {
          url: string;
        }[];
      }[];
    }[];
  }[];
};


type Blog = {
  id: string;
  mainImage: {
    url: string;
  };
  title: string;
  slug: string;
  shortDesc: string;
};

type SchoolEvent = {
  id: string;
  day: string;
  eventName: string;
};

type BlogType = {
  haldwaniBlogs: Blog[];
  haldwaniHomes: {
    event: SchoolEvent[];
  }[];
};

type SingleBlogType = {
  haldwaniBlogs: {
    id: string;
    mainImage: {
      url: string;
    };
    title: string;
    shortDesc: string;
    slug: string;
    content: {
      html: string;
    };
  }[];
};

type galleryType = {
  haldwaniImageGalleries: {
    imageGallery: {
      imageCategoryName: string;
      image: {
        url: string;
      }[];
    }[];
  }[];
};

type DisclosureType = {
  id: string;
  title: string;
  url: string;
}[];

type TransferCertificate = {
  id: string;
  tcNumber: string;
  studentName: string;
  admissionNumber: string;
  fatherName: string;
  studentClass: string;
  issueDate: string;
  dob: string;
  status: "Verified" | "Pending" | "Invalid";
};

type TCResponse = {
  transferCertificates: TransferCertificate[];
};
