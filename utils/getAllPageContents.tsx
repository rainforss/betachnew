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
  blogPageNumber?: number,
  blogCategory?: string,
  blogAuthor?: string,
  blogSlug?: string
) => {
  try {
    const dynamicsPageSections = (
      await retrieveMultiple(
        config,
        "bsi_pagesections",
        `$filter= _bsi_webpage_value eq ${webpageId}&${dynamicsPageSectionsQuery}`,
        { representation: true }
      )
    ).value;

    for (const section of dynamicsPageSections) {
      const productOfferingRequest: any[] = [];
      (section as any).bsi_AttachedComponent_bsi_PageSection_bsi.forEach(
        (po: any) => {
          productOfferingRequest.push(
            retrieve(
              config,
              "bsi_attachedcomponents",
              po.bsi_attachedcomponentid,
              attachedComponentsQuery
            )
          );
        }
      );
      const result = await Promise.all(productOfferingRequest);
      section.bsi_AttachedComponent_bsi_PageSection_bsi = [...result];
    }

    const dynamicsHeaderMenuItemsRequest = retrieveMultiple(
      config,
      "bsi_navigationmenuitems",
      dynamicsHeaderMenuItemsQuery,
      { representation: true }
    );
    const dynamicsFooterMenuItemsRequest = retrieveMultiple(
      config,
      "bsi_navigationmenuitems",
      dynamicsFooterMenuItemsQuery,
      { representation: true }
    );

    const dynamicsBlogsRequest =
      !blogCategory && !blogAuthor && !blogSlug
        ? retrieveMultiple(
            config,
            "bsi_blogs",
            `${generateBlogsODataQuery(
              blogPageNumber || 1,
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
