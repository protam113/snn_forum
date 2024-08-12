import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({ title, description, name, type }) {
  return (
    <Helmet>
      {/* Thẻ metadata tiêu chuẩn */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Thẻ Open Graph cho Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Thẻ Twitter Cards */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
