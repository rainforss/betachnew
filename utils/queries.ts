export const dynamicsPageSectionsQuery =
  "$select=bsi_name,bsi_pagesectionid,bsi_videourl,bsi_paragraph,bsi_ctabuttonlink,bsi_ctabuttontext,bsi_youtubevideoid,_bsi_designedsection_value,bsi_youtubevideoalttext,bsi_hasctabutton,bsi_mainheading,bsi_subheading,bsi_sectionid,bsi_featuredproducts&$orderby=bsi_sequence asc&$expand=bsi_AttachedComponent_bsi_PageSection_bsi($select=bsi_attachedcomponentid,bsi_name,bsi_description,bsi_ctabuttontext,bsi_ctabuttonlink,bsi_title,bsi_subtitle),bsi_PageSection_bsi_ImageAsset_bsi_ImageA($select=bsi_cdnurl,bsi_alttext),bsi_DesignedSection($select=bsi_name),bsi_Background($select=bsi_cdnurl),bsi_MarketingFormPage($select=msdyncrm_javascriptcode)";

export const attachedComponentsQuery =
  "$select=bsi_attachedcomponentid,bsi_name,bsi_description,bsi_ctabuttontext,bsi_ctabuttonlink,bsi_title,bsi_subtitle&$expand=bsi_AttachedComponent_bsi_ImageAsset_bsi_($select=bsi_cdnurl,bsi_name)";

export const dynamicsHeaderMenuItemsQuery =
  "$filter=_bsi_navigationmenu_value eq 3fe455da-ef5e-ec11-8f8f-000d3af47f33&$select=bsi_name,bsi_linkurl,bsi_navigationmenuitemid&$expand=bsi_NavigationMenuSubItem_NavigationMenuI($select=bsi_name,bsi_linkurl,bsi_navigationmenusubitemid)";

export const dynamicsFooterMenuItemsQuery =
  "$filter=_bsi_navigationmenu_value eq 3ee455da-ef5e-ec11-8f8f-000d3af47f33&$select=bsi_name,bsi_linkurl,bsi_navigationmenuitemid&$expand=bsi_NavigationMenuSubItem_NavigationMenuI($select=bsi_name,bsi_linkurl,bsi_navigationmenusubitemid)";

export const generateBlogsODataQuery = (
  pageNumber: number,
  categorySlug: string
) =>
  `${
    categorySlug !== ""
      ? `$filter=(bsi_BlogCategory_bsi_Blog_bsi_Blog/any(b:b/bsi_slug eq '${categorySlug}'))&`
      : ""
  }$select=bsi_name,bsi_urlslug,modifiedon,bsi_blogcovertext,bsi_blogbody,bsi_author&$orderby=createdon asc&$skiptoken=<cookie pagenumber="${pageNumber}">&$expand=bsi_BlogCoverImage($select=bsi_cdnurl,bsi_alttext)`;
