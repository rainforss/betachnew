export const dynamicsPageSectionsQuery =
  "$select=bsi_name,bsi_pagesectionid,bsi_videourl,bsi_paragraph,bsi_ctabuttonlink,bsi_ctabuttontext,bsi_youtubevideoid,_bsi_designedsection_value,bsi_youtubevideoalttext,bsi_hasctabutton,bsi_mainheading,bsi_subheading,bsi_sectionid,bsi_featuredproducts&$orderby=bsi_sequence asc&$expand=bsi_ProductOffering_PageSection_bsi_PageS($select=bsi_productofferingid,bsi_name,bsi_productdescription,bsi_relativeurl,bsi_ctabuttontext,bsi_ctabuttonlink),bsi_ImageAsset_PageSection_bsi_PageSectio,bsi_DesignedSection($select=bsi_name),bsi_Background($select=bsi_cdnurl)";

export const productOfferingQuery =
  "$select=bsi_productofferingid,bsi_name,bsi_productdescription,bsi_relativeurl,bsi_ctabuttontext,bsi_ctabuttonlink&$expand=bsi_ImageAsset_ProductOffering_bsi_Produc($select=bsi_cdnurl,bsi_name)";

export const dynamicsHeaderMenuItemsQuery =
  "$filter=_bsi_navigationmenu_value eq 05038781-a557-ec11-8f8f-0022481ccfea&$select=bsi_name,bsi_linkurl,bsi_navigationmenuitemid&$expand=bsi_NavigationMenuSubItem_NavigationMenuI($select=bsi_name,bsi_linkurl,bsi_navigationmenusubitemid)";

export const dynamicsFooterMenuItemsQuery =
  "$filter=_bsi_navigationmenu_value eq 7fa63997-b257-ec11-8f8f-0022481ccfea&$select=bsi_name,bsi_linkurl,bsi_navigationmenuitemid&$expand=bsi_NavigationMenuSubItem_NavigationMenuI($select=bsi_name,bsi_linkurl,bsi_navigationmenusubitemid)";
