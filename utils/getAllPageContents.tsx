import {
  retrieve,
  retrieveMultiple,
  WebApiConfig,
} from "dataverse-webapi/lib/node";
import { BLOGS_PLAGE_LIMIT } from "./constants";
import {
  attachedComponentsQuery,
  dynamicsFooterMenuItemsQuery,
  dynamicsHeaderMenuItemsQuery,
  dynamicsPageSectionsQuery,
  generateBlogsODataQuery,
} from "./queries";

export const getAllPageContents = async (
  config: WebApiConfig,
  webpageId: string,
  includeDraft: boolean = false,
  blogPageNumber?: number,
  blogCategory?: string,
  blogAuthor?: string,
  blogSlug?: string,
  headerMenuId?: string,
  footerMenuId?: string
) => {
  try {
    const dynamicsPageSections = (
      await retrieveMultiple(
        config,
        "bsi_pagesections",
        `$filter= _bsi_webpage_value eq ${webpageId} ${
          includeDraft ? "" : "and bsi_published ne false"
        }&${dynamicsPageSectionsQuery}`,
        { representation: true }
      )
    ).value;
    for (const section of dynamicsPageSections) {
      const attachedComponentsRequest: any[] = [];
      (section as any).bsi_AttachedComponent_bsi_PageSection_bsi.forEach(
        (po: any) => {
          attachedComponentsRequest.push(
            retrieve(
              config,
              "bsi_attachedcomponents",
              po.bsi_attachedcomponentid,
              (includeDraft ? "" : "$filter= bsi_published ne false&") +
                attachedComponentsQuery
            )
          );
        }
      );
      const result = await Promise.all(attachedComponentsRequest);

      section.bsi_AttachedComponent_bsi_PageSection_bsi = [...result];
    }

    console.log(headerMenuId);
    const dynamicsHeaderMenuItemsRequest = retrieveMultiple(
      config,
      "bsi_navigationmenuitems",
      `$filter=_bsi_navigationmenu_value eq ${
        headerMenuId || "3fe455da-ef5e-ec11-8f8f-000d3af47f33"
      }&` + dynamicsHeaderMenuItemsQuery,
      { representation: true }
    );
    const dynamicsFooterMenuItemsRequest = retrieveMultiple(
      config,
      "bsi_navigationmenuitems",
      `$filter=_bsi_navigationmenu_value eq ${
        footerMenuId || "3ee455da-ef5e-ec11-8f8f-000d3af47f33"
      }&` + dynamicsFooterMenuItemsQuery,
      { representation: true }
    );

    const dynamicsBlogsRequest =
      !blogCategory || !blogAuthor || !blogSlug
        ? retrieveMultiple(
            config,
            "bsi_blogs",
            `${generateBlogsODataQuery(
              blogPageNumber || 1,
              includeDraft,
              blogCategory,
              blogAuthor,
              blogSlug
            )}`,
            { maxPageSize: BLOGS_PLAGE_LIMIT }
          )
        : { value: {} };

    const promises = [
      dynamicsHeaderMenuItemsRequest,
      dynamicsFooterMenuItemsRequest,
      dynamicsBlogsRequest,
    ];

    const otherResults = await Promise.all(promises);

    const [dynamicsHeaderMenuItems, dynamicsFooterMenuItems, dynamicsBlogs] =
      otherResults;

    return {
      dynamicsPageSections,
      dynamicsHeaderMenuItems,
      dynamicsFooterMenuItems,
      dynamicsBlogs,
    };
  } catch (error) {
    throw error;
  }
};
