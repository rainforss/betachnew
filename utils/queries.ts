export const dynamicsPageSectionsQuery =
  "$select=bsi_name,bsi_pagesectionid,bsi_videourl,bsi_paragraph,bsi_ctabuttonlink,bsi_ctabuttontext,bsi_youtubevideoid,_bsi_designedsection_value,bsi_youtubevideoalttext,bsi_hasctabutton,bsi_overline,bsi_mainheading,bsi_subheading,bsi_sectionid,bsi_featuredproducts,bsi_backgroundcolor,bsi_overlinetextcolor,bsi_mainheadingtextcolor,bsi_subheadingtextcolor,bsi_paragraphtextcolor,bsi_ctabuttontextcolor,bsi_ctabuttonbgcolor,bsi_ctabuttonhoverbgcolor,bsi_bordercolor&$orderby=bsi_sequence asc&$expand=bsi_AttachedComponent_bsi_PageSection_bsi($select=bsi_attachedcomponentid,bsi_name,bsi_description,bsi_descriptiontextcolor,bsi_hasctabutton,bsi_ctabuttontext,bsi_ctabuttontextcolor,bsi_ctabuttonbgcolor,bsi_ctabuttonhoverbgcolor,bsi_bordercolor,bsi_ctabuttonlink,bsi_overline,bsi_overlinetextcolor,bsi_title,bsi_titletextcolor,bsi_subtitle,bsi_subtitletextcolor,bsi_backgroundcolor),bsi_PageSection_bsi_ImageAsset_bsi_ImageA($select=bsi_cdnurl,bsi_alttext,bsi_referencingurl),bsi_DesignedSection($select=bsi_name),bsi_Background($select=bsi_cdnurl,bsi_alttext),bsi_MarketingFormPage($select=msdyncrm_javascriptcode)";

export const attachedComponentsQuery =
  "$select=bsi_attachedcomponentid,bsi_name,bsi_description,bsi_descriptiontextcolor,bsi_hasctabutton,bsi_ctabuttontext,bsi_ctabuttontextcolor,bsi_ctabuttonbgcolor,bsi_ctabuttonhoverbgcolor,bsi_bordercolor,bsi_ctabuttonlink,bsi_overline,bsi_overlinetextcolor,bsi_title,bsi_titletextcolor,bsi_subtitle,bsi_subtitletextcolor,bsi_backgroundcolor&$expand=bsi_AttachedComponent_bsi_ImageAsset_bsi_($select=bsi_cdnurl,bsi_name)";

export const dynamicsHeaderMenuItemsQuery =
  "$select=bsi_name,bsi_linkurl,bsi_navigationmenuitemid&$expand=bsi_NavigationMenuSubItem_NavigationMenuI($select=bsi_name,bsi_linkurl,bsi_navigationmenusubitemid)";

export const dynamicsFooterMenuItemsQuery =
  "$select=bsi_name,bsi_linkurl,bsi_navigationmenuitemid&$expand=bsi_NavigationMenuSubItem_NavigationMenuI($select=bsi_name,bsi_linkurl,bsi_navigationmenusubitemid)";

export const dynamicsBlogSlugsQuery =
  "$select=bsi_name,bsi_slug&$orderby=createdon asc";

export const dynamicsWebpageQuery =
  "$select=bsi_webpageid&$expand=bsi_Website($select=bsi_name;$expand=bsi_CompanyLogo($select=bsi_cdnurl),bsi_HeaderMenu($select=bsi_name),bsi_FooterMenu($select=bsi_name))";

export const dynamicsBlogAuthorsQuery =
  "$select=bsi_name,bsi_slug&$orderby=bsi_name asc&$expand=bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor($select=bsi_name)";

export const dynamicsBlogCategoriesQuery =
  "$select=bsi_name&$orderby=createdon asc&$expand=bsi_BlogCategory_bsi_Blog_bsi_Blog($select=bsi_name)";

export const dynamicsSocialPlatformsQuery =
  "$select=bsi_name,bsi_socialplatformurl,bsi_socialplatformchannel";

export const generateBlogsODataQuery = (
  pageNumber: number,
  preview: boolean = false,
  categorySlug?: string,
  authorSlug?: string,
  blogSlug?: string
) => {
  if (!categorySlug && !authorSlug && !blogSlug) {
    return `${
      preview ? "" : "$filter=bsi_published ne false&"
    }$select=bsi_name,bsi_slug,modifiedon,bsi_blogcovertext,bsi_blogbody&$orderby=createdon asc&$skiptoken=<cookie pagenumber="${pageNumber}">&$expand=bsi_BlogCoverImage($select=bsi_cdnurl,bsi_alttext),bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor($select=bsi_name,bsi_slug),bsi_BlogCategory_bsi_Blog_bsi_Blog($select=bsi_name,bsi_slug)`;
  }

  return `$filter=${preview ? "" : "bsi_published ne false and "}${
    categorySlug
      ? `(bsi_BlogCategory_bsi_Blog_bsi_Blog/any(b:b/bsi_slug eq '${categorySlug}'))`
      : ""
  }${
    authorSlug
      ? `(bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor/any(b:b/bsi_slug eq '${authorSlug}'))`
      : ""
  }${
    blogSlug ? `bsi_slug eq '${blogSlug}'` : ""
  }&$select=bsi_name,bsi_slug,modifiedon,bsi_blogcovertext,bsi_blogbody&$orderby=createdon asc&$skiptoken=<cookie pagenumber="${pageNumber}">&$expand=bsi_BlogCoverImage($select=bsi_cdnurl,bsi_alttext),bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor($select=bsi_name,bsi_slug),bsi_BlogCategory_bsi_Blog_bsi_Blog($select=bsi_name,bsi_slug)`;
};
