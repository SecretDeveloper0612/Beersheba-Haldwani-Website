import { gql } from "graphql-request";
import { hygraphAdmin } from "./hygraph";

export const HygraphService = {
  // --- News & Events ---
  async getAllNews() {
    const query = gql`
      query GetAllNews {
        newsEvents(orderBy: createdAt_DESC) {
          id
          newsHeading
          newsDesc {
            html
            text
          }
          newsImage {
            url
          }
          status
          createdAt
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async createNews(data: any) {
    const mutation = gql`
      mutation CreateNewsEvent($data: NewsEventCreateInput!) {
        createNewsEvent(data: $data) {
          id
        }
      }
    `;
    const res: any = await hygraphAdmin.request(mutation, { data });
    return res.createNewsEvent;
  },

  async updateNews(id: string, data: any) {
    const mutation = gql`
      mutation UpdateNewsEvent($id: ID!, $data: NewsEventUpdateInput!) {
        updateNewsEvent(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  async deleteNews(id: string) {
    const mutation = gql`
      mutation DeleteNewsEvent($id: ID!) {
        deleteNewsEvent(where: { id: $id }) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  async publishNews(id: string) {
    const mutation = gql`
      mutation PublishNewsEvent($id: ID!) {
        publishNewsEvent(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  // --- Gallery ---
  async getGalleryAlbums() {
    const query = gql`
      query GetGalleryAlbums {
        imageGalleries(orderBy: createdAt_DESC) {
          id
          heading
          banner {
            url
          }
          images(first: 12) {
            id
            url
          }
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async createGalleryAlbum(data: any) {
    const mutation = gql`
      mutation CreateImageGallery($data: ImageGalleryCreateInput!) {
        createImageGallery(data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { data });
  },

  async updateGalleryAlbum(id: string, data: any) {
    const mutation = gql`
      mutation UpdateImageGallery($id: ID!, $data: ImageGalleryUpdateInput!) {
        updateImageGallery(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  async deleteGalleryAlbum(id: string) {
    const mutation = gql`
      mutation DeleteImageGallery($id: ID!) {
        deleteImageGallery(where: { id: $id }) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  // --- Video Gallery ---
  async getVideoGalleries() {
    const query = gql`
      query GetVideoGalleries {
        haldwaniVideoGalleries(orderBy: createdAt_DESC) {
          id
          haldwaniVideo {
            id
            url
          }
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async createVideoGallery(data: any) {
    const mutation = gql`
      mutation CreateVideoGallery($data: HaldwaniVideoGalleryCreateInput!) {
        createHaldwaniVideoGallery(data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { data });
  },

  async updateVideoGallery(id: string, data: any) {
    const mutation = gql`
      mutation UpdateVideoGallery($id: ID!, $data: HaldwaniVideoGalleryUpdateInput!) {
        updateHaldwaniVideoGallery(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  async deleteVideoGallery(id: string) {
    const mutation = gql`
      mutation DeleteVideoGallery($id: ID!) {
        deleteHaldwaniVideoGallery(where: { id: $id }) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  // --- Blogs / Articles ---
  async getAllBlogs() {
    const query = gql`
      query GetAllBlogs {
        haldwaniBlogs(orderBy: createdAt_DESC) {
          id
          title
          slug
          shortDesc
          content {
            html
          }
          mainImage {
            url
          }
          createdAt
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async createBlog(data: any) {
    const mutation = gql`
      mutation CreateBlog($data: HaldwaniBlogCreateInput!) {
        createHaldwaniBlog(data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { data });
  },

  async updateBlog(id: string, data: any) {
    const mutation = gql`
      mutation UpdateBlog($id: ID!, $data: HaldwaniBlogUpdateInput!) {
        updateHaldwaniBlog(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  async deleteBlog(id: string) {
    const mutation = gql`
      mutation DeleteBlog($id: ID!) {
        deleteHaldwaniBlog(where: { id: $id }) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  // --- Academic Programs ---
  async getAcademicPrograms() {
    const query = gql`
      query GetAcademicPrograms {
        academicPrograms(orderBy: createdAt_ASC) {
          id
          programName
          description
          category
          image {
            url
          }
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async updateAcademicProgram(id: string, data: any) {
    const mutation = gql`
      mutation UpdateAcademicProgram($id: ID!, $data: AcademicProgramUpdateInput!) {
        updateAcademicProgram(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  async deleteAcademicProgram(id: string) {
    const mutation = gql`
      mutation DeleteAcademicProgram($id: ID!) {
        deleteAcademicProgram(where: { id: $id }) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  // --- Teachers ---
  async getTeachers() {
    const query = gql`
      query GetTeachers {
        teachers(orderBy: createdAt_ASC) {
          id
          name
          designation
          department
          image {
            url
          }
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async updateTeacher(id: string, data: any) {
    const mutation = gql`
      mutation UpdateTeacher($id: ID!, $data: TeacherUpdateInput!) {
        updateTeacher(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  async deleteTeacher(id: string) {
    const mutation = gql`
      mutation DeleteTeacher($id: ID!) {
        deleteTeacher(where: { id: $id }) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  // --- Hero Slider ---
  async getHeroSliders() {
    const query = gql`
      query GetHeroSliders {
        heroSliders(orderBy: slideOrder_ASC) {
          id
          title
          description
          slideOrder
          buttonText
          buttonLink
          image {
            id
            url
          }
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async createHeroSlider(data: any) {
    const mutation = gql`
      mutation CreateHeroSlider($data: HeroSliderCreateInput!) {
        createHeroSlider(data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { data });
  },

  async updateHeroSlider(id: string, data: any) {
    const mutation = gql`
      mutation UpdateHeroSlider($id: ID!, $data: HeroSliderUpdateInput!) {
        updateHeroSlider(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  async deleteHeroSlider(id: string) {
    const mutation = gql`
      mutation DeleteHeroSlider($id: ID!) {
        deleteHeroSlider(where: { id: $id }) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  // --- Homepage (haldwaniHomes) ---
  async getHaldwaniHome() {
    const query = gql`
      query GetHaldwaniHome {
        haldwaniHomes(first: 1) {
          id
          classXTopperHeading
          classXTopperDesc
          classXiiTopperHeading
          classXiiTopperDesc
          homeVideoBanner {
            id
            url
          }
          homeGallery {
            id
            homeGalleryImage {
              url
              id
            }
          }
          toppers {
            id
            class
          }
          event {
            id
            day
            eventName
          }
        }
      }
    `;
    const res: any = await hygraphAdmin.request(query);
    return res.haldwaniHomes[0];
  },

  async updateHaldwaniHome(id: string, data: any) {
    const mutation = gql`
      mutation UpdateHaldwaniHome($id: ID!, $data: HaldwaniHomeUpdateInput!) {
        updateHaldwaniHome(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  // --- Site Settings ---
  async getSiteSettings() {
    const query = gql`
      query GetSiteSettings {
        siteSettings(first: 1) {
          id
          siteName
          siteDescription
          contactEmail
          contactPhone
          address
          facebookUrl
          twitterUrl
          instagramUrl
          youtubeUrl
          linkedinUrl
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async updateSiteSettings(id: string, data: any) {
    const mutation = gql`
      mutation UpdateSiteSettings($id: ID!, $data: SiteSettingsUpdateInput!) {
        updateSiteSettings(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  // --- Media Library ---
  async getAssets() {
    const query = gql`
      query GetAssets {
        assets(orderBy: createdAt_DESC, first: 100) {
          id
          url
          fileName
          mimeType
          size
          width
          height
          createdAt
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async deleteAsset(id: string) {
    const mutation = gql`
      mutation DeleteAsset($id: ID!) {
        deleteAsset(where: { id: $id }) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  // --- Transfer Certificates (TC) ---
  async getTCs() {
    const query = gql`
      query GetTCs {
        transferCertificates(orderBy: createdAt_DESC) {
          id
          tcNumber
          studentName
          admissionNumber
          fatherName
          studentClass
          issueDate
          dob
          status
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async createTC(data: any) {
    const mutation = gql`
      mutation CreateTC($data: TransferCertificateCreateInput!) {
        createTransferCertificate(data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { data });
  },

  async updateTC(id: string, data: any) {
    const mutation = gql`
      mutation UpdateTC($id: ID!, $data: TransferCertificateUpdateInput!) {
        updateTransferCertificate(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  async deleteTC(id: string) {
    const mutation = gql`
      mutation DeleteTC($id: ID!) {
        deleteTransferCertificate(where: { id: $id }) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  // --- Facilities ---
  async getFacilities() {
    const query = gql`
      query GetFacilities {
        facilities(orderBy: createdAt_DESC) {
          id
          title
          description
          image {
            url
          }
        }
      }
    `;
    return hygraphAdmin.request(query);
  },

  async createFacility(data: any) {
    const mutation = gql`
      mutation CreateFacility($data: FacilityCreateInput!) {
        createFacility(data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { data });
  },

  async updateFacility(id: string, data: any) {
    const mutation = gql`
      mutation UpdateFacility($id: ID!, $data: FacilityUpdateInput!) {
        updateFacility(where: { id: $id }, data: $data) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id, data });
  },

  async deleteFacility(id: string) {
    const mutation = gql`
      mutation DeleteFacility($id: ID!) {
        deleteFacility(where: { id: $id }) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  },

  // Generic Publish
  async publishModel(modelName: string, id: string) {
    const mutation = gql`
      mutation PublishModel($id: ID!) {
        publish${modelName}(where: { id: $id }, to: PUBLISHED) {
          id
        }
      }
    `;
    return hygraphAdmin.request(mutation, { id });
  }
};

