export const generateBlogsQuery = (
  categorySlug: string,
  pageLimit: number,
  pageNumber: number
) => `
<fetch distinct="true" mapping="logical" output-format="xml-platform" version="1.0" count="${pageLimit}" page="${pageNumber}">

<entity name="bsi_blog">

<attribute name="bsi_blogid"/>

<attribute name="bsi_name"/>

<attribute name="bsi_urlslug"/>

<attribute name="modifiedon"/>

<attribute name="bsi_blogcovertext"/>

<attribute name="bsi_blogbody"/>

<attribute name="bsi_author"/>

<order descending="false" attribute="bsi_name"/>

<link-entity name="bsi_blogcategory_bsi_blog" intersect="true" visible="false" to="bsi_blogid" from="bsi_blogid">

<link-entity name="bsi_blogcategory" to="bsi_blogcategoryid" from="bsi_blogcategoryid" alias="ac">

${
  categorySlug !== "" &&
  `<filter type="and">

<condition attribute="bsi_slug" value="${categorySlug}" operator="eq"/>

</filter>`
}

</link-entity>

</link-entity>

<link-entity name="bsi_imageasset" visible="false" to="bsi_blogcoverimage" from="bsi_imageassetid" link-type="outer">

<attribute name="bsi_cdnurl"/>

<attribute name="bsi_alttext"/>

</link-entity>

</entity>

</fetch>`;

export const generatePageSectionsQuery = (webPageId: string) => `
<fetch distinct="false" mapping="logical" output-format="xml-platform" version="1.0">

<entity name="bsi_pagesection">

<attribute name="bsi_pagesectionid"/>

<attribute name="bsi_name"/>

<attribute name="bsi_youtubevideoid"/>

<attribute name="bsi_youtubevideoalttext"/>

<attribute name="bsi_videourl"/>

<attribute name="bsi_subheading"/>

<attribute name="bsi_sequence"/>

<attribute name="bsi_sectionid"/>

<attribute name="bsi_paragraph"/>

<attribute name="bsi_mainheading"/>

<attribute name="bsi_hasctabutton"/>

<attribute name="bsi_featuredproducts"/>

<attribute name="bsi_designedsection"/>

<attribute name="bsi_ctabuttontext"/>

<attribute name="bsi_ctabuttonlink"/>

<order descending="false" attribute="bsi_sequence"/>

<link-entity name="bsi_webpage" alias="ab" link-type="inner" to="bsi_webpage" from="bsi_webpageid">

<filter type="and">

<condition attribute="bsi_webpageid" value="${webPageId}" operator="eq"/>

</filter>

</link-entity>

<link-entity name="bsi_designedsection" alias="a_1bfc1d3ed65aec118f8f0022481ccfea" link-type="outer" to="bsi_designedsection" from="bsi_designedsectionid" visible="false">

<attribute name="bsi_name"/>

</link-entity>

<link-entity name="bsi_pagesection_bsi_imageasset" to="bsi_pagesectionid" from="bsi_pagesectionid" visible="true" intersect="true" link-type="outer">

<link-entity name="bsi_imageasset" alias="ah" to="bsi_imageassetid" from="bsi_imageassetid" link-type="outer">

<attribute name="bsi_cdnurl"/>

<attribute name="bsi_alttext"/>

</link-entity>

</link-entity>

</entity>

</fetch>
`;
