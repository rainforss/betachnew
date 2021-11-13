export type MenuItem = {
  name: string;
  url: string;
};

export type NavbarItem = {
  face: MenuItem;
  dropdown: MenuItem[];
};

export type SectionItem = {
  name: string;
  sectionId: string;
};

export type PageSection = {
  fields: {
    sectionType: string;
    ctaButtonLink: string;
    ctaButtonText: string;
    sectionId: string;
    sectionMainHeading: string;
    sectionName: string;
    sectionSubHeading: string;
    sectionParagraph?: string;
    videoUrl?: string;
    youtubeVideoId?: string;
    youtubeVideoAltText?: string;
    featuredProducts?: string[];
    sequence: number;
    page: {
      sys: {
        id: string;
      };
      fields: {
        pageName: string;
      };
    };
    sectionBackgroundImage: {
      sys: {
        id: string;
      };
      fields: {
        description: string;
        file: {
          fileName: string;
          url: string;
          contentType: string;
        };
        title: string;
      };
    };
    displayedProducts?: [
      {
        sys: { id: string };
        fields: {
          productDescription: string;
          productName: string;
          subheading: string;
          relativeUrl: string;
          ctaButtonText: string;
          ctaButtonLink: string;
          productImage: {
            fields: {
              title: string;
              file: {
                fileName: string;
                url: string;
                contentType: string;
              };
            };
            sys: {
              id: string;
            };
          };
        };
      }
    ];
    carouselImages?: [
      {
        sys: { id: string };
        fields: {
          title: string;
          file: {
            fileName: string;
            url: string;
            contentType: string;
          };
        };
      }
    ];
  };
  sys: {
    id: string;
  };
};
