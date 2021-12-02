import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { IdeaCard } from "./IdeaCard";

export const IdeaList = () => {
  const filter = useSelector((state) => state.filter);
  const { ideas } = useSelector((state) => state.ideas);

  const filteredIdeas = ideas.filter((x) =>
    x.title.toLowerCase().includes(filter.toLowerCase())
  );
  // Rerender when list changes (Delete idea)
  useEffect(() => {}, [ideas]);

  return (
    <div style={{height:"85%", overflowY:"scroll"}}>
      {ideas.length === 0 ? (
        <h1>There are no ideas yet</h1>
      ) : (
        filteredIdeas.map((i) => <IdeaCard key={i.id} idea={i} />)
      )}
    </div>
  );
};
