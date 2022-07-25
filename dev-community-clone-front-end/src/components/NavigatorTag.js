import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function NavigatorTag() {
  const navigate = useNavigate();
  const params = useParams();
  const tag = params.tag;
  useEffect(() => {
    navigate(`/tags/${tag}`);
  }, []);
  return <div>Navigator</div>;
}
