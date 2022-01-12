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

export type DynamicsBlog = {
  bsi_name: string;
  bsi_BlogCoverImage: {
    bsi_name: string;
    bsi_cdnurl: string;
    bsi_alttext: string;
  };
  bsi_blogcovertext: string;
  bsi_blogid: string;
  bsi_slug: string;
  bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor: Array<{
    bsi_name: string;
    bsi_slug: string;
  }>;
  bsi_BlogCategory_bsi_Blog_bsi_Blog: Array<{
    bsi_name: string;
    bsi_slug: string;
  }>;
  bsi_blogbody: string;
  modifiedon: string;
};

export type xmlDynamicsBlog = {
  bsi_name: string;
  "bsi_imageasset3.bsi_alttext": string;
  "bsi_imageasset3.bsi_cdnurl": string;
  bsi_blogcovertext: string;
  bsi_blogid: string;
  bsi_urlslug: string;
  bsi_author: string;
  bsi_blogbody: string;
  modifiedon: string;
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
  bsi_overline: string;
  bsi_mainheading: string;
  bsi_subheading: string;
  bsi_sectionid: string;
  bsi_featuredproducts: string;
  bsi_backgroundcolor: string;
  bsi_overlinetextcolor: string;
  bsi_mainheadingtextcolor: string;
  bsi_subheadingtextcolor: string;
  bsi_paragraphtextcolor: string;
  bsi_ctabuttontextcolor: string;
  bsi_ctabuttonbgcolor: string;
  bsi_AttachedComponent_bsi_PageSection_bsi: Array<{
    bsi_attachedcomponentid: string;
    bsi_name: string;
    bsi_description: string;
    bsi_descriptiontextcolor: string;
    bsi_hasctabutton: boolean;
    bsi_ctabuttontext: string;
    bsi_ctabuttonlink: string;
    bsi_ctabuttonbgcolor: string;
    bsi_ctabuttontextcolor: string;
    bsi_backgroundcolor: string;
    bsi_overline: string;
    bsi_overlinetextcolor: string;
    bsi_title: string;
    bsi_titletextcolor: string;
    bsi_subtitle: string;
    bsi_subtitletextcolor: string;
    bsi_AttachedComponent_bsi_ImageAsset_bsi_: Array<{
      bsi_cdnurl: string;
      bsi_name: string;
    }>;
  }>;
  bsi_PageSection_bsi_ImageAsset_bsi_ImageA: Array<{
    bsi_name: string;
    bsi_cdnurl: string;
  }>;

  bsi_DesignedSection: {
    bsi_name: string;
  };
  bsi_Background: {
    bsi_cdnurl: string;
    bsi_alttext: string;
  };
  bsi_MarketingFormPage: {
    msdyncrm_javascriptcode: string;
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
