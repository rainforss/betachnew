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

export type DynamicsPageSection = {
  bsi_name: string;
  bsi_pagesectionid: string;
  bsi_videourl: string;
  bsi_paragraph: string;
  bsi_hasctabutton: boolean;
  bsi_ctabuttonlink: string;
  bsi_ctabuttontext: string;
  bsi_youtubevideoid: string;
  bsi_youtubevideoalttext: string;
  _bsi_designedsection_value: string;
  bsi_mainheading: string;
  bsi_subheading: string;
  bsi_sectionid: string;
  bsi_featuredproducts: string;
  bsi_ProductOffering_PageSection_bsi_PageS: Array<{
    bsi_productofferingid: string;
    bsi_name: string;
    bsi_productdescription: string;
    bsi_relativeurl: string;
    bsi_ctabuttontext: string;
    bsi_ctabuttonlink: string;
    bsi_ImageAsset_ProductOffering_bsi_Produc: Array<{
      bsi_cdnurl: string;
      bsi_name: string;
    }>;
  }>;
  bsi_ImageAsset_PageSection_bsi_PageSectio: Array<{
    bsi_name: string;
    bsi_cdnurl: string;
  }>;

  bsi_DesignedSection: {
    bsi_name: string;
  };
  bsi_Background: {
    bsi_cdnurl: string;
  };
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
