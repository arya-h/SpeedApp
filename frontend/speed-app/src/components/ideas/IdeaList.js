import React, { useEffect, useState } from "react";
import { Col, Row, Dropdown, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { IdeaCard } from "./IdeaCard";

export const IdeaList = ({ sortMethod, setSortMethod }) => {
  const filter = useSelector((state) => state.filter);
  const { ideas } = useSelector((state) => state.ideas);

  const filteredIdeas = ideas.filter((x) =>
    x.title.toLowerCase().includes(filter.toLowerCase())
  );

  if (sortMethod === 0) {
    filteredIdeas.sort((a, b) => b.timestamp - a.timestamp);
  } else if (sortMethod === 1) {
    filteredIdeas.sort((a, b) => a.timestamp - b.timestamp);
  } else if (sortMethod === 2) {
    filteredIdeas.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  } else if (sortMethod === 3) {
    filteredIdeas.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return 1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      }
      return 0;
    });
  }
  // Rerender when list changes (Delete idea)
  useEffect(() => {}, [ideas]);

  return (
    <div style={{ height: "85%", overflowY: "scroll" }}>
      {ideas.length === 0 ? (
        <h1>There are no ideas yet</h1>
      ) : (
        <>
          {filteredIdeas.map((i) => (
            <IdeaCard key={i.id} idea={i} />
          ))}
        </>
      )}
    </div>
  );
};
